import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ServicesService } from '../services/services.service';
import { ClientsService } from '../clients/clients.service';

@Injectable()
export class TransactionsService {
  constructor(
    private prisma: PrismaService,
    private servicesService: ServicesService,
    private clientsService: ClientsService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, ownerId: number) {
    // Check if service exists and belongs to owner
    await this.servicesService.findOne(createTransactionDto.serviceId, ownerId);

    // Check if client exists
    await this.clientsService.findOne(createTransactionDto.clientId);

    return this.prisma.transaction.create({
      data: {
        ...createTransactionDto,
        ownerId,
      },
      include: {
        client: true,
        service: true,
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

    return this.prisma.transaction.findMany({
      where,
      include: {
        client: true,
        service: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async findOne(id: number, ownerId: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: {
        client: true,
        service: true,
      },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    if (transaction.ownerId !== ownerId) {
      throw new ForbiddenException(
        'You do not have access to this transaction',
      );
    }

    return transaction;
  }

  async getFinancialSummary(ownerId: number, startDate?: Date, endDate?: Date) {
    // Get all transactions for the period
    const transactions = await this.findAll(ownerId, startDate, endDate);

    // Get all expenses for the period
    const expensesWhere: any = { ownerId };
    if (startDate || endDate) {
      expensesWhere.date = {};
      if (startDate) {
        expensesWhere.date.gte = startDate;
      }
      if (endDate) {
        expensesWhere.date.lte = endDate;
      }
    }

    const expenses = await this.prisma.expense.findMany({
      where: expensesWhere,
    });

    // Calculate total revenue
    const totalRevenue = transactions.reduce(
      (sum, transaction) => sum + transaction.totalValue,
      0,
    );

    // Calculate revenue by payment method
    const revenueByPaymentMethod = transactions.reduce((acc, transaction) => {
      const method = transaction.paymentMethod;
      if (!acc[method]) {
        acc[method] = 0;
      }
      acc[method] += transaction.totalValue;
      return acc;
    }, {} as Record<string, number>);

    // Calculate total expenses
    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.value,
      0,
    );

    // Calculate net profit
    const netProfit = totalRevenue - totalExpenses;

    return {
      totalRevenue,
      revenueByPaymentMethod,
      totalExpenses,
      netProfit,
      period: {
        startDate: startDate || 'all time',
        endDate: endDate || 'present',
      },
    };
  }
}
