import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Card } from 'src/card/card.entity';
import { CardService } from 'src/card/card.service';

@Crud({
  model: {
    type: Card,
  },
})
@Controller('/api/cards')
export class CardController implements CrudController<Card> {
  public constructor(public service: CardService) {}
}
