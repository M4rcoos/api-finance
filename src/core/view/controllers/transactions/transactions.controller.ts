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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../middlewares/guards/jwt-auth.guard';
import { TransactionUseCase } from 'src/core/app/usecase/transactions/transactions.use-case';
import { CreateTransactionDto } from 'src/core/app/DTO/create-transaction.dto';
import { ok } from 'src/core/domain/http/api-response';

@ApiTags('Transactions')
@Controller('transactions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TransactionsController {
  constructor(private readonly transactionUseCase: TransactionUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  async create(@Body() createTransactionDto: CreateTransactionDto, @Request() req) {
    const response = await this.transactionUseCase.create(createTransactionDto, req.user.id);
    return ok({
      payload:  response ,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all transactions for current owner' })
  @ApiQuery({ name: 'startDate', required: false, type: Date })
  @ApiQuery({ name: 'endDate', required: false, type: Date })
  async findAll(
    @Request() req,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    const response = await this.transactionUseCase.findAll(
      req.user.id,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined
    );
    return ok({
      payload:  response ,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a transaction by ID' })
  async findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const response = await this.transactionUseCase.findOne(id, req.user.id);
    return ok({
      payload:  response ,
    });
  }

  @Get('reports/summary')
  @ApiOperation({ summary: 'Get financial summary by period' })
  @ApiQuery({ name: 'startDate', required: false, type: Date })
  @ApiQuery({ name: 'endDate', required: false, type: Date })
  async getFinancialSummary(
    @Request() req,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    const response = await this.transactionUseCase.getFinancialSummary(
      req.user.id,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined
    );
    return ok({
      payload:  response ,
    });
  }
}
