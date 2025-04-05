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
import { ExpensesService } from "./expenses.service";
import { JwtAuthGuard } from "../../core/view/middlewares/guards/jwt-auth.guard";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@ApiTags("Expenses")
@Controller("expenses")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new expense" })
  @ApiResponse({ status: 201, description: "Expense created successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  create(@Body() createExpenseDto: CreateExpenseDto, @Request() req) {
    return this.expensesService.create(createExpenseDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: "Get all expenses for current owner" })
  @ApiResponse({ status: 200, description: "Returns all expenses" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiQuery({ name: "startDate", required: false, type: Date })
  @ApiQuery({ name: "endDate", required: false, type: Date })
  findAll(
    @Request() req,
    @Query("startDate") startDate?: string,
    @Query("endDate") endDate?: string
  ) {
    return this.expensesService.findAll(
      req.user.id,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined
    );
  }

  @Get(":id")
  @ApiOperation({ summary: "Get an expense by ID" })
  @ApiResponse({ status: 200, description: "Returns the expense" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Expense not found" })
  findOne(@Param("id", ParseIntPipe) id: number, @Request() req) {
    return this.expensesService.findOne(id, req.user.id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update an expense" })
  @ApiResponse({ status: 200, description: "Expense updated successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Expense not found" })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
    @Request() req
  ) {
    return this.expensesService.update(id, updateExpenseDto, req.user.id);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete an expense" })
  @ApiResponse({ status: 200, description: "Expense deleted successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Expense not found" })
  remove(@Param("id", ParseIntPipe) id: number, @Request() req) {
    return this.expensesService.remove(id, req.user.id);
  }
}
