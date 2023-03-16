import { InjectModel } from 'nestjs-typegoose';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import * as argon from 'argon2';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModel } from 'src/user/user.model';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: AuthDto) {
    const oldUser = await this.UserModel.findOne({ name: dto.name });
    if (oldUser)
      throw new BadRequestException(
        'User with this name is already registered',
      );
    try {
      const hash = await argon.hash(dto.password);
      const newUser = new this.UserModel({
        name: dto.name,
        hash: hash,
        role: dto.role,
        firstName: dto.firstName,
        secondName: dto.secondName,
      });
      const user = await newUser.save();
      return user._id;
    } catch (error) {
      if (error) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async login(dto: AuthDto) {
    // find the user by name
    const user = await this.UserModel.findOne({ name: dto.name });

    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');

    // compare password
    const pwMatches = await argon.verify(user.hash, dto.password);
    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    return this.signToken(user.id, user.name);
  }

  async signToken(
    _id: string,
    name: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      _id: _id,
      name,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
