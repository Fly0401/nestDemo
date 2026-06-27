/**
 * 更新任务状态的 DTO
 *
 * 类比前端：相当于表单中仅包含"状态"下拉框的部分
 * 只允许更新 status 字段，防止恶意用户通过请求体传入其他字段（如 title、id）
 */
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../enums/task-status.enum';

export class UpdateTaskStatusDto {
  /**
   * 任务状态
   *
   * 校验规则：
   *   - 值必须是 TaskStatus 枚举中的一员（TODO / IN_PROGRESS / DONE）
   *   - 传错值会返回 400 错误
   *
   * 类比前端：
   *   <select v-model="status">
   *     <option value="TODO">待办</option>
   *     <option value="IN_PROGRESS">进行中</option>
   *     <option value="DONE">已完成</option>
   *   </select>
   */
  @ApiProperty({ description: '任务状态', enum: TaskStatus, example: TaskStatus.IN_PROGRESS })
  @IsEnum(TaskStatus, { message: '状态值必须是 TODO | IN_PROGRESS | DONE 之一' })
  status: TaskStatus;
}
