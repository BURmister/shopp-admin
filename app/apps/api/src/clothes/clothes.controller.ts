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
import { ClothesDto } from './clothes.dto';
import { ClothesService } from './clothes.service';

@Auth()
@Controller('clothes')
export class ClothesController {
  constructor(private clothesService: ClothesService) {}

  @Get('/all')
  getAll(@Query('searchTerm') searchTerm?: string | Types.ObjectId) {
    return this.clothesService.getAll(searchTerm);
  }

  @Get(':_id')
  byId(@Param('_id') _id: Types.ObjectId) {
    return this.clothesService.getById(_id);
  }

  @Post('/add')
  addOne(@Body() dto: ClothesDto) {
    return this.clothesService.addOne(dto);
  }

  @Put('/edit/:_id')
  @HttpCode(200)
  edit(@Param('_id') _id: Types.ObjectId, @Body() dto: ClothesDto) {
    return this.clothesService.editOne(_id, dto);
  }

  @Put('/delete/:_id')
  delete(@Param('_id') _id: Types.ObjectId) {
    return this.clothesService.deleteOne(_id);
  }

  @Put('/minus/:_id')
  minus(@Param('_id') _id: Types.ObjectId) {
    return this.clothesService.minus(_id);
  }

  @Put('/plus/:_id')
  plus(@Param('_id') _id: Types.ObjectId) {
    return this.clothesService.plus(_id);
  }
}
