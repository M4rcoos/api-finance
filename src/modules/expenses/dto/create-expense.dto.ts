import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class CreateExpenseDto {
  @ApiProperty({ example: "Product supplies" })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 150.5 })
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @ApiProperty({ example: "2023-06-15T12:00:00Z", required: false })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  date?: Date;
}
