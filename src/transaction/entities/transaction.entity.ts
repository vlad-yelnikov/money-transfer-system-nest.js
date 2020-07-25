import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Card } from 'src/card/entities/card.entity';

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  amount: number;

  @Column({ type: 'timestamp without time zone', default: 'NOW()' })
  date: Date;

  @Column({ name: 'is_aborted', default: false })
  isAborted: boolean;

  @ManyToOne(() => Card, { nullable: false })
  @JoinColumn({ name: 'sender_card_id' })
  sender: number;

  @ManyToOne(() => Card, { nullable: false })
  @JoinColumn({ name: 'receiver_card_id' })
  receiver: number;
}
