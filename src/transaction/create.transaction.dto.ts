import { ApiProperty } from "@nestjs/swagger";
import { Min, IsInt } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty()
  @IsInt()
  @Min(0)
  amount: number;
  @ApiProperty()
  @IsInt()
  @Min(1)
  sender: number;
  @ApiProperty()
  @IsInt()
  @Min(1)
  receiver: number;
}