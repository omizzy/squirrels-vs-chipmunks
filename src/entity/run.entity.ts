import { Participant } from 'entity/participant.entity';
import { RunNum } from 'entity/run-num.entity';
import { Traversal } from 'entity/traversal.entity';
import {
    BaseEntity,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Run extends BaseEntity {
    // primary key
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @ManyToOne(() => Participant, participant => participant.runs, {
        eager: false,
    })
    participant: Participant;

    @ManyToOne(() => RunNum, runNum => runNum.runs, { eager: false })
    runNum: RunNum;

    @OneToMany(() => Traversal, traversal => traversal.run)
    traversals: Traversal[];
}
