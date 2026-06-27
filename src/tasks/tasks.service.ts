/**
 * 任务服务（Tasks Service）
 *
 * 类比前端：相当于 Vue 的 composable / React 的自定义 Hook / Vuex getter + action
 * Service 负责业务逻辑和数据操作，不关心 HTTP 请求细节
 * 它是 Controller 和数据库之间的中间层
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './enums/task-status.enum';

@Injectable() // 声明为可注入的服务
export class TasksService {
  /**
   * 通过依赖注入获取 TypeORM 的 Repository
   *
   * @InjectRepository(Task) 告诉 NestJS 注入 Task 对应的数据仓库
   * Repository 类似于前端 ORM（如 Prisma）的客户端，封装了所有数据库操作
   * 类比前端：相当于 const { data } = await useTaskRepo()
   */
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  /**
   * 创建新任务
   * @param dto 创建任务的数据传输对象
   */
  async create(dto: CreateTaskDto): Promise<Task> {
    // create() 只是构造实体对象（纯内存操作，还没写入数据库）
    // 类比前端：相当于 const task = { ...dto } （只是创建了一个 JS 对象）
    const task = this.taskRepository.create(dto);
    // save() 才真正将实体保存到数据库
    // 类比前端：相当于 await api.post('/tasks', dto)
    return this.taskRepository.save(task);
  }

  /**
   * 获取任务列表
   * @param status 可选的状态筛选条件
   */
  async findAll(status?: TaskStatus): Promise<Task[]> {
    if (status) {
      // 按状态筛选任务
      return this.taskRepository.findBy({ status });
    }
    // 获取全部任务，按创建时间降序排列（最新的在前）
    // 类比前端：相当于 SQL 中的 ORDER BY createdAt DESC
    return this.taskRepository.find({ order: { createdAt: 'DESC' } });
  }

  /**
   * 根据 ID 获取单个任务
   * @param id 任务 ID
   * @throws NotFoundException 如果任务不存在，自动返回 HTTP 404
   */
  async findOne(id: number): Promise<Task> {
    // findOneBy：根据条件查找单条记录，找不到返回 null
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      // NestJS 内置异常，自动返回 404 HTTP 状态码和错误消息
      // 类比前端：相当于 Vue Router 的 404 页面 / 或 throw createError(404)
      throw new NotFoundException(`任务 #${id} 不存在`);
    }
    return task;
  }

  /**
   * 更新任务状态
   * @param id 任务 ID
   * @param dto 包含新状态的 DTO
   */
  async updateStatus(id: number, dto: UpdateTaskStatusDto): Promise<Task> {
    // 先验证任务是否存在（不存在会抛出 404）
    const task = await this.findOne(id);
    // 修改状态
    task.status = dto.status;
    // save() 会检测到实体已被修改，执行 UPDATE 语句
    return this.taskRepository.save(task);
  }

  /**
   * 删除任务
   * @param id 任务 ID
   */
  async remove(id: number): Promise<void> {
    // 先验证任务是否存在
    const task = await this.findOne(id);
    // 从数据库中删除该记录
    // 类比前端：相当于 await api.delete(`/tasks/${id}`)
    await this.taskRepository.remove(task);
  }
}
