/**
 * 创建任务的 DTO（Data Transfer Object）
 *
 * 类比前端：相当于表单校验规则 + TypeScript 类型定义
 * DTO 的作用：
 *   1. 定义请求数据的结构和类型（TypeScript 类型安全）
 *   2. 配合 class-validator 做服务端数据校验（相当于前端的表单验证）
 *   3. 配合 Swagger 生成 API 文档的参数说明
 *
 * 类比前端表单验证：
 *   - @IsString()  → type="text" + inputmode="text"
 *   - @IsNotEmpty() → required
 *   - @MaxLength(100) → maxlength="100"
 */
import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  /**
   * 任务标题（必填）
   *
   * 校验规则：
   *   - 必须是字符串（@IsString）
   *   - 不能为空（@IsNotEmpty），否则返回 400 错误
   *   - 最多 100 个字符（@MaxLength(100)）
   *
   * 类比前端：
   *   <input v-model="title" required maxlength="100" />
   */
  @ApiProperty({ description: '任务标题', example: '完成需求评审', maxLength: 100 })
  @IsString()
  @IsNotEmpty({ message: '标题不能为空' })
  @MaxLength(100, { message: '标题最多100个字符' })
  title: string;

  /**
   * 任务描述（可选）
   *
   * 校验规则：
   *   - 必须是字符串（如果提供了值）
   *   - 可以不传（@IsOptional）
   *
   * 类比前端：<textarea v-model="description" /> 中可留空
   */
  @ApiProperty({ description: '任务描述（可选）', example: '与产品经理对齐需求细节', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
