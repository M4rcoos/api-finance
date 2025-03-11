import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { OwnersService } from "../owners/owners.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterOwnerDto } from "./dto/register-owner.dto";

@Injectable()
export class AuthService {
  constructor(
    private ownersService: OwnersService,
    private jwtService: JwtService
  ) {}

  async register(registerOwnerDto: RegisterOwnerDto) {
    // Check if owner already exists
    const existingOwner = await this.ownersService.findByEmail(
      registerOwnerDto.email
    );
    if (existingOwner) {
      throw new ConflictException("Email already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerOwnerDto.password, 10);

    // Create new owner
    const newOwner = await this.ownersService.create({
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
    // Find owner by email
    const owner = await this.ownersService.findByEmail(loginDto.email);
    if (!owner) {
      throw new UnauthorizedException("Invalid email or password");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      owner.password
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid email or password");
    }

    // Generate JWT token
    const token = this.jwtService.sign({
      sub: owner.id,
      email: owner.email,
    });

    return {
      token,
      owner: {
        id: owner.id,
        email: owner.email,
        establishmentName: owner.establishmentName,
      },
    };
  }
}
