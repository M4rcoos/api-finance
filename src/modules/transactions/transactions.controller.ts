import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from "@nestjs/swagger";
import { TransactionsService } from "./transactions.service";
import { JwtAuthGuard } from "../../core/view/middlewares/guards/jwt-auth.guard";
import { CreateTransactionDto } from "./dto/create-transaction.dto";

@ApiTags("Transactions")
@Controller("transactions")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new transaction" })
  @ApiResponse({ status: 201, description: "Transaction created successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  create(@Body() createTransactionDto: CreateTransactionDto, @Request() req) {
    return this.transactionsService.create(createTransactionDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: "Get all transactions for current owner" })
  @ApiResponse({ status: 200, description: "Returns all transactions" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiQuery({ name: "startDate", required: false, type: Date })
  @ApiQuery({ name: "endDate", required: false, type: Date })
  findAll(
    @Request() req,
    @Query("startDate") startDate?: string,
    @Query("endDate") endDate?: string
  ) {
    return this.transactionsService.findAll(
      req.user.id,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined
    );
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a transaction by ID" })
  @ApiResponse({ status: 200, description: "Returns the transaction" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Transaction not found" })
  findOne(@Param("id", ParseIntPipe) id: number, @Request() req) {
    return this.transactionsService.findOne(id, req.user.id);
  }

  @Get("reports/summary")
  @ApiOperation({ summary: "Get financial summary by period" })
  @ApiResponse({ status: 200, description: "Returns financial summary" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiQuery({ name: "startDate", required: false, type: Date })
  @ApiQuery({ name: "endDate", required: false, type: Date })
  getFinancialSummary(
    @Request() req,
    @Query("startDate") startDate?: string,
    @Query("endDate") endDate?: string
  ) {
    return this.transactionsService.getFinancialSummary(
      req.user.id,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined
    );
  }
}
