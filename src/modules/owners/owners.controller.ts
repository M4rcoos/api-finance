import { Controller, Get, Put, Body, UseGuards, Request } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { OwnersService } from "./owners.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UpdateOwnerDto } from "./dto/update-owner.dto";

@ApiTags("Owners")
@Controller("owners")
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

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
