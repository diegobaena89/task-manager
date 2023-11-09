import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task.status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  getTaskById(id: string, user: User): Promise<Task> {
    return this.tasksRepository.getTaskById(id, user);
  }

  deleteTask(id: string, user: User): Promise<void> {
    return this.tasksRepository.deleteTask(id, user);
  }

  updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
    return this.tasksRepository.updateTask(id, status, user);
  }
}
