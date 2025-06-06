import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infra/prisma/prisma.module';
import { AuthModule } from './core/view/controllers/auth/auth.module';
import { OwnersModule } from './core/view/controllers/owners/owners.module';
import { ServicesModule } from './core/view/controllers/services/services.module';
import { ClientsModule } from './core/view/controllers/clients/clients.module';
import { TransactionsModule } from './core/view/controllers/transactions/transactions.module';
import { ExpensesModule } from './core/view/controllers/expenses/expenses.module';

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
