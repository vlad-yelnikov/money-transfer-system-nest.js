import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Card } from './card.entity';
import { Repository } from 'typeorm';
import { AmountCardDto } from './dto/amount.card.dto';

@Injectable()
export class CardService extends TypeOrmCrudService<Card> {
  public constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
  ) {
    super(cardRepository);
  }

  public async increase(
    id: number,
    amount: AmountCardDto['amount'],
  ): Promise<void> {
    const card = await this.cardRepository.findOne(id);
    if (!card) {
      const err = new Error();
      err.message = `Card with id(${id}) does not exist`;
      throw err;
    }
    if (card.credit < amount) {
      card.debit += amount - card.credit;
      card.credit = 0;
      await this.cardRepository.save(card);
      return;
    }
    card.credit -= amount;
    await this.cardRepository.save(card);
  }

  public async decrease(
    id: number,
    amount: AmountCardDto['amount'],
  ): Promise<void> {
    const card = await this.cardRepository.findOne(id);
    if (!card) {
      const err = new Error();
      err.message = `Card with id(${id}) does not exist`;
      throw err;
    }
    const notEnoughMoney = amount > card.debit + card.creditLimit - card.credit;
    if (notEnoughMoney) {
      const err = new Error();
      err.message = "You don't have enough money";
      throw err;
    }
    if (card.debit < amount) {
      card.credit += amount - card.debit;
      card.debit = 0;
      await this.cardRepository.save(card);
      return;
    }
    card.debit -= amount;
    await this.cardRepository.save(card);
  }

  public async setLimit(
    id: number,
    amount: AmountCardDto['amount'],
  ): Promise<void> {
    const card = await this.cardRepository.findOne(id);
    if (!card) {
      const err = new Error();
      err.message = `Card with id(${id}) does not exist`;
      throw err;
    }
    card.creditLimit = amount;
    await this.cardRepository.save(card);
  }
}
