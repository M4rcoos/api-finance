import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { PrismaModule } from '../../../../infra/prisma/prisma.module';
import { ExpensesRepository } from 'src/core/app/repositories/expenses/expenses.service';
import { ExpensesUseCase } from 'src/core/app/usecase/expenses/expenses.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [ExpensesController],
  providers: [ExpensesRepository,ExpensesUseCase],
})
export class ExpensesModule {}
