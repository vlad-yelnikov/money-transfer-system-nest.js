import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class QueryUserDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  take?: number;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  order?: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sort?: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  page?: number;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  size?: number;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;
}
