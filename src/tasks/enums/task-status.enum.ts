/**
 * 任务状态枚举（Task Status Enum）
 *
 * 类比前端：相当于 Vue/React 中定义的状态常量
 * 使用枚举的好处：
 *   1. 类型安全 - 只能使用预定义的值，避免拼写错误
 *   2. 便于维护 - 状态值在一个地方集中管理
 *   3. API 文档友好 - Swagger 能自动读取枚举值展示
 */
export enum TaskStatus {
  TODO = 'TODO',           // 待办：任务已创建但尚未开始
  IN_PROGRESS = 'IN_PROGRESS', // 进行中：任务正在处理
  DONE = 'DONE',           // 已完成：任务已处理完毕
}
