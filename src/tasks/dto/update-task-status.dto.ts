import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../enums/task-status.enum';

export class UpdateTaskStatusDto {
  @ApiProperty({ description: '任务状态', enum: TaskStatus, example: TaskStatus.IN_PROGRESS })
  @IsEnum(TaskStatus, { message: '状态值必须是 TODO | IN_PROGRESS | DONE 之一' })
  status: TaskStatus;
}
