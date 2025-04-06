import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateClientDto {
  @ApiProperty({ example: "Jane Doe", required: false })
  @IsOptional()
  name?: string;
}
