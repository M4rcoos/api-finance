import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infra/prisma/prisma.module';
import { AuthModule } from './core/view/controllers/auth/auth.module';
import { OwnersModule } from './modules/owners/owners.module';
import { ServicesModule } from './modules/services/services.module';
import { ClientsModule } from './modules/clients/clients.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { ExpensesModule } from './modules/expenses/expenses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    OwnersModule,
    ServicesModule,
    ClientsModule,
    TransactionsModule,
    ExpensesModule,
  ],
})
export class AppModule {}
