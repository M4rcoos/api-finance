import { Injectable, BadRequestException } from '@nestjs/common';
import { RegisterOwnerDto } from '../../DTO/register-owner.dto';
import { OwnerRepository } from '../../repositories/owner/owners.service';
import { UpdateOwnerDto } from '../../DTO/update-owner.dto';

@Injectable()
export class OwnersUseCase {
  constructor(private readonly ownerRepository: OwnerRepository) {}

  async register(data: RegisterOwnerDto) {
    const existingOwner = await this.ownerRepository.findByEmail(data.email);

    if (existingOwner) {
      throw new BadRequestException('E-mail já está em uso');
    }

    return this.ownerRepository.create(data);
  }

  async getProfile(id: number) {
    return this.ownerRepository.findById(id);
  }

  async update(id: number, data: UpdateOwnerDto) {
    return this.ownerRepository.update(id, data);
  }
}
