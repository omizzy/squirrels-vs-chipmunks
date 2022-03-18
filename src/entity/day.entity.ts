import { Traversal } from 'entity/traversal.entity';
import { Week } from 'entity/week.entity';
import {
    BaseEntity,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Day extends BaseEntity {
    // primary key
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @ManyToOne(() => Week, week => week.days, {
        eager: false,
        onDelete: 'NO ACTION',
    })
    week: Week;

    @OneToMany(() => Traversal, traversal => traversal.run)
    traversals: Traversal[];
}
