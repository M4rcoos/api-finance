import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateClientDto {
  @ApiProperty({ example: "Marcos" })
  @IsNotEmpty()
  name: string;
  
  @ApiProperty({ example: "Vinicius" })
  @IsNotEmpty()
  surname: string;

  @ApiProperty({ example: "Vinicius" })
  phone: string;

  @ApiProperty({example:1})
  @IsNotEmpty()
  owner_id:number
}
