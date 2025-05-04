import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../infra/prisma/prisma.service';
import { ClientRepository } from '../../repositories/clients/clients.service';
import { CreateClientDto } from '../../DTO/create-client.dto';
import { UpdateClientDto } from '../../DTO/update-client.dto';



@Injectable()
export class ClientsUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async create (createClientDto: CreateClientDto){
    return await this.clientRepository.create(createClientDto)
  }
  async findAll(owner_id:number) {
    if (!owner_id) {
      throw new NotFoundException(`Owner_id ${owner_id} not found`);
    }
    return  this.clientRepository.findAll(owner_id)
  }

  async findOne(id: number) {
    const client = await this.clientRepository.findOne(id);

    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    return this.clientRepository.update(id, updateClientDto);
  }
}
