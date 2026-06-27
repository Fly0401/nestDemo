/**
 * 端到端测试（E2E Test）
 *
 * 类比前端：相当于 Cypress / Playwright 的端到端测试
 * 与单元测试（unit test）的区别：
 *   - 单元测试：只测单个函数/类，不启动真实服务器
 *   - E2E 测试：启动完整应用，通过真实 HTTP 请求验证功能
 *
 * 运行方式：nest test 或 npm run test:e2e
 */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  /**
   * 每个测试用例执行前：创建并初始化完整的 NestJS 应用
   * 类比前端：相当于 Cypress 中 cy.visit('/') 启动完整应用
   */
  beforeEach(async () => {
    // 导入根模块（包含所有依赖：数据库、控制器、服务等）
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // 创建 NestJS 应用实例并初始化（但不监听真实端口）
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  /**
   * 测试根路由 GET /
   * 类比前端：相当于 cy.get('body').should('contain', 'Hello World!')
   */
  it('/ (GET)', () => {
    // 使用 supertest 发送 HTTP 请求
    // 类比前端：相当于 $fetch('/') 或 axios.get('/')
    return request(app.getHttpServer())
      .get('/')
      .expect(200)           // 期望返回 200 状态码
      .expect('Hello World!'); // 期望响应体为 'Hello World!'
  });

  /**
   * 每个测试用例执行后：关闭应用，释放资源
   * 类比前端：相当于 Cypress 中的 afterEach 清理操作
   */
  afterEach(async () => {
    await app.close();
  });
});
