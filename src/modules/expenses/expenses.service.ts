import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async create(createExpenseDto: CreateExpenseDto, ownerId: number) {
    return this.prisma.expense.create({
      data: {
        ...createExpenseDto,
        ownerId,
      },
    });
  }

  async findAll(ownerId: number, startDate?: Date, endDate?: Date) {
    const where: any = { ownerId };

    if (startDate || endDate) {
      where.date = {};
      if (startDate) {
        where.date.gte = startDate;
      }
      if (endDate) {
        where.date.lte = endDate;
      }
    }

    return this.prisma.expense.findMany({
      where,
      orderBy: {
        date: 'desc',
      },
    });
  }

  async findOne(id: number, ownerId: number) {
    const expense = await this.prisma.expense.findUnique({
      where: { id },
    });

    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    if (expense.ownerId !== ownerId) {
      throw new ForbiddenException('You do not have access to this expense');
    }

    return expense;
  }

  async update(
    id: number,
    updateExpenseDto: UpdateExpenseDto,
    ownerId: number,
  ) {
    // Check if expense exists and belongs to owner
    await this.findOne(id, ownerId);

    return this.prisma.expense.update({
      where: { id },
      data: updateExpenseDto,
    });
  }

  async remove(id: number, ownerId: number) {
    // Check if expense exists and belongs to owner
    await this.findOne(id, ownerId);

    return this.prisma.expense.delete({
      where: { id },
    });
  }
}
