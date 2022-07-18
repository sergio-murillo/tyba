import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TRANSACTION_REPOSITORY_TOKEN } from 'transaction/constants/transaction.constants';
import { ITransactionRepository } from 'transaction/interfaces/transaction.interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  constructor(
    @Inject(TRANSACTION_REPOSITORY_TOKEN)
    private readonly transactionRepository: ITransactionRepository,
    private readonly reflector: Reflector,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest();

    const path = this.reflector
      .get<string[]>('path', context.getHandler())
      .join();
    const method = req.method;

    await this.transactionRepository.save({
      path,
      method,
      user: 'xxxxx',
    });

    return next.handle();
  }
}
