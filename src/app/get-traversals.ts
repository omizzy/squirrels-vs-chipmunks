import { Traversal } from 'entity/traversal.entity';
import { Connection, createConnection } from 'typeorm';

class GetTraversals {
    constructor(private readonly connection: Connection) {}
    public async printTraversalOnlyForWeek(weekNum: number): Promise<void> {
        const traversalRepository = this.connection.getRepository(Traversal);
        const query = traversalRepository
            .createQueryBuilder('Traversal')
            .innerJoin('Traversal.day', 'Day')
            .innerJoin('Day.week', 'Week')
            .where('Week.id = :weekNum', { weekNum })
            .limit(10);
        const traversalsSql = query.getSql();
        console.log(
            'printTraversalOnlyForWeek:: Traversals SQL:',
            traversalsSql,
        );
        const traversals = await query.getMany();
        console.log('printTraversalOnlyForWeek:: Results:', traversals);
    }

    public async printTraversalWithRelationsForWeek(
        weekNum: number,
    ): Promise<void> {
        const traversalRepository = this.connection.getRepository(Traversal);
        const query = traversalRepository
            .createQueryBuilder('Traversal')
            .innerJoinAndSelect('Traversal.day', 'Day')
            .innerJoinAndSelect('Day.week', 'Week')
            .where('Week.id = :weekNum', { weekNum })
            .limit(10);
        const traversalsSql = query.getSql();
        console.log(
            'printTraversalWithRelationsForWeek:: Traversals SQL:',
            traversalsSql,
        );
        const traversals = await query.getMany();
        const traversal = traversals.find(Boolean);
        traversal.day = null;
        traversal.save()
        console.log(
            'printTraversalWithRelationsForWeek:: Results:',
            traversals,
        );
    }

    public async printTraversalWithRelationsUsingRepoApiForWeek(
        weekNum: number,
    ): Promise<void> {
        const traversalRepository = this.connection.getRepository(Traversal);
        const traversals = await traversalRepository.find({
            relations: ['run', 'day.week', 'day'],
            where: { day: { week: { id: weekNum } } },
            take: 10,
        });
        console.log(
            'printTraversalWithRelationsUsingRepoApiForWeek:: Results:',
            traversals,
        );
    }
}

(async function () {
    const connection = await createConnection();
    const gt = new GetTraversals(connection);
    await gt.printTraversalOnlyForWeek(3);
    await gt.printTraversalWithRelationsForWeek(3);
    await gt.printTraversalWithRelationsUsingRepoApiForWeek(3);
})();
