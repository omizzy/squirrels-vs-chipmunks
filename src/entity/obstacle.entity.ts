import { IsNotEmpty, MaxLength } from 'class-validator';
import { Week } from 'entity/week.entity';
import {
    BaseEntity,
    Column,
    Entity,
    Index,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Obstacle extends BaseEntity {
    // primary key
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Index() // db table column augmentation
    @IsNotEmpty() // validation
    @MaxLength(100) // validation
    @Column({ length: 100 }) // db table column definition
    name: string;

    @Column({type: 'float'})
    difficulty: number;

    @ManyToMany(() => Week, week => week.days, {
        eager: false,
        onDelete: 'NO ACTION',
    })
    weeks: Week[];
}
