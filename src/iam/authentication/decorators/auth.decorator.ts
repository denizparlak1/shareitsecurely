import { AuthType } from '../enums/auth-types.enum';
import { SetMetadata } from '@nestjs/common';

export const AUTH_TYPE_KEY = 'authType';

export const Auth = (...AuthType: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, AuthType);
