import { Module } from '@nestjs/common';

import { ServicesController } from './services.controller';
import { PrismaModule } from '../../../../infra/prisma/prisma.module';
import { ServicesRepository } from 'src/core/app/repositories/services/services.service';
import { ServicesUseCase } from 'src/core/app/usecase/services/services.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [ServicesController],
  providers: [ServicesRepository,ServicesUseCase],
  exports: [ServicesRepository],
})
export class ServicesModule {}
