import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserModel } from 'src/user/user.model';

export const GetUser = createParamDecorator(
   (data: keyof UserModel, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      const user = request.user;

      return data ? user[data] : user;
   },
);

export const GetAdmin = createParamDecorator(
   (data: keyof UserModel, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      const user = request.user;
      if (
         user.role.toLowerCase() ===
         ('admin' || 'administrator' || 'админ' || 'администратор')
      ) {
         return true;
      } else {
         return false;
      }
   },
);
