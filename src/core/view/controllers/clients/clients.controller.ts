import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
  ParseIntPipe,
  Headers,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../../middlewares/guards/jwt-auth.guard";
import { ClientsUseCase } from "src/core/app/usecase/clients/clients.use-case";
import { CreateClientDto } from "src/core/app/DTO/create-client.dto";
import { UpdateClientDto } from "src/core/app/DTO/update-client.dto";
import { ok } from "src/core/domain/http/api-response";


@ApiTags("Clients")
@Controller("clients")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ClientsController {
  constructor(private readonly clientsUseCase: ClientsUseCase) {}

  @Post()
  @ApiOperation({ summary: "Create a new client" })
  async create(@Body() createClientDto: CreateClientDto) {
    const response = await this.clientsUseCase.create(createClientDto);
    return ok({
      payload:response
    })
  }

  @Get()
  @ApiOperation({ summary: "Get all clients" })
  async findAll(@Headers('owner_id') owner_id:number) {
    const ownerIdAsNumber = Number(owner_id);
    const response = await this.clientsUseCase.findAll(ownerIdAsNumber);
    return ok({
      payload:response
    })
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a client by ID" })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const response = await this.clientsUseCase.findOne(id);
    return ok({
      payload:{response}
    })
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a client" })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto
  ) {
    const response = await this.clientsUseCase.update(id, updateClientDto);
    return ok({
      payload:{response}
    })
  }
}
