import { Controller, Get, Put, Body, UseGuards, Request } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../../core/view/middlewares/guards/jwt-auth.guard";
import { UpdateOwnerDto } from "./dto/update-owner.dto";
import { OwnerRepository } from "src/core/app/repositories/owner/owners.service";

@ApiTags("Owners")
@Controller("owners")
export class OwnersController {
  constructor(private readonly ownersService: OwnerRepository) {}

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current owner profile" })
  @ApiResponse({ status: 200, description: "Returns the owner profile" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async getProfile(@Request() req) {
    return this.ownersService.findById(req.user.id);
  }

  @Put("profile")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update current owner profile" })
  @ApiResponse({ status: 200, description: "Profile updated successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async updateProfile(@Request() req, @Body() updateOwnerDto: UpdateOwnerDto) {
    return this.ownersService.update(req.user.id, updateOwnerDto);
  }
}
