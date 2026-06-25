import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局校验管道：自动校验 DTO，whitelist 过滤掉未声明的字段
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true, // 自动转换类型（如路由参数 string → number）
    }),
  );

  // 全局响应拦截器：统一包装返回格式 { code, message, data }
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Swagger 文档配置
  const config = new DocumentBuilder()
    .setTitle('任务管理 API')
    .setDescription('NestJS CRUD 示例项目 - 面向前端开发者')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
  console.log('服务已启动：http://localhost:3000');
  console.log('Swagger 文档：http://localhost:3000/api-docs');
}
bootstrap();
