import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, MinLength } from "class-validator";

export class UpdateOwnerDto {
  @ApiProperty({ example: "Updated Establishment", required: false })
  @IsOptional()
  establishmentName?: string;

  @ApiProperty({ example: "updated@example.com", required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: "newpassword123", required: false })
  @IsOptional()
  @MinLength(6)
  password?: string;

  @ApiProperty({ example: "+5511987654321", required: false })
  @IsOptional()
  phone?: string;
}
