import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Card } from '../entities/card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CardService extends TypeOrmCrudService<Card> {
  public constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
  ) {
    super(cardRepository);
  }

  public async increase(id: string, value: number): Promise<void> {
    const card = await this.cardRepository.findOne(id);
    if (card.credit < value) {
      card.debit += value - card.credit;
      card.credit = 0;
      this.cardRepository.save(card);
    }
    card.credit -= value;
    this.cardRepository.save(card);
  }

  public async decrease(id: string, value: number): Promise<void> {
    const card = await this.cardRepository.findOne(id);
    const notEnoughMoney = value > card.debit + card.creditLimit - card.credit;
    if (notEnoughMoney) {
      const err = new Error("You don't have enough money");
      throw err;
    }
    if (card.debit < value) {
      card.credit += value - card.debit;
      card.debit = 0;
      this.cardRepository.save(card);
    }
    card.debit -= value;
    this.cardRepository.save(card);
  }

  public async setLimit(id: string, value: number): Promise<void> {
    const card = await this.cardRepository.findOne(id);
    card.creditLimit = value;
    this.cardRepository.save(card);
  }
}
