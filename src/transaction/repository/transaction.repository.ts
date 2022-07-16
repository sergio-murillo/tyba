import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ITransactionRepository } from 'transaction/interfaces/transaction.interfaces';
import { TransactionDocument } from 'transaction/models/transaction.schema';
import { CreateTransactionDto } from 'transaction/dtos/create-transaction.dto';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectModel(TransactionDocument.name) private transactionModel: Model<TransactionDocument>,
  ) {}

  async findAll(): Promise<TransactionDocument[]> {
    return this.transactionModel.find().exec();
  }

  async save(transaction: CreateTransactionDto): Promise<TransactionDocument> {
    const newTransaction = new this.transactionModel(transaction);
    return newTransaction.save();
  }
}
