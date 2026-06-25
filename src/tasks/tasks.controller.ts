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

@ApiTags('任务管理')
@Controller('tasks')
export class TasksController {
  // Service 通过构造函数注入，NestJS IoC 容器自动提供实例
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: '新增任务' })
  @ApiResponse({ status: 201, description: '创建成功', type: Task })
  create(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: '获取任务列表' })
  @ApiQuery({ name: 'status', enum: TaskStatus, required: false, description: '按状态筛选' })
  @ApiResponse({ status: 200, description: '查询成功', type: [Task] })
  findAll(@Query('status') status?: TaskStatus): Promise<Task[]> {
    return this.tasksService.findAll(status);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取任务详情' })
  @ApiParam({ name: 'id', description: '任务ID', example: 1 })
  @ApiResponse({ status: 200, description: '查询成功', type: Task })
  @ApiResponse({ status: 404, description: '任务不存在' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    // ParseIntPipe：路由参数自动转换为整数，非法值直接返回 400
    return this.tasksService.findOne(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: '更新任务状态' })
  @ApiParam({ name: 'id', description: '任务ID', example: 1 })
  @ApiResponse({ status: 200, description: '更新成功', type: Task })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.tasksService.updateStatus(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 删除成功返回 204，无响应体
  @ApiOperation({ summary: '删除任务' })
  @ApiParam({ name: 'id', description: '任务ID', example: 1 })
  @ApiResponse({ status: 204, description: '删除成功' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.remove(id);
  }
}
