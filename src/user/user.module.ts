import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_REPOSITORY_TOKEN, USER_SERVICE_TOKEN } from './constants/user.constants';
import { UserDocument } from './models/user.schema';
import { UserRepository } from './repository/user.repository';
import { UserService } from './services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserDocument.name, schema: UserDocument },
    ]),
  ],
  providers: [
    {
      provide: USER_SERVICE_TOKEN,
      useClass: UserService
    },
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository
    },
  ],
  exports: [USER_SERVICE_TOKEN, USER_REPOSITORY_TOKEN],
})
export class UserModule {}
