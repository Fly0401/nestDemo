/**
 * AppController 单元测试
 *
 * 类比前端：相当于 Vue/React 组件的 unit test（如使用 Vue Test Utils / React Testing Library）
 * NestJS 使用 Jest 作为测试框架
 */
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  /**
   * beforeEach：每个测试用例执行前都会运行
   * 类比前端：相当于 Vue Test Utils 中的 beforeEach(() => { mount(Component) })
   */
  beforeEach(async () => {
    // 创建一个测试模块（内存中，不启动真实 HTTP 服务器）
    // 类比前端：创建一个测试用的 Vue 实例
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController], // 注册控制器
      providers: [AppService],      // 注册服务提供者
    }).compile();

    // 从测试模块中获取 AppController 实例
    // 类比前端：wrapper.findComponent(AppController)
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // 调用控制器方法，验证返回值
      // 类比前端：expect(wrapper.text()).toBe('Hello World!')
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
