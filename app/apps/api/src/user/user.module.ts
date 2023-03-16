import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModel } from 'src/user/user.model';

@Module({
   controllers: [UserController],
   providers: [UserService],
   imports: [
      TypegooseModule.forFeature([
         {
            typegooseClass: UserModel,
            schemaOptions: {
               collection: 'user',
            },
         },
      ]),
      ConfigModule,
   ],
})
export class UserModule {}
