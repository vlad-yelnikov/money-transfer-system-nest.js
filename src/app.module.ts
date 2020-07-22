import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { CardModule } from './card/card.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, CardModule],
})
export class AppModule {}
