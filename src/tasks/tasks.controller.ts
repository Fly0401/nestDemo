/**
 * 任务控制器（Tasks Controller）
 *
 * 类比前端：相当于 Vue Router 中 tasks 页面的路由配置
 * - 每个 @Get/@Post/@Patch/@Delete 装饰器对应一个 API 路由
 * - @Controller('tasks') 为所有路由添加 /tasks 前缀
 * - @Body/@Param/@Query 装饰器用于获取请求中的数据
 */
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam, ApiResponse } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './enums/task-status.enum';
import { Task } from './task.entity';

// Swagger 文档分组：在 API 文档页中，这些接口会归类在"任务管理"下
@ApiTags('任务管理')
// 路由前缀为 /tasks，类比前端 Vue Router 的 path: '/tasks'
@Controller('tasks')
export class TasksController {
  // Service 通过构造函数注入，NestJS IoC 容器自动提供实例
  // 类比前端：相当于 Vue 的 inject('tasksService')
  constructor(private readonly tasksService: TasksService) {}

  // ========== 新增任务 ==========
  @Post() // POST /tasks
  @ApiOperation({ summary: '新增任务' })
  @ApiResponse({ status: 201, description: '创建成功', type: Task })
  create(@Body() dto: CreateTaskDto): Promise<Task> {
    // @Body() 自动解析请求体中的 JSON 数据
    // 类比前端：相当于 const { title, description } = await $fetch('/tasks', { method: 'POST', body })
    return this.tasksService.create(dto);
  }

  // ========== 获取任务列表 ==========
  @Get() // GET /tasks
  @ApiOperation({ summary: '获取任务列表' })
  // Swagger 参数描述：按状态筛选，可选参数
  @ApiQuery({ name: 'status', enum: TaskStatus, required: false, description: '按状态筛选' })
  @ApiResponse({ status: 200, description: '查询成功', type: [Task] })
  findAll(@Query('status') status?: TaskStatus): Promise<Task[]> {
    // @Query() 获取 URL 查询参数，如 GET /tasks?status=TODO
    // 类比前端：相当于 const status = route.query.status
    return this.tasksService.findAll(status);
  }

  // ========== 获取单个任务详情 ==========
  @Get(':id') // GET /tasks/:id
  @ApiOperation({ summary: '获取任务详情' })
  @ApiParam({ name: 'id', description: '任务ID', example: 1 })
  @ApiResponse({ status: 200, description: '查询成功', type: Task })
  @ApiResponse({ status: 404, description: '任务不存在' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    // @Param('id') 获取路由参数中的 id
    // ParseIntPipe：自动将字符串类型的路由参数转换为整数
    // 类比前端：相当于 const id = parseInt(route.params.id)
    return this.tasksService.findOne(id);
  }

  // ========== 更新任务状态 ==========
  @Patch(':id/status') // PATCH /tasks/:id/status
  @ApiOperation({ summary: '更新任务状态' })
  @ApiParam({ name: 'id', description: '任务ID', example: 1 })
  @ApiResponse({ status: 200, description: '更新成功', type: Task })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.tasksService.updateStatus(id, dto);
  }

  // ========== 删除任务 ==========
  @Delete(':id') // DELETE /tasks/:id
  @HttpCode(HttpStatus.NO_CONTENT) // 删除成功返回 204，无响应体
  @ApiOperation({ summary: '删除任务' })
  @ApiParam({ name: 'id', description: '任务ID', example: 1 })
  @ApiResponse({ status: 204, description: '删除成功' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.remove(id);
  }
}
