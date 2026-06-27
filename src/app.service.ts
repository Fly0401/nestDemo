/**
 * 根服务（Root Service）
 *
 * 类比前端：相当于 Vue 的 composable / React 的自定义 Hook
 * 封装业务逻辑，供 Controller 调用
 * Service 不关心 HTTP，只处理数据和逻辑
 */
import { Injectable } from '@nestjs/common';

@Injectable() // 声明这是一个可被注入的服务，NestJS IoC 容器会管理其生命周期
export class AppService {
  /**
   * 返回简单的问候字符串
   * 类比前端：相当于 composable 中返回的一个简单值
   */
  getHello(): string {
    return 'Hello World!';
  }
}
