import { Test, TestingModule } from '@nestjs/testing';
import { TelegramLoginService } from './telegram-login.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

describe('TelegramLoginService', // Описание набора тестов
  () => {
  let service: TelegramLoginService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TelegramLoginService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository, // Мок репозитория
        },
      ],
    }).compile();

    service = module.get<TelegramLoginService>(TelegramLoginService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});