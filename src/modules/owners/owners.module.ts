import { Module } from "@nestjs/common";
import { OwnersController } from "./owners.controller";
import { PrismaModule } from "../../infra/prisma/prisma.module";
import { OwnerRepository } from "src/core/app/repositories/owner/owners.service";

@Module({
  imports: [PrismaModule],
  controllers: [OwnersController],
  providers: [OwnerRepository],
  exports: [OwnerRepository],
})
export class OwnersModule {}
