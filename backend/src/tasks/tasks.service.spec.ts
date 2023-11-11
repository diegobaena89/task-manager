import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { TaskStatus } from './task.status.enum';
import { NotFoundException } from '@nestjs/common';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  createTask: jest.fn(),
  getTaskById: jest.fn(),
  deleteTask: jest.fn(),
  updateTaskStatus: jest.fn(),
});

const mockUser = {
  username: 'Angel',
  id: 'anyId',
  password: '1346',
  tasks: [],
};

const mockTask = {
  title: 'Clean my room',
  description: 'Need to clean my room',
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = await module.get(TasksService);
    tasksRepository = await module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('should call getTasks and returns the result', async () => {
      tasksRepository.getTasks.mockResolvedValue('someValue');

      const result = await tasksService.getTasks(null, mockUser);

      expect(result).toEqual('someValue');
    });

    describe('createTask', () => {
      it('should call createtask and return the result', async () => {
        tasksRepository.createTask.mockResolvedValue('someValue');

        const result = await tasksService.createTask(mockTask, mockUser);

        expect(result).toEqual('someValue');
      });
    });

    describe('getTaskById', () => {
      it('should getTasksById and return the prperly data', async () => {
        tasksRepository.getTaskById.mockResolvedValue('someValue');

        const result = await tasksService.getTaskById('1', mockUser);

        expect(result).toEqual('someValue');
      });
    });

    describe('deleteTask', () => {
      it('should delete task', async () => {
        tasksRepository.deleteTask.mockResolvedValue('Task deleted');

        const result = await tasksService.deleteTask('1', mockUser);

        expect(result).toBe('Task deleted');
      });
    });

    describe('updateTaskStatus', () => {
      it('should update task status', async () => {
        const save = jest.fn().mockResolvedValue(true);

        tasksService.getTaskById = jest.fn().mockResolvedValue({
          status: TaskStatus.OPEN,
          save,
        });

        expect(tasksService.getTaskById).not.toHaveBeenCalled();
        expect(save).not.toHaveBeenCalled();

        const result = await tasksService.updateTaskStatus(
          '1',
          TaskStatus.IN_PROGRESS,
          mockUser,
        );

        expect(tasksService.getTaskById).toHaveBeenCalled();
        expect(save).toHaveBeenCalled();
        expect(result.status).toEqual(TaskStatus.IN_PROGRESS);
      });

      it('should throw NotFoundException if task is not found', async () => {
        tasksService.getTaskById = jest.fn().mockResolvedValue(null);

        expect(
          tasksService.updateTaskStatus('1', TaskStatus.IN_PROGRESS, mockUser),
        ).rejects.toThrow(NotFoundException);
      });
    });
  });
});
