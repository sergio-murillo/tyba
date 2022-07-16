import { Controller, Get, HttpStatus, Inject } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TRANSACTION_REPOSITORY_TOKEN } from './constants/transaction.constants';
import { ITransactionRepository } from './interfaces/transaction.interfaces';
import { TransactionDocument } from './models/transaction.schema';

/**
 * Responsible for managing all system transactions
 */
@ApiTags('Transactions')
@Controller({ version: '1', path: 'transaction' })
export class AuthController {
  constructor(
    @Inject(TRANSACTION_REPOSITORY_TOKEN)
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Get all transactions',
  })
  @Get()
  async findAll(): Promise<TransactionDocument[]> {
    const response = await this.transactionRepository.findAll();
    return response;
  }
}
