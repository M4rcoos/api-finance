import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../../middlewares/guards/jwt-auth.guard';

import { CreateServiceDto } from 'src/core/app/DTO/create-service.dto';
import { UpdateServiceDto } from 'src/core/app/DTO/update-service.dto';
import { ServicesUseCase } from 'src/core/app/usecase/services/services.use-case';
import { ok } from 'src/core/domain/http/api-response';

@ApiTags('Services')
@Controller('services')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ServicesController {
  constructor(private readonly servicesRepo: ServicesUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create a new service' })
  async create(@Body() createServiceDto: CreateServiceDto, @Request() req) {
    const response = await this.servicesRepo.create(createServiceDto, req.user.id);
    return ok({
      payload:  response ,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all services for current owner' })
  async findAll(@Request() req) {
    const response = await this.servicesRepo.findAll(req.user.id);
    return ok({
      payload:  response ,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a service by ID' })
  async findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const response = await this.servicesRepo.findOne(id, req.user.id);
    return ok({
      payload:  response ,
    });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a service' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServiceDto: UpdateServiceDto,
    @Request() req,
  ) {
    const response = await this.servicesRepo.update(id, updateServiceDto, req.user.id);
    return ok({
      payload:  response ,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a service' })
  async remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const response = await this.servicesRepo.remove(id, req.user.id);
    return ok({
      payload:  response ,
    });
  }
}
