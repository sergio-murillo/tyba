import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppInterceptor } from 'app.interceptor';
import { AuthModule } from 'auth/auth.module';
import { TransactionModule } from 'transaction/transaction.module';
import { UserModule } from 'user/user.module';
import appConfig from './config/mongodb.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('app.mongo_uri'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    TransactionModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AppInterceptor,
    },
  ],
})
export class AppModule {}
