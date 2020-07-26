import { Controller, Patch, Param, Body, ParseIntPipe } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Card } from '../entities/card.entity';
import { CardService } from '../services/card.service';

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
})
@Controller('/api/cards')
export class CardController implements CrudController<Card> {
  public constructor(public service: CardService) {}

  @Patch('/increase/:id')
  public async increase(
    @Param('id', ParseIntPipe) id: number,
    @Body('amount', ParseIntPipe) amount: number,
  ): Promise<void> {
    await this.service.increase(id, amount);
  }

  @Patch('/decrease/:id')
  public async decrease(
    @Param('id', ParseIntPipe) id: number,
    @Body('amount', ParseIntPipe) amount: number,
  ): Promise<void> {
    await this.service.decrease(id, amount);
  }

  @Patch('/setLimit/:id')
  public async setLimit(
    @Param('id', ParseIntPipe) id: number,
    @Body('amount', ParseIntPipe) amount: number,
  ): Promise<void> {
    await this.service.setLimit(id, amount);
  }
}
