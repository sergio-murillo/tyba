import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserDto } from 'user/dtos/user.dto';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(
    user: UserDto,
    done: (err: Error | null, id?: UserDto) => void,
  ): void {
    done(null, user);
  }

  deserializeUser(
    payload: unknown,
    done: (err: Error | null, payload?: unknown) => void,
  ): void {
    done(null, payload);
  }
}
