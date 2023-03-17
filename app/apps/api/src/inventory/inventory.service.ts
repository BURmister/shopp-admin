import {
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { isValidObjectId, Types } from 'mongoose';
import * as argon from 'argon2';

import { InventoryModel } from './inventory.model';
import { InventoryDto } from './inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(InventoryModel)
    private readonly InventoryModel: ModelType<InventoryModel>,
  ) {}

  async getAll(searchTerm?: string | Types.ObjectId) {
    if (searchTerm) {
      if (isValidObjectId(searchTerm)) {
        return this.InventoryModel.find({
          $or: [
            {
              _id: searchTerm,
            },
          ],
        }).exec();
      } else {
        return this.InventoryModel.find({
          $or: [
            {
              name: new RegExp(String(searchTerm), 'i'),
            },
            {
              category: new RegExp(String(searchTerm), 'i'),
            },
            {
              producer: new RegExp(String(searchTerm), 'i'),
            },
          ],
        }).exec();
      }
    }
    const product = await this.InventoryModel.find().exec();
    return product;
  }

  async getById(_id: Types.ObjectId) {
    const product = await this.InventoryModel.findOne({ _id }, '-__v');
    if (!product) throw new UnauthorizedException('Product not found');

    return product;
  }

  async addOne(dto: InventoryDto) {
    const newProduct = new this.InventoryModel(dto);
    const product = await newProduct.save();
    return product._id;
  }

  async editOne(_id: Types.ObjectId, dto: InventoryDto) {
    const product = await this.getById(_id);

    if (dto.key) {
      product.key = dto.key;
    }

    if (dto.name) {
      product.name = dto.name;
    }

    if (dto.img) {
      product.img = dto.img;
    }

    if (dto.description) {
      product.description = dto.description;
    }

    if (dto.size) {
      product.size = dto.size;
    }

    if (dto.price) {
      product.price = dto.price;
    }

    if (dto.gender) {
      product.gender = dto.gender;
    }

    if (dto.category) {
      product.category = dto.category;
    }

    if (dto.producer) {
      product.producer = dto.producer;
    }

    if (dto.size) {
      product.size = dto.size;
    }

    if (dto.amount) {
      product.amount = dto.amount;
    }

    await product.save();
    return product._id;
  }

  async deleteOne(_id: Types.ObjectId) {
    const product = await this.getById(_id);
    await product.deleteOne();
    return product.name;
  }

  async minus(_id: Types.ObjectId) {
    const product = await this.getById(_id);
    product.amount = product.amount - 1;
    await product.save();
    return { _id: product._id, name: product.name };
  }

  async plus(_id: Types.ObjectId) {
    const product = await this.getById(_id);
    product.amount = product.amount + 1;
    await product.save();
    return { _id: product._id, name: product.name };
  }
}
