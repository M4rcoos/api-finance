import { Controller, Get, Put, Body, UseGuards, Request } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../../middlewares/guards/jwt-auth.guard";
import { OwnersUseCase } from "src/core/app/usecase/owner/owner.use-case";
import { ok } from "src/core/domain/http/api-response";
import { UpdateOwnerDto } from "src/core/app/DTO/update-owner.dto";

@ApiTags("Owners")
@Controller("owners")
export class OwnersController {
  constructor(private readonly ownersService: OwnersUseCase) {}

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current owner profile" })
  async getProfile(@Request() req) {
    const response = await this.ownersService.getProfile(req.user.id);
    return ok({payload:response})
  }

  @Put("profile")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update current owner profile" })
  async updateProfile(@Request() req, @Body() updateOwnerDto: UpdateOwnerDto) {
    const response = await this.ownersService.update(req.user.id, updateOwnerDto);
    return ok({payload:response})
  }

  
}
