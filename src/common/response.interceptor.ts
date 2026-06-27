/**
 * 统一响应拦截器（Response Interceptor）
 *
 * 类比前端：相当于 Axios 响应拦截器
 * 作用：统一包装所有接口的返回格式，让前端收到一致的响应结构
 *
 * 包装后的格式：
 * {
 *   code: 0,        // 业务状态码，0 表示成功
 *   message: 'success',  // 提示消息
 *   data: { ... }   // 实际业务数据
 * }
 *
 * 为什么要用拦截器？
 *   1. 避免每个 Controller 手动返回统一格式
 *   2. 统一处理错误情况（可以在此捕获异常并包装）
 *   3. 前端只需关注 data 字段，code/message 由拦截器统一处理
 */
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// 统一响应格式：{ code, message, data }
// 所有 Controller 返回值都会被这里包装，无需每个接口手动处理
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  /**
   * 拦截器核心方法
   *
   * @param context 执行上下文，包含请求/响应对象等信息
   * @param next 路由处理器调用链，调用 handle() 执行下一个拦截器/控制器
   * @returns 包装后的 Observable 对象
   *
   * 类比前端：相当于 Axios 的 interceptor.response.use((response) => { ... })
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      // 使用 RxJS 的 map 操作符，对数据流进行转换
      // 类比前端：相当于 .then(data => ({ code: 0, message: 'success', data }))
      map((data) => ({
        code: 0,
        message: 'success',
        data,
      })),
    );
  }
}
