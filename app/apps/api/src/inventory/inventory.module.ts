import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { InventoryModel } from 'src/inventory/inventory.model';

@Module({
  controllers: [InventoryController],
  providers: [InventoryService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: InventoryModel,
        schemaOptions: {
          collection: 'inventory',
        },
      }
    ]),
    ConfigModule,
  ],
})
export class InventoryModule {}
