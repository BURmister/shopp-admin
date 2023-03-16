import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModel } from '../user/user.model';
import { JwtStrategy } from './strategy/jwt.strategy';
import { getJWTConfig } from 'src/config/jwt.config';

@Module({
   imports: [
      JwtModule.register({}),
      TypegooseModule.forFeature([
         {
            typegooseClass: UserModel,
            schemaOptions: {
               collection: 'user',
            },
         },
      ]),
      ConfigModule,
      JwtModule.registerAsync({
         imports: [ConfigModule],
         inject: [ConfigService],
         useFactory: getJWTConfig,
      }),
   ],
   controllers: [AuthController],
   providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
