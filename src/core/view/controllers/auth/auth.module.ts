import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "../../../../infra/auth/strategies/jwt.strategy";
import { OwnersModule } from "../../../../modules/owners/owners.module";
import { AuthService } from "src/core/app/usecase/auth/auth.service";

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
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
