import * as bcrypt from 'bcrypt';

export class OwnerEntity {
    constructor(
      public readonly id: number,
      public readonly email: string,
      public readonly password: string,
      public readonly establishmentName: string,
    ) {}
  
    isPasswordValid(password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password);
    }
  
    toResponse() {
      return {
        id: this.id,
        email: this.email,
        establishmentName: this.establishmentName,
      };
    }
  }
  