import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TelegramLoginController } from './telegram-login/telegram-login.controller';
import { TelegramLoginService } from './telegram-login/telegram-login.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432, // Преобразуем в число
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}', User], // Путь к сущностям (entity)
      synchronize: true,
      ssl: {
        rejectUnauthorized: false, // Для Render (использует самоподписанные сертификаты)
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController, TelegramLoginController],
  providers: [AppService, TelegramLoginService],
})
export class AppModule {}