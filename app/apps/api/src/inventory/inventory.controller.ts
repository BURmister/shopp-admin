import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { GetUser, GetAdmin } from '../auth/decorator/user.decorator';
import { Auth } from '../auth/guard/jwt.guard';
import { InventoryDto } from './inventory.dto';
import { InventoryService } from './inventory.service';

@Auth()
@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Get('/all')
  getAll(@Query('searchTerm') searchTerm?: string | Types.ObjectId) {
    return this.inventoryService.getAll(searchTerm);
  }

  @Get(':_id')
  byId(@Param('_id') _id: Types.ObjectId) {
    return this.inventoryService.getById(_id);
  }

  @Post('/add')
  addOne(@Body() dto: InventoryDto) {
    return this.inventoryService.addOne(dto);
  }

  @Put('/edit/:_id')
  @HttpCode(200)
  edit(@Param('_id') _id: Types.ObjectId, @Body() dto: InventoryDto) {
    return this.inventoryService.editOne(_id, dto);
  }

  @Put('/delete/:_id')
  delete(@Param('_id') _id: Types.ObjectId) {
    return this.inventoryService.deleteOne(_id);
  }

  @Put('/minus/:_id')
  minus(@Param('_id') _id: Types.ObjectId) {
    return this.inventoryService.minus(_id);
  }

  @Put('/plus/:_id')
  plus(@Param('_id') _id: Types.ObjectId) {
    return this.inventoryService.plus(_id);
  }
}
