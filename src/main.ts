/**
 * 应用入口文件
 *
 * 类比前端：相当于 React/Vue 项目的 index.html + main.js，是整个 NestJS 应用的启动入口
 * NestJS 会从这里读取 bootstrap() 函数，创建并启动 HTTP 服务器
 */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/response.interceptor';

/**
 * 异步引导函数：创建应用实例并配置全局中间件/管道/拦截器
 *
 * 类比前端：相当于 Vue 的 createApp() + app.use(globalPlugin) 的组合
 */
async function bootstrap() {
  // 创建 NestJS 应用实例，传入根模块（AppModule）
  // 类比前端：new Vue({ router, store, render })
  const app = await NestFactory.create(AppModule);

  // ========== 全局校验管道 ==========
  // ValidationPipe 类似于前端表单校验，但放在服务端自动执行
  // 它会：
  //   1. 校验请求体/参数是否符合 DTO 中定义的规则（class-validator 装饰器）
  //   2. whitelist: true 自动丢弃 DTO 中未声明的多余字段（防止 Mass Assignment 攻击）
  //   3. transform: true 自动将路由参数从 string 转为对应类型（如 id: '1' → 1）
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true, // 自动转换类型（如路由参数 string → number）
    }),
  );

  // ========== 全局响应拦截器 ==========
  // 类比前端：Axios 响应拦截器，统一包装所有接口的返回格式
  // 无需每个 Controller 手动返回 { code, message, data } 结构
  app.useGlobalInterceptors(new ResponseInterceptor());

  // ========== Swagger API 文档 ==========
  // 类比前端：Storybook 或接口文档工具，自动生成可交互的 API 文档
  const config = new DocumentBuilder()
    .setTitle('任务管理 API')
    .setDescription('NestJS CRUD 示例项目 - 面向前端开发者')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // 启动 HTTP 服务器监听 3000 端口
  await app.listen(3000);
  console.log('服务已启动：http://localhost:3000');
  console.log('Swagger 文档：http://localhost:3000/api-docs');
}

// 启动应用
bootstrap();
