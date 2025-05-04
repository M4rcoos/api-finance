import {
  Injectable,

} from '@nestjs/common';
import { PrismaService } from '../../../../infra/prisma/prisma.service';
import { CreateServiceDto } from '../../DTO/create-service.dto';
import { UpdateServiceDto } from '../../DTO/update-service.dto';


@Injectable()
export class ServicesRepository {
  constructor(private prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto, ownerId: number) {
    return this.prisma.service.create({
      data: {
        ...createServiceDto,
        ownerId,
      },
    });
  }

  async findAll(ownerId: number) {
    return this.prisma.service.findMany({
      where: { ownerId },
    });
  }

  async findOne(id: number, ownerId?: number) {
    const service = await this.prisma.service.findUnique({
      where: { id, ownerId },
    });

    return service;
  }

  async update(
    id: number,
    updateServiceDto: UpdateServiceDto,
    ownerId: number,
  ) {
    await this.findOne(id, ownerId);

    return this.prisma.service.update({
      where: { id },
      data: updateServiceDto,
    });
  }

  async remove(id: number, ownerId: number) {
    // Check if service exists and belongs to owner
    await this.findOne(id, ownerId);

    return this.prisma.service.delete({
      where: { id },
    });
  }
}
