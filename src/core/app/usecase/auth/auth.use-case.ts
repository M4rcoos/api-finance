import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { LoginDto } from "../../../app/DTO/login.dto";
import { findEmailDto, RegisterOwnerDto } from "../../../app/DTO/register-owner.dto";
import { OwnerRepository } from "../../repositories/owner/owners.service";
import { OwnerEntity } from "src/core/domain/entities/owner.entity";
import { badRequest } from "src/core/domain/http/api-response";


@Injectable()
export class AuthUseCase {
  constructor(
    private OwnerRepository: OwnerRepository,
    private jwtService: JwtService
  ) {}
  

  async register(registerOwnerDto: RegisterOwnerDto) {
    const existingOwner = await this.OwnerRepository.findByEmail(
      registerOwnerDto.email
    );
    if (existingOwner) {
      throw new ConflictException("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(registerOwnerDto.password, 10);

    const newOwner = await this.OwnerRepository.create({
      ...registerOwnerDto,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = this.jwtService.sign({
      sub: newOwner.id,
      email: newOwner.email,
    });

    return {
      token,
      owner: {
        id: newOwner.id,
        email: newOwner.email,
        establishmentName: newOwner.establishmentName,
      },
    };
  }
  async login(loginDto: LoginDto) {
    const ownerData = await this.OwnerRepository.findByEmail(loginDto.email);
    if (!ownerData) {
      throw new UnauthorizedException("Invalid email or password");
    }
    const owner = new OwnerEntity(
      ownerData.id,
      ownerData.email,
      ownerData.password,
      ownerData.phone,
      ownerData.establishmentName,
    );

    const isPasswordValid = await owner.isPasswordValid(loginDto.password)
    if (!isPasswordValid) {
    throw new UnauthorizedException("Invalid email or password");
    }
 
    const token = this.jwtService.sign({
      sub: owner.id,
      email: owner.email,
    });

    return {
      token,
      owner: {
        id: owner.id,
        email: owner.email,
        phone:owner.phone,
        establishmentName: owner.establishmentName,
      },
    };
  }
  async getOwner(itOwner: findEmailDto) {
   if(itOwner.email === null ||itOwner.email === undefined|| itOwner.email === ""){
    badRequest({errors:"insira um email"});
   }
    const email = (itOwner as any).email?.email || itOwner.email;

  
    const owner = await this.OwnerRepository.findByEmail(email);
  
    if (!owner?.email) {
      badRequest({errors:"Email inválido"});
    }
    return {
      owner: {
        id: owner.id,
        email: owner.email,
        establishmentName: owner.establishmentName,
      },
    };
  }
  
  
}

