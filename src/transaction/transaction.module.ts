import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TRANSACTION_REPOSITORY_TOKEN } from './constants/transaction.constants';
import { TransactionDocument } from './models/transaction.schema';
import { TransactionRepository } from './repository/transaction.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TransactionDocument.name, schema: TransactionDocument },
    ]),
  ],
  providers: [
    {
      provide: TRANSACTION_REPOSITORY_TOKEN,
      useClass: TransactionRepository
    },
  ],
  exports: [TRANSACTION_REPOSITORY_TOKEN],
})
export class TransactionModule {}
