import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface DeliversModel extends Base {}

export class DeliversModel extends TimeStamps {
  @prop()
  deliveryKey: string;

  @prop()
  deliveryName: string;

  @prop()
  deliveryDescription?: string;

  @prop()
  from: string;

  @prop()
  beggining: string;

  @prop()
  ending: string;

  @prop()
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
