import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ClothesController } from './clothes.controller';
import { ClothesService } from './clothes.service';
import { ClothesModel } from 'src/clothes/clothes.model';

@Module({
  controllers: [ClothesController],
  providers: [ClothesService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ClothesModel,
        schemaOptions: {
          collection: 'clothes',
        },
      },
    ]),
    ConfigModule,
  ],
})
export class ClothesModule {}
