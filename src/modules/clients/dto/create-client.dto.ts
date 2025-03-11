import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateClientDto {
  @ApiProperty({ example: "John Doe" })
  @IsNotEmpty()
  name: string;
}
