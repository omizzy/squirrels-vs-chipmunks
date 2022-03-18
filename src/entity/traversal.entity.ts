import { IsDate, IsOptional } from 'class-validator';
import { Day } from 'entity/day.entity';
import { Run } from 'entity/run.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Traversal extends BaseEntity {
    // primary key
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @IsOptional()
    @IsDate()
    @Column({
        name: 'start',
        precision: 6, // WARNING: magic number anti-pattern
        nullable: true,
    })
    start: Date;

    @IsOptional()
    @IsDate()
    @Column({
        name: 'end',
        precision: 6, // WARNING: magic number anti-pattern
        nullable: true,
    })
    end: Date;


    @ManyToOne(() => Run, run => run.traversals, {
        eager: false,
    })
    run: Run;

    @ManyToOne(() => Day, day => day.traversals, {
        eager: false,
    })
    day: Day;
}
