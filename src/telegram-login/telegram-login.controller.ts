import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { TelegramLoginDto } from './dto/telegram-login.dto';
import { TelegramLoginService } from './telegram-login.service';
import { User } from '../entities/user.entity';

@Controller('telegram-login')
export class TelegramLoginController {
  constructor(private readonly telegramLoginService: TelegramLoginService) {}

  @Post()
  async telegramLogin(@Body(new ValidationPipe()) dto: TelegramLoginDto): Promise<User> {
    return this.telegramLoginService.validateTelegramData(dto);
  }
}