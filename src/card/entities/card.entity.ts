import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Min, IsInt, IsOptional, IsEmpty } from 'class-validator';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'cards' })
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  @Min(0)
  @IsOptional()
  debit: number;

  @Column({ default: 0 })
  @IsEmpty()
  credit: number;

  @Column({ name: 'credit_limit', default: 0 })
  @Min(0)
  @IsOptional()
  creditLimit: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  @IsInt()
  user: User;
}
