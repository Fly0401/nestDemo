import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './enums/task-status.enum';

@Injectable()
export class TasksService {
  // 通过依赖注入获取 TypeORM 的 Repository，它封装了所有数据库操作
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(dto: CreateTaskDto): Promise<Task> {
    // create() 只是构造实体对象（内存操作），save() 才真正写入数据库
    const task = this.taskRepository.create(dto);
    return this.taskRepository.save(task);
  }

  async findAll(status?: TaskStatus): Promise<Task[]> {
    if (status) {
      return this.taskRepository.findBy({ status });
    }
    return this.taskRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      // NestJS 内置异常，自动返回 404 HTTP 状态码
      throw new NotFoundException(`任务 #${id} 不存在`);
    }
    return task;
  }

  async updateStatus(id: number, dto: UpdateTaskStatusDto): Promise<Task> {
    const task = await this.findOne(id);
    task.status = dto.status;
    return this.taskRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }
}
