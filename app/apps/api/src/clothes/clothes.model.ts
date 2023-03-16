import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';

export interface ClothessModel extends Base {}

export class ClothesModel extends TimeStamps {
  @prop({ unique: true })
  key: string;

  @prop()
  name: string;

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
