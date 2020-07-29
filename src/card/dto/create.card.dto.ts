import { ApiProperty } from '@nestjs/swagger';
import { Min, IsOptional, IsEmpty, IsInt } from 'class-validator';

export class CreateCardDto {
  @IsEmpty()
  debit: number;

  @IsEmpty()
  credit: number;

  @ApiProperty({ required: false })
  @IsInt()
  @Min(0)
  @IsOptional()
  creditLimit: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  user: number;
}
