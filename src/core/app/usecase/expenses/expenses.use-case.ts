import { Injectable } from "@nestjs/common";
import { ExpensesRepository } from "../../repositories/expenses/expenses.service";
import { CreateExpenseDto } from "../../DTO/create-expense.dto";
import { UpdateExpenseDto } from "../../DTO/update-expense.dto";
import { Expense } from "src/core/domain/entities/expenses.entity";

@Injectable()
export class ExpensesUseCase {
  constructor(private readonly expenseRepo: ExpensesRepository) {}

  async create(data: { description: string; value: number ; date?:Date}, ownerId: number) {

      const expense = new Expense(data.description, data.value, ownerId, data.date);
    return this.expenseRepo.create(expense, ownerId);
  }

  async findAll(ownerId: number, startDate?: Date, endDate?: Date) {
    return this.expenseRepo.findAll(ownerId, startDate, endDate);
  }

  async findOne(id: number, ownerId: number) {
    return this.expenseRepo.findOne(id, ownerId);
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto, ownerId: number) {
    return this.expenseRepo.update(id, updateExpenseDto, ownerId);
  }

  async remove(id: number, ownerId: number) {
    return this.expenseRepo.remove(id, ownerId);
  }
}
