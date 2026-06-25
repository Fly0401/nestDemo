import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from './enums/task-status.enum';

@Entity('tasks')
export class Task {
  @ApiProperty({ description: '任务ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '任务标题', example: '完成需求评审' })
  @Column({ length: 100 })
  title: string;

  @ApiProperty({ description: '任务描述', example: '详细描述任务内容', required: false })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: '任务状态', enum: TaskStatus, example: TaskStatus.TODO })
  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.TODO })
  status: TaskStatus;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
  updatedAt: Date;
}
