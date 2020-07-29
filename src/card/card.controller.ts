import {
  Controller,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  Res,
  HttpException,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Card } from './card.entity';
import { CardService } from './card.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { CreateCardDto } from './dto/create.card.dto';
import { Response } from 'express';
import { AmountCardDto } from './dto/amount.card.dto';

@Crud({
  model: {
    type: Card,
  },
  routes: {
    only: ['getManyBase', 'getOneBase', 'createOneBase', 'deleteOneBase'],
  },
  query: {
    join: {
      card: {
        eager: true,
      },
    },
  },
  dto: {
    create: CreateCardDto,
  },
})
@ApiTags('cards')
@Controller('/api/cards')
export class CardController implements CrudController<Card> {
  public constructor(public service: CardService) {}

  @Patch('/increase/:id')
  @ApiBody({
    description: 'amount',
    type: AmountCardDto,
  })
  public async increase(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body('amount', ParseIntPipe) amount: AmountCardDto['amount'],
  ): Promise<void> {
    try {
      await this.service.increase(id, amount);
      res.sendStatus(200);
    } catch (err) {
      throw new HttpException(err, 404)
    }
  }

  @Patch('/decrease/:id')
  @ApiBody({
    description: 'amount',
    type: AmountCardDto,
  })
  public async decrease(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body('amount', ParseIntPipe) amount: AmountCardDto['amount'],
  ): Promise<void> {
    try {
      await this.service.decrease(id, amount);
      res.sendStatus(200);
    } catch (err) {
      throw new HttpException(err, 400)
    }
  }

  @Patch('/setLimit/:id')
  @ApiBody({
    description: 'amount',
    type: AmountCardDto,
  })
  public async setLimit(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body('amount', ParseIntPipe) amount: AmountCardDto['amount'],
  ): Promise<void> {
    try {
      await this.service.setLimit(id, amount);
      res.sendStatus(200);
    } catch (err) {
      throw new HttpException(err, 404)
    }
  }
}
