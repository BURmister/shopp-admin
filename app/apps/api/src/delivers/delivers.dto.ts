import { IsOptional, IsString } from 'class-validator';

export class DeliversDto {
  @IsString()
  @IsOptional()
  deliveryKey: string;

  @IsString()
  @IsOptional()
  deliveryName: string;

  @IsString()
  @IsOptional()
  deliveryDescription?: string;

  @IsString()
  @IsOptional()
  from: string;

  @IsString()
  @IsOptional()
  beggining: string;

  @IsString()
  @IsOptional()
  ending: string;

  @IsOptional()
  products: {
    key: string;

    name: string;

    price: string;

    description: string;

    gender: string;

    category: string;

    producer: string;

    size: string;

    amount: number;

    img: string;
  }[];
}
