import { Run } from 'entity/run.entity';
import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RunNum extends BaseEntity {
    // primary key
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @OneToMany(() => Run, run => run.runNum)
    runs: Run[];
}
