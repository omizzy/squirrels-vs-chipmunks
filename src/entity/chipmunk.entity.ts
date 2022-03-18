import { Participant } from 'entity/participant.entity';
import {
    BaseEntity,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Chipmunk extends BaseEntity {
    // primary key
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    // add custom fields here

    @OneToOne(() => Participant, participant => participant.id, {
        eager: true,
        nullable: false,
    })
    @JoinColumn({ name: 'fk_participant_id' })
    participant: Participant;
}
