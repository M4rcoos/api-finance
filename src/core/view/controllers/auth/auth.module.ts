import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "../../../../infra/auth/strategies/jwt.strategy";
import { OwnersModule } from "../owners/owners.module";
import { AuthUseCase } from "src/core/app/usecase/auth/auth.use-case";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: { expiresIn: "1d" },
      }),
    }),
    OwnersModule,
  ],
  controllers: [AuthController],
  providers: [AuthUseCase, JwtStrategy],
  exports: [AuthUseCase],
})
export class AuthModule {}
