import { Controller, Post, Body, HttpCode, HttpStatus, Get, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { LoginDto } from "../../../app/DTO/login.dto";
import { RegisterOwnerDto } from "../../../app/DTO/register-owner.dto";
import { AuthUseCase } from "src/core/app/usecase/auth/auth.service";
import { ok } from "src/core/domain/http/api-response";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  @Post("register")
  @ApiOperation({ summary: "Register a new owner" })

  async register(@Body() registerOwnerDto: RegisterOwnerDto) {
    const newUser = await  this.authUseCase.register(registerOwnerDto);
    return ok({payload: newUser})
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: "Authenticate owner and get access token" })
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authUseCase.login(loginDto);
    return ok({ payload: token  });
  }

  @Get("owner")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Authenticate owner and get access token" })

  async authMe(@Body() email: string) {
    return ok({payload:await this.authUseCase.getOwner({ email })})
  }
}
