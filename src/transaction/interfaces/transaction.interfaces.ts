import { CreateTransactionDto } from "transaction/dtos/create-transaction.dto";
import { TransactionDocument } from "transaction/models/transaction.schema";

export interface ITransactionRepository {
  findAll: () => Promise<TransactionDocument[]>;
  save: (user: CreateTransactionDto) => Promise<TransactionDocument>;
}
