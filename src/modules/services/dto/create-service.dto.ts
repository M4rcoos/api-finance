import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsBoolean, IsOptional } from "class-validator";

export class CreateServiceDto {
  @ApiProperty({ example: "Basic Car Wash" })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 29.99 })
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @ApiProperty({ example: true, required: false, default: true })
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
