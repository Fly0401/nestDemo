# NestJS 任务管理 CRUD 项目开发计划

> 目标：面向前端开发者的 NestJS 入门项目，展示后端设计理念与规范

## 技术栈

| 层次 | 技术 |
|------|------|
| 框架 | NestJS (Express 底层) |
| 语言 | TypeScript |
| 数据库 | MySQL 8.x |
| ORM | TypeORM |
| 参数校验 | class-validator + class-transformer |
| API 文档 | Swagger (@nestjs/swagger) |

---

## 项目结构（最终态）

```
nestDemo/
├── src/
│   ├── main.ts                  # 入口，启动 + Swagger 配置
│   ├── app.module.ts            # 根模块，注册 TypeORM 数据库连接
│   ├── tasks/                   # 任务功能模块（核心）
│   │   ├── tasks.module.ts      # 模块声明
│   │   ├── tasks.controller.ts  # 路由层，接收 HTTP 请求
│   │   ├── tasks.service.ts     # 业务逻辑层
│   │   ├── task.entity.ts       # 数据库实体（表结构）
│   │   ├── dto/
│   │   │   ├── create-task.dto.ts   # 新增参数校验
│   │   │   └── update-task.dto.ts   # 更新参数校验
│   │   └── enums/
│   │       └── task-status.enum.ts  # 任务状态枚举
│   └── common/                  # 公共工具
│       └── response.interceptor.ts  # 全局响应格式统一
├── .env                         # 环境变量（数据库配置）
├── package.json
└── tsconfig.json
```

---

## API 接口设计

基础路径：`/tasks`

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /tasks | 新增任务 |
| GET | /tasks | 获取任务列表（支持分页/状态筛选） |
| GET | /tasks/:id | 获取任务详情 |
| PATCH | /tasks/:id/status | 更新任务状态 |
| DELETE | /tasks/:id | 删除任务 |

---

## 任务字段设计

| 字段 | 类型 | 说明 |
|------|------|------|
| id | int (AUTO) | 主键 |
| title | varchar(100) | 任务标题 |
| description | text | 任务描述（可选） |
| status | enum | TODO / IN_PROGRESS / DONE |
| createdAt | datetime | 创建时间（自动） |
| updatedAt | datetime | 更新时间（自动） |

---

## 开发步骤（按序执行）

- [x] **Step 1**：初始化 NestJS 项目（nest new）
- [x] **Step 2**：安装依赖（TypeORM、MySQL、class-validator、Swagger）
- [x] **Step 3**：配置数据库连接（.env + TypeORM）
- [x] **Step 4**：创建 Task 实体（entity）
- [x] **Step 5**：创建 DTO（数据传输对象，参数校验）
- [x] **Step 6**：实现 Service 层（业务逻辑）
- [x] **Step 7**：实现 Controller 层（路由）
- [x] **Step 8**：配置全局响应格式（Interceptor）
- [x] **Step 9**：配置 Swagger 文档
- [x] **Step 10**：验收测试（curl 验证各接口）

---

## 前端开发者重点理解的核心概念

### 1. 模块化（Module）
类比前端的「功能目录」，NestJS 中每个业务用一个 Module 聚合相关代码。

### 2. 控制器（Controller）
类比前端路由 router，负责「接收请求 → 调用 Service → 返回响应」。

### 3. 服务（Service）
纯业务逻辑，不关心 HTTP。类比前端的 `api.ts` 中的业务封装层。

### 4. 实体（Entity）
描述数据库表结构的类，TypeORM 会自动建表。类比前端的 TypeScript interface，但带有数据库映射能力。

### 5. DTO（Data Transfer Object）
请求参数的校验模型，用装饰器声明规则（`@IsString()`、`@IsNotEmpty()`），NestJS 自动校验并返回错误信息。

### 6. 依赖注入（DI）
NestJS 核心机制。Service 通过构造函数注入到 Controller，框架自动实例化管理。类比 React Context 的自动提供。

### 7. 拦截器（Interceptor）
AOP 思想，统一处理响应格式，不需要每个接口手动包装 `{ code, data, message }`。
