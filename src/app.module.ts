import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppInterceptor } from 'app.interceptor';
import { AuthModule } from 'auth/auth.module';
import { TransactionModule } from 'transaction/transaction.module';
import databaseConfig from './config/mongodb.config';

@Module({
  imports: [
    TransactionModule,
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('app.mongo_uri'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AppInterceptor,
    },
  ]
})
export class AppModule {}
