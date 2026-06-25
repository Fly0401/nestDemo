import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: '任务标题', example: '完成需求评审', maxLength: 100 })
  @IsString()
  @IsNotEmpty({ message: '标题不能为空' })
  @MaxLength(100, { message: '标题最多100个字符' })
  title: string;

  @ApiProperty({ description: '任务描述（可选）', example: '与产品经理对齐需求细节', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
