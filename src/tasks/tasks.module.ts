/**
 * 任务管理功能模块（Tasks Module）
 *
 * 类比前端：相当于 Vue 中一个功能页面（如 src/pages/tasks/），包含该页面的路由、API 服务、数据模型
 * NestJS 推荐按功能（feature）拆分模块，每个模块是自包含的单元
 * 一个完整模块通常包含：控制器(Controller) + 服务(Service) + 实体(Entity) + DTO
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Module({
  // forFeature：注册当前模块使用的实体
  // 类比前端：相当于在 Vuex store 中注册一个模块的状态
  // TypeORM 据此为 Task 实体生成对应的 Repository（数据仓库），供 Service 使用
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],  // 注册当前模块的路由控制器
  providers: [TasksService],       // 注册当前模块的服务（业务逻辑）
})
export class TasksModule {}
