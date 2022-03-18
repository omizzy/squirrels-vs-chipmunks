import { Chipmunk } from 'entity/chipmunk.entity';
import { Day } from 'entity/day.entity';
import { Obstacle } from 'entity/obstacle.entity';
import { Week } from 'entity/week.entity';
import { Connection, createConnection } from 'typeorm';
import { Participant } from '../entity/participant.entity';
import { Squirrel } from '../entity/squirrel.entity';
import { RunNum } from '../entity/run-num.entity';
import { Run } from 'entity/run.entity';
import { Traversal } from 'entity/traversal.entity';
import { time } from 'console';

class BigBang {
    private static numberOfDays = 5;
    /**
     *
     * @param connection
     * @param numObstaclesAndWeeks
     */
    constructor(
        private readonly connection: Connection,
        private readonly numObstaclesAndWeeks: number = 5,
    ) {}

    /**
     *
     * @returns {Promise<Obstacle[]}}
     */
    async createObstacles(): Promise<Obstacle[]> {
        const obstacleRepository = this.connection.getRepository(Obstacle);
        let obstacles = [];
        for (let i = 0; i < this.numObstaclesAndWeeks; i++) {
            console.log('createObstacles: creating obstacle', i);
            const obstacle = new Obstacle();
            obstacle.name = `Obstacle ${i}`;
            // WARNING: magic number anti-pattern
            obstacle.difficulty = parseFloat(Math.random().toPrecision(2));
            obstacles.push(obstacle);
        }
        return obstacleRepository.save(obstacles);
    }

    /**
     *
     * @returns {Promise<Day[]>}
     */
    async createDays(): Promise<Day[]> {
        const dayRepository = this.connection.getRepository(Day);
        let days = [];
        for (let i = 1; i <= BigBang.numberOfDays; i++) {
            console.log('createDays: creating day', i);
            days.push(new Day());
        }
        return dayRepository.save(days);
    }

    /**
     *
     * @param days
     * @returns {Promise<Week[]>}
     */
    async createWeeks(obstacles: Obstacle[]): Promise<Week[]> {
        const weekRepository = this.connection.getRepository(Week);
        let start = 1;
        let weeks = [];
        for (let i = 0; i < this.numObstaclesAndWeeks; i++) {
            console.log('createWeeks: creating week', i);
            const week = new Week();
            week.start = start;
            week.end = start + 4;
            const days = await this.createDays();
            week.days = days;
            week.obstacle = obstacles[i];
            start = week.end + 3; // skip weekends
            weeks.push(week);
        }
        return weekRepository.save(weeks);
    }

    /**
     *
     */
    async createParticipants(): Promise<{
        participants: Participant[];
        squirrels: Squirrel[];
        chipmunks: Chipmunk[];
    }> {
        const participantRepository =
            this.connection.getRepository(Participant);
        const chipmunkRepository = this.connection.getRepository(Chipmunk);
        const squirrelRepository = this.connection.getRepository(Chipmunk);
        let participants = [];
        let squirrels = [];
        let chipmunks = [];
        // create squirrels
        for (let i = 0; i < 10; i++) {
            console.log('createParticipants: creating squirrel participant', i);
            const participant = new Participant();
            const squirrel = new Squirrel();
            squirrel.participant = participant;
            participants.push(participant);
            squirrels.push(squirrel);
        }
        for (let i = 0; i < 10; i++) {
            console.log('createParticipants: creating chipmunk participant', i);
            const participant = new Participant();
            const chipmunk = new Chipmunk();
            chipmunk.participant = participant;
            participants.push(participant);
            chipmunks.push(chipmunk);
        }

        participants = await participantRepository.save(participants);
        squirrels = await squirrelRepository.save(squirrels);
        chipmunks = await chipmunkRepository.save(chipmunks);
        return { participants, squirrels, chipmunks };
    }

    async createRunNums(): Promise<RunNum[]> {
        console.log('createRunNums: creating run nums');
        const rn1 = new RunNum();
        const rn2 = new RunNum();
        const runNumRepository = this.connection.getRepository(RunNum);
        return runNumRepository.save([rn1, rn2]);
    }

    async createRuns(
        runNums: RunNum[],
        participants: Participant[],
    ): Promise<Run[]> {
        const runRepository = this.connection.getRepository(Run);
        const runs = [];
        for (const participant of participants) {
            console.log('createRuns: creating runs for participant', participant.id);
            const run1 = new Run();
            run1.participant = participant;
            run1.runNum = runNums[0];
            runs.push(run1);
            const run2 = new Run();
            run2.participant = participant;
            run2.runNum = runNums[1];
            runs.push(run2);
        }
        return runRepository.save(runs);
    }

    async createTraversals(weeks: Week[], runs: Run[]): Promise<Traversal[]> {
        let dayTracker = 1;
        const traversals = [];
        for (const week of weeks) {
            for (const day of week.days) {
                // the experiment starts at noon
                let timeReference = new Date();
                timeReference.setMonth(0);
                timeReference.setDate(dayTracker);
                timeReference.setHours(12);
                timeReference.setMinutes(0);
                timeReference.setSeconds(0);
                for (const run of runs) {
                    console.log('createTraversals: creating traversal', dayTracker);
                    const traversal = new Traversal();
                    traversal.run = run;
                    traversal.day = day;
                    traversal.start = new Date(timeReference);
                    traversal.end = new Date(timeReference);
                    const traversalTime = (5 + Math.random() * 100) % 20;
                    traversal.end.setMinutes(
                        traversal.end.getMinutes() + traversalTime,
                    );
                    timeReference = new Date(traversal.end);
                    timeReference.setMinutes(timeReference.getMinutes() + 5);
                    traversals.push(traversal);
                }
                dayTracker++;
            }
        }
        const traversalRepository = this.connection.getRepository(Traversal);
        return traversalRepository.save(traversals);
    }
}

// main
 (async function () {
    const connection = await createConnection();
    const bb = new BigBang(connection);
    const obstacles = await bb.createObstacles();
    const weeks = await bb.createWeeks(obstacles);
    const { participants } = await bb.createParticipants();
    const runNums = await bb.createRunNums();
    const runs = await bb.createRuns(runNums, participants);
    const traversals = await bb.createTraversals(weeks, runs);
    console.log('Done!')
})();
