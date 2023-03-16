import { IsOptional, IsString } from 'class-validator';

export class UserDto {
   @IsString()
   @IsOptional()
   name?: string;

   @IsString()
   @IsOptional()
   password?: string;

   @IsString()
   @IsOptional()
   role?: string;

   @IsString()
   @IsOptional()
   firstName?: string;

   @IsString()
   @IsOptional()
   secondName?: string;

   @IsString()
   @IsOptional()
   description?: string;
}
