import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from 'src/user/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
   constructor(
      config: ConfigService,
      @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
   ) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey: config.get('JWT_SECRET'),
      });
   }

   async validate(payload: { _id: string; name: string }) {
      return this.UserModel.findById(payload._id, {hash: 0}).exec();
   }
}
