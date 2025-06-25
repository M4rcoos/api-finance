import { Test, TestingModule } from '@nestjs/testing';
import { AuthUseCase } from './auth.use-case';
import { OwnerRepository } from '../../repositories/owner/owners.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { equal } from 'assert';



describe('AuthUseCase Tests', () => {
    let userService: AuthUseCase;
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    secret: 'fasdsgbsd',
                    signOptions: { expiresIn: '1h' },
                }),
            ],
            providers: [OwnerRepository, PrismaService, AuthUseCase]
        }).compile();

        userService = moduleFixture.get<AuthUseCase>(AuthUseCase);
    });

    it('Should be defined', () => {
        expect(userService).toBeDefined();
    });

    it('should return a JWT when credentials are valid', async () => {
        const result = await userService.login({ email: 'vini@admin.com', password: '123456' });
        expect(result).toHaveProperty("token")
        expect(typeof result.token).toBe('string')
        expect(result.owner).toEqual({
            id: 4,
            email: "vini@admin.com",
            phone: "11930772498",
            establishmentName: "viniTI"
        });
    });
});