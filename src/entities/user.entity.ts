import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  telegramId: number;

  @Column('varchar', { nullable: true })
  firstName: string | null;

  @Column('varchar', { nullable: true })
  lastName: string | null;

  @Column('varchar', { nullable: true })
  username: string | null;

  @Column('varchar', { nullable: true })
  photoUrl: string | null;
}