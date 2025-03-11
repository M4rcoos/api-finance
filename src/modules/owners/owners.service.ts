import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { RegisterOwnerDto } from '../auth/dto/register-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OwnersService {
  constructor(private prisma: PrismaService) {}

  async create(data: RegisterOwnerDto) {
    return this.prisma.owner.create({
      data,
    });
  }

  async findById(id: number) {
    const owner = await this.prisma.owner.findUnique({
      where: { id },
      select: {
        id: true,
        establishmentName: true,
        email: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!owner) {
      throw new NotFoundException(`Owner with ID ${id} not found`);
    }

    return owner;
  }

  async findByEmail(email: string) {
    return this.prisma.owner.findUnique({
      where: { email },
    });
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto) {
    // Check if owner exists
    await this.findById(id);

    const data: any = { ...updateOwnerDto };

    // If password is provided, hash it
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.owner.update({
      where: { id },
      data,
      select: {
        id: true,
        establishmentName: true,
        email: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
