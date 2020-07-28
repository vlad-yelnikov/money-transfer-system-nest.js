import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Transaction } from '../entities/transaction.entity';
import { TransactionService } from '../services/transaction.service';

@Crud({
  model: {
    type: Transaction,
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
  query: {
    join: {
      sender: {
        eager: true,
      },
      receiver: {
        eager: true,
      },
    },
  },
})
@Controller('/api/transactions')
export class TransactionController implements CrudController<Transaction> {
  public constructor(public service: TransactionService) {}

  @Post()
  create(@Body() body: Transaction): Promise<void> {
    return this.service.create(body);
  }

  @Delete('/rollback/:id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.service.rollback(id);
  }
}
