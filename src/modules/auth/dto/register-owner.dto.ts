import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterOwnerDto {
  @ApiProperty({ example: "My Establishment" })
  @IsNotEmpty()
  establishmentName: string;

  @ApiProperty({ example: "owner@example.com" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "password123" })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: "+5511987654321" })
  @IsNotEmpty()
  phone: string;
}
