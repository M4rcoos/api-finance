import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { PrismaModule } from '../../../../infra/prisma/prisma.module';
import { ServicesModule } from '../services/services.module';
import { ClientsModule } from '../clients/clients.module';
import { TransactionUseCase } from 'src/core/app/usecase/transactions/transactions.use-case';
import { TransactionsRepository } from 'src/core/app/repositories/transactions/transactions.service';

@Module({
  imports: [PrismaModule, ServicesModule, ClientsModule],
  controllers: [TransactionsController],
  providers: [TransactionUseCase,TransactionsRepository],
})
export class TransactionsModule {}
