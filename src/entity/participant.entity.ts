import { IsNotEmpty, MaxLength } from 'class-validator';
import { Run } from 'entity/run.entity';
import {
    BaseEntity,
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Participant extends BaseEntity {
    // primary key
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Index() // db table column augmentation
    @IsNotEmpty() // validation
    @MaxLength(100) // validation
    @Column({ length: 100 }) // db table column definition
    name: string;

    @OneToMany(() => Run, run => run.participant)
    runs: Run[];
}
