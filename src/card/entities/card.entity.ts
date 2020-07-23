import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../modules/user/entities/user.entity';

@Entity({ name: 'cards' })
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  debit: number;

  @Column({ default: 0 })
  credit: number;

  @Column({ name: 'credit_limit', default: 0 })
  creditLimit: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
