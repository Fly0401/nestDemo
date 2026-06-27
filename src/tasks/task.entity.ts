/**
 * 任务实体（Task Entity）
 *
 * 类比前端：相当于 TypeScript 接口定义 + Prisma Schema 的组合
 * 作用：
 *   1. 定义数据模型（数据库表结构）
 *   2. 作为 TypeScript 类型使用
 *   3. 配合 DTO 做数据校验和 API 文档生成
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from './enums/task-status.enum';

// @Entity('tasks') 声明这是一个实体类，对应数据库中的 tasks 表
@Entity('tasks')
export class Task {
  /**
   * 任务 ID（主键，自增）
   *
   * @PrimaryGeneratedColumn() 表示这是主键且由数据库自动生成（自增 ID）
   * 类比前端：相当于数据库层面的 id: number @Primary
   */
  @ApiProperty({ description: '任务ID', example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * 任务标题
   *
   * @Column({ length: 100 }) 对应数据库中的 VARCHAR(100)
   * 类比前端：相当于表单中 <input v-model="title" maxlength="100">
   */
  @ApiProperty({ description: '任务标题', example: '完成需求评审' })
  @Column({ length: 100 })
  title!: string;

  /**
   * 任务描述（可选字段）
   *
   * @Column({ type: 'text', nullable: true }) 对应数据库中的 TEXT 类型，允许为空
   * nullable: true 表示该字段可以为 null
   * 类比前端：相当于 <textarea v-model="description" :required="false">
   */
  @ApiProperty({ description: '任务描述', example: '详细描述任务内容', required: false })
  @Column({ type: 'text', nullable: true })
  description!: string;

  /**
   * 任务状态（枚举类型）
   *
   * @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.TODO })
   * 对应数据库中的 ENUM 类型，默认值为 TODO
   * 类比前端：相当于 <select v-model="status">，选项为枚举值
   */
  @ApiProperty({ description: '任务状态', enum: TaskStatus, example: TaskStatus.TODO })
  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.TODO })
  status!: TaskStatus;

  /**
   * 创建时间（自动填充）
   *
   * @CreateDateColumn() 表示该字段在插入记录时自动写入当前时间
   * 类比前端：相当于 new Date().toISOString() 自动赋值
   */
  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
  createdAt!: Date;

  /**
   * 更新时间（自动更新）
   *
   * @UpdateDateColumn() 表示该字段在每次更新记录时自动更新为当前时间
   * 类比前端：相当于 updatedAt 字段在每次保存时自动刷新
   */
  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
  updatedAt!: Date;
}
