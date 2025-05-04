import {
    Injectable,
  } from '@nestjs/common';
import { ServicesRepository } from '../../repositories/services/services.service';
import { CreateServiceDto } from '../../DTO/create-service.dto';
import { UpdateServiceDto } from '../../DTO/update-service.dto';
import { badRequest } from 'src/core/domain/http/api-response';

  @Injectable()
  export class ServicesUseCase {
    constructor(private readonly repository: ServicesRepository) {}
  
    async create(dto: CreateServiceDto, ownerId: number) {
      return this.repository.create(dto, ownerId);
    }
  
    async findAll(ownerId: number) {
      return this.repository.findAll(ownerId);
    }
  
    async findOne(id: number, ownerId: number) {
      const service = await this.repository.findOne(id, ownerId);
      if (!service) {
        badRequest({ errors: 'Serviço não encontrado ou você não tem acesso a ele' });
      }
      return service;
    }
  
    async update(id: number, dto: UpdateServiceDto, ownerId: number) {
      return this.repository.update(id, dto, ownerId);
    }
  
    async remove(id: number, ownerId: number) {
      return this.repository.remove(id, ownerId);
    }
  }
  