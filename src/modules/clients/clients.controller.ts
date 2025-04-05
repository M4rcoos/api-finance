import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { ClientsService } from "./clients.service";
import { JwtAuthGuard } from "../../core/view/middlewares/guards/jwt-auth.guard";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";

@ApiTags("Clients")
@Controller("clients")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new client" })
  @ApiResponse({ status: 201, description: "Client created successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all clients" })
  @ApiResponse({ status: 200, description: "Returns all clients" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a client by ID" })
  @ApiResponse({ status: 200, description: "Returns the client" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Client not found" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.clientsService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a client" })
  @ApiResponse({ status: 200, description: "Client updated successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Client not found" })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto
  ) {
    return this.clientsService.update(id, updateClientDto);
  }
}
