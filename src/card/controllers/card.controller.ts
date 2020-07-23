import { Controller, Patch, Param, Body } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Card } from '../entities/card.entity';
import { CardService } from '../services/card.service';

@Crud({
  model: {
    type: Card,
  },
})
@Controller('/api/cards')
export class CardController implements CrudController<Card> {
  public constructor(public service: CardService) {}

  @Patch('/increase/:id')
  public async increase(
    @Param('id') id: string,
    @Body('value') value: number,
  ): Promise<void> {
    await this.service.increase(id, value);
  }

  @Patch('/decrease/:id')
  public async decrease(
    @Param('id') id: string,
    @Body('value') value: number,
  ): Promise<void> {
    await this.service.decrease(id, value);
  }

  @Patch('/setLimit/:id')
  public async setLimit(
    @Param('id') id: string,
    @Body('value') value: number,
  ): Promise<void> {
    await this.service.setLimit(id, value);
  }
}
