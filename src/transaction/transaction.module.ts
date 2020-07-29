import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { CardService } from 'src/card/card.service';
import { Card } from 'src/card/card.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    TypeOrmModule.forFeature([Card]),
  ],
  providers: [TransactionService, CardService],
  controllers: [TransactionController],
})
export class TransactionModule {}
