import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';

export interface InventoryModel extends Base {}

export class InventoryModel extends TimeStamps {
  @prop()
  key: string;

  @prop()
  name: string;

  @prop()
  feature: string;

  @prop()
  size: string;

  @prop()
  amount: number;

  @prop()
  price: string;

  @prop()
  description: string;

  @prop()
  gender: string;

  @prop()
  category: string;

  @prop()
  producer: string;

  @prop()
  img: string;
}
