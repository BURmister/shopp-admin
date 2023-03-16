import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
   @prop({ unique: true })
   name: string;

   @prop()
   hash: string;

   @prop()
   role: string;

   @prop()
   firstName: string;

   @prop()
   secondName: string;

   @prop()
   description?: string;
}
