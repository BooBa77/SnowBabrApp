import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TelegramLoginDto } from './dto/telegram-login.dto';
import * as crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TelegramLoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateTelegramData(dto: TelegramLoginDto): Promise<User> {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if (!botToken) {
      throw new InternalServerErrorException('TELEGRAM_BOT_TOKEN is not defined');
    }

    const dataCheckString = Object.keys(dto)
      .filter((key) => key !== 'hash')
      .sort()
      .map((key) => `${key}=${dto[key]}`)
      .join('\n');

    const secret = crypto
      .createHmac('sha256', botToken) // Используем botToken
      .update(dataCheckString)
      .digest();


    const hash = crypto
      .createHmac('sha256', secret)
      .update(dataCheckString)
      .digest('hex');

    if (hash !== dto.hash) {
      throw new Error('Data is not from Telegram');
    }

    const user = await this.userRepository.findOne({ where: { telegramId: dto.id } });

    if (user) {
      // Обновляем данные пользователя
      user.firstName = dto.first_name ?? null;
      user.lastName = dto.last_name ?? null;
      user.username = dto.username ?? null;
      user.photoUrl = dto.photo_url ?? null;
      await this.userRepository.save(user);
      return user;
    } else {
      // Создаем нового пользователя
      const newUser = this.userRepository.create({
        telegramId: dto.id,
        firstName: dto.first_name ?? null,
        lastName: dto.last_name ?? null,
        username: dto.username ?? null,
        photoUrl: dto.photo_url ?? null,
      });
      await this.userRepository.save(newUser);
      return newUser;
    }
  }
}