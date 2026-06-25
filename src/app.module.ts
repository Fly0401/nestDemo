import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    // 全局加载 .env 文件，isGlobal 使所有模块都能用 ConfigService
    ConfigModule.forRoot({ isGlobal: true }),

    // 异步配置数据库，等 ConfigModule 加载完 .env 后再连接
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        entities: [Task],
        // synchronize: true 开发时自动同步实体到数据库表结构，生产环境必须关闭
        synchronize: true,
      }),
    }),

    TasksModule,
  ],
})
export class AppModule {}
