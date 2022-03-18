import { Day } from 'entity/day.entity';
import { Obstacle } from 'entity/obstacle.entity';
import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Week extends BaseEntity {
    // primary key
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column()
    start: number;

    @Column()
    end: number;

    @OneToMany(() => Day, day => day.week, {
        eager: false,
    })
    days: Day[];

    @OneToOne(() => Obstacle, obstacle => obstacle.id, {
        eager: false,
        nullable: false,
    })
    @JoinColumn()
    obstacle: Obstacle;
}
