import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432, // Проверяем, определен ли DB_PORT
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'], // Путь к сущностям (после сборки)
  migrations: ['dist/migrations/**/*{.ts,.js}'], // Путь к миграциям (после сборки)
  synchronize: false, // Отключаем автоматическую синхронизацию
  migrationsRun: false, // Не запускаем миграции автоматически при старте приложения
  ssl: {
    rejectUnauthorized: false, // Для Render (использует самоподписанные сертификаты)
  },
});