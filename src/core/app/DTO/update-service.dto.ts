import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber, IsBoolean } from "class-validator";

export class UpdateServiceDto {
  @ApiProperty({ example: "Premium Car Wash", required: false })
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 39.99, required: false })
  @IsNumber()
  @IsOptional()
  value?: number;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
