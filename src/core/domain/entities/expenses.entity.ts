import { badRequest } from '../http/api-response';

export class Expense {
  constructor(
    public readonly description: string,
    public readonly value: number,
    public readonly ownerId: number,
    public readonly date: Date = new Date(),
    public readonly id?: number,
) {
    if (value <= 0) {
      badRequest({ errors: 'O valor da despesa deve ser maior que zero.' });
    }

    if (!description || description.trim().length < 3) {
      badRequest({ errors: 'A descrição deve ter pelo menos 3 caracteres.' });
    }

    if (!(date instanceof Date) || isNaN(date.getTime())) {
      badRequest({ errors: 'Data inválida.' });
    }

    const now = new Date();
    const inputDateUTC = new Date(date.toISOString());
    
    
    if (inputDateUTC.getTime() > now.getTime()) {
      badRequest({ errors: 'A data da despesa não pode estar no futuro.' });
    }
    
   
    
  }
}
