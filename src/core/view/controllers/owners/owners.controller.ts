import { Controller, Get, Put, Body, UseGuards, Request, Param, ParseIntPipe } from "@nestjs/common";
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

  @Get("profile/me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current owner profile" })
  async getProfile(@Request() req) {
    const response = await this.ownersService.getProfile(req.user.id);
    return ok({payload:response})
  }

  @Put("profile/:id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update current owner profile" })
  async updateProfile(@Param('id', ParseIntPipe) id: number, @Body() updateOwnerDto: UpdateOwnerDto) {
    const response = await this.ownersService.update(id, updateOwnerDto);
    return ok({payload:response})
  }

  
}
