import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { PrismaModule } from '../../../../infra/prisma/prisma.module';
import { ClientsUseCase } from 'src/core/app/usecase/clients/clients.use-case';
import { ClientRepository } from 'src/core/app/repositories/clients/clients.service';

@Module({
  imports: [PrismaModule],
  controllers: [ClientsController],
  providers: [ClientsUseCase, ClientRepository],
  exports: [ClientsUseCase, ClientRepository],
})
export class ClientsModule {}
