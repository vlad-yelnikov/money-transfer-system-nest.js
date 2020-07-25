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

  public async increase(id: number, amount: number): Promise<Card> {
    const card = await this.cardRepository.findOne(id);
    if (card.credit < amount) {
      card.debit += amount - card.credit;
      card.credit = 0;
      this.cardRepository.save(card);
      return card;
    }
    card.credit -= amount;
    this.cardRepository.save(card);
    return card;
  }

  public async decrease(id: number, amount: number): Promise<Card> {
    const card = await this.cardRepository.findOne(id);
    const notEnoughMoney = amount > card.debit + card.creditLimit - card.credit;
    if (notEnoughMoney) {
      const err = new Error("You don't have enough money");
      throw err;
    }
    if (card.debit < amount) {
      card.credit += amount - card.debit;
      card.debit = 0;
      this.cardRepository.save(card);
      return card;
    }
    card.debit -= amount;
    this.cardRepository.save(card);
    return card;
  }

  public async setLimit(id: number, amount: number): Promise<Card> {
    const card = await this.cardRepository.findOne(id);
    card.creditLimit = amount;
    this.cardRepository.save(card);
    return card;
  }
}
