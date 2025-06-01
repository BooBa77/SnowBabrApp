import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class TelegramLoginDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  photo_url?: string;

  @IsString()
  @IsNotEmpty()
  hash: string;
}