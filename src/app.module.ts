/**
 * 根模块（Root Module）
 *
 * 类比前端：相当于 Vue 的 App.vue / main.ts 中的根组件注册，是整个应用的顶层模块
 * NestJS 采用模块化架构，每个功能拆分为独立模块，再由根模块统一导入
 */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    // ========== 配置模块 ==========
    // 类比前端：相当于 .env 文件 + dotenv 包
    // isGlobal: true 让 ConfigService 在所有模块中可用，无需在每个模块中重复导入 ConfigModule
    ConfigModule.forRoot({ isGlobal: true }),

    // ========== 数据库模块（异步配置） ==========
    // forRootAsync：异步注册 TypeORM，等 ConfigModule 加载完 .env 后再连接数据库
    // 类比前端：相当于在 mounted 生命周期中异步初始化 axios 实例
    TypeOrmModule.forRootAsync({
      inject: [ConfigService], // 注入 ConfigService 以读取 .env 中的配置
      useFactory: (config: ConfigService) => ({
        type: 'mysql',                    // 数据库类型
        host: config.get<string>('DB_HOST'),       // 从 .env 读取数据库地址
        port: config.get<number>('DB_PORT'),      // 从 .env 读取数据库端口
        username: config.get<string>('DB_USERNAME'),  // 从 .env 读取用户名
        password: config.get<string>('DB_PASSWORD'),  // 从 .env 读取密码
        database: config.get<string>('DB_DATABASE'),  // 从 .env 读取数据库名
        entities: [Task],                 // 注册实体类，TypeORM 据此管理数据表
        // synchronize: true 开发时自动同步实体到数据库表结构
        // 类比前端：相当于数据库的"热更新"，改了实体类自动改表结构
        // ⚠️ 生产环境必须关闭！否则可能丢失数据
        synchronize: true,
      }),
    }),

    // ========== 功能模块 ==========
    // 导入任务管理模块，类似 Vue 中 import 并注册一个页面组件
    TasksModule,
  ],
})
export class AppModule {}
