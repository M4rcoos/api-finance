import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateTransactionDto } from '../../DTO/create-transaction.dto';
import { ServicesRepository } from '../../repositories/services/services.service';
import { ClientRepository } from '../../repositories/clients/clients.service';
import { TransactionsRepository } from '../../repositories/transactions/transactions.service';


@Injectable()
export class TransactionUseCase {
  constructor(
    private transactionRepo: TransactionsRepository,
    private servicesRepo: ServicesRepository,
    private clientsRepo: ClientRepository,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, ownerId: number) {
    // Validações
    const service = await this.servicesRepo.findOne(createTransactionDto.serviceId, ownerId);
    if (service?.ownerId !== ownerId) {
      throw new ForbiddenException('Você não tem acesso a este serviço.');
    }

    const client = await this.clientsRepo.findOne(createTransactionDto.clientId);
    if (!client) {
      throw new NotFoundException(`Cliente com ID ${createTransactionDto.clientId} não encontrado.`);
    }

    // Criação
    return this.transactionRepo.create(createTransactionDto, ownerId);
  }

  async findAll(ownerId: number, startDate?: Date, endDate?: Date) {
    return this.transactionRepo.findAll(ownerId, startDate, endDate);
  }

  async findOne(id: number, ownerId: number) {
    const transaction = await this.transactionRepo.findOne(id);
    if (transaction?.ownerId !== ownerId) {
      throw new ForbiddenException('Você não tem acesso a esta transação.');
    }
    return transaction;
  }

  async getFinancialSummary(ownerId: number, startDate?: Date, endDate?: Date) {
    return this.transactionRepo.getFinancialSummary(ownerId, startDate, endDate);
  }
}
