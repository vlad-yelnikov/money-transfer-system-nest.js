import { ApiProperty } from '@nestjs/swagger';
import { Min, IsInt } from 'class-validator';

export class AmountCardDto {
  @ApiProperty()
  @IsInt()
  @Min(0)
  amount: number;
}
