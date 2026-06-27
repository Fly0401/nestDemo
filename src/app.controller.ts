/**
 * 根控制器（Root Controller）
 *
 * 类比前端：相当于 Vue Router 的根路由 / React 的 App 组件
 * 处理应用的默认路由（GET /）
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // 不指定前缀，默认路由为 /
export class AppController {
  /**
   * 构造函数注入 Service
   *
   * 类比前端：相当于 Vue 的 inject() / React 的 useContext()
   * NestJS 的 IoC 容器会自动创建 AppService 实例并传入
   * private readonly 是 TypeScript 语法，同时声明私有属性和构造参数
   */
  constructor(private readonly appService: AppService) {}

  /**
   * GET / 路由处理函数
   *
   * @Get() 装饰器将该方法声明为 HTTP GET 请求的处理器
   * 类比前端：相当于 Vue Router 的 { path: '/', component: ... }
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
