import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsEnum } from "class-validator";

enum PaymentMethod {
  CASH = "cash",
  CREDIT = "credit",
  DEBIT = "debit",
  PIX = "pix",
}

export class CreateTransactionDto {
  @ApiProperty({ example: 50.0 })
  @IsNumber()
  @IsNotEmpty()
  totalValue: number;

  @ApiProperty({ enum: PaymentMethod, example: PaymentMethod.CREDIT })
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  clientId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  serviceId: number;
}
