import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaModule } from '../../infra/prisma/prisma.module';
import { ServicesModule } from '../services/services.module';
import { ClientsModule } from '../clients/clients.module';

@Module({
  imports: [PrismaModule, ServicesModule, ClientsModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
