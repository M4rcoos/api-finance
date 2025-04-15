import { Module } from "@nestjs/common";
import { OwnersController } from "./owners.controller";
import { PrismaModule } from "../../../../infra/prisma/prisma.module";
import { OwnerRepository } from "src/core/app/repositories/owner/owners.service";
import { OwnersUseCase } from "src/core/app/usecase/owner/owner.use-case";

@Module({
  imports: [PrismaModule],
  controllers: [OwnersController],
  providers: [OwnerRepository, OwnersUseCase],
  exports: [OwnerRepository],
})
export class OwnersModule {}
