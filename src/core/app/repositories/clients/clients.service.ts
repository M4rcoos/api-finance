import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../infra/prisma/prisma.service';
import { UpdateClientDto } from '../../DTO/update-client.dto';
import { CreateClientDto } from '../../DTO/create-client.dto';


@Injectable()
export class ClientRepository {
  constructor(private prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    return this.prisma.client.create({
      data: createClientDto,
    });
  }

  async findAll(owner_id:number) {
    return this.prisma.client.findMany({
      where:{
        owner_id:owner_id
      }
    });
  }

  async findOne(id: number) {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    await this.findOne(id);

    return this.prisma.client.update({
      where: { id },
      data: updateClientDto,
    });
  }
}
