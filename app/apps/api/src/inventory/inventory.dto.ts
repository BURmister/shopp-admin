import { IsOptional, IsString } from 'class-validator';

export class InventoryDto {
  @IsString()
  @IsOptional()
  key: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  price: string;

  @IsString()
  @IsOptional()

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  gender: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  producer: string;

  @IsOptional()
  amount: number;

  @IsString()
  @IsOptional()
  size: string;

  @IsString()
  @IsOptional()
  img: string;
}
