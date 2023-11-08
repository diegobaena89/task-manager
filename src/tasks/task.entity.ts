import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task.status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid') // gera o id para nossa classe
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
