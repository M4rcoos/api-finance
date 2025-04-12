import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class UpdateExpenseDto {
  @ApiProperty({ example: "Updated supplies description", required: false })
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 200.75, required: false })
  @IsNumber()
  @IsOptional()
  value?: number;

  @ApiProperty({ example: "2023-06-16T14:30:00Z", required: false })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  date?: Date;
}
