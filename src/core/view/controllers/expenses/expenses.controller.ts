import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
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
import { JwtAuthGuard } from "../../middlewares/guards/jwt-auth.guard";

import { ExpensesUseCase } from "src/core/app/usecase/expenses/expenses.service";
import { ExpensesRepository } from "src/core/app/repositories/expenses/expenses.service";
import { CreateExpenseDto } from "src/core/app/DTO/create-expense.dto";
import { UpdateExpenseDto } from "src/core/app/DTO/update-expense.dto";
import { ok } from "src/core/domain/http/api-response";

@ApiTags("Expenses")
@Controller("expenses")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ExpensesController {
  constructor(private readonly expensesUseCase: ExpensesUseCase ) {}

  @Post()
  @ApiOperation({ summary: "Create a new expense" })
  async create(@Body() createExpenseDto: CreateExpenseDto, @Request() req) {
    const response = await this.expensesUseCase.create(createExpenseDto, req.user.id);
    return ok({payload:response})
  }

  @Get()
  @ApiOperation({ summary: "Get all expenses for current owner" })
  @ApiQuery({ name: "startDate", required: false, type: Date })
  @ApiQuery({ name: "endDate", required: false, type: Date })
  async findAll(
    @Request() req,
    @Query("startDate") startDate?: string,
    @Query("endDate") endDate?: string
  ) {
    const response = await  this.expensesUseCase.findAll(
      req.user.id,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined
    );
    return ok({payload:response})
  }

  @Get(":id")
  @ApiOperation({ summary: "Get an expense by ID" })

  async findOne(@Param("id", ParseIntPipe) id: number, @Request() req) {
    const response = await this.expensesUseCase.findOne(id, req.user.id);
    return ok({payload:response})
  }

  @Put(":id")
  @ApiOperation({ summary: "Update an expense" })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
    @Request() req
  ) {
    const response = await this.expensesUseCase.update(id, updateExpenseDto, req.user.id);
    return ok({payload:response})
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete an expense" })
  @ApiResponse({ status: 200, description: "Expense deleted successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Expense not found" })
  async remove(@Param("id", ParseIntPipe) id: number, @Request() req) {
    const response = await this.expensesUseCase.remove(id, req.user.id);
    return ok({payload:response})
  }
}
