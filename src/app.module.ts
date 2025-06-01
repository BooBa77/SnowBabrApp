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
      host: 'dpg-d0t9jic9c44c7398jar0-a.oregon-postgres.render.com',
      port: 5432,
      username: 'dbtelegram_user',
      password: '01uvSf1N2nvN0c52j8HQyL6yKzzEiPvH',
      database: 'dbtelegram',
      entities: [__dirname + '/**/*.entity{.ts,.js}', User], // Путь к сущностям (entity)
      synchronize: true,
      ssl: true, // Включить SSL
      extra: {
        ssl: {
          rejectUnauthorized: false, // Для Render (использует самоподписанные сертификаты)
        },
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController, TelegramLoginController],
  providers: [AppService, TelegramLoginService],
})
export class AppModule {}