import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Card } from 'src/card/card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CardService extends TypeOrmCrudService<Card> {
  public constructor(@InjectRepository(Card) cardsRepository: Repository<Card>) {
    super(cardsRepository);
  }
}
