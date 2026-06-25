# NestJS 任务管理 CRUD 示例项目

这是一个基于 NestJS、TypeScript、TypeORM 和 MySQL 构建的任务管理后端示例项目。项目围绕「任务 Task」这一核心资源，实现了新增任务、查询任务列表、查询任务详情、更新任务状态和删除任务等基础 CRUD 能力，同时集成了参数校验、Swagger 接口文档、统一响应格式和数据库实体映射。

项目适合作为 NestJS 入门练习、前端开发者理解后端分层设计的示例，也可以作为后续扩展用户系统、权限认证、分页查询、日志记录、异常过滤器等能力的基础工程。

## 项目定位

本项目不是一个复杂业务系统，而是一个结构清晰、职责明确的后端接口样板。它重点展示 NestJS 项目中常见的工程组织方式：

- 使用 `Module` 聚合业务模块。
- 使用 `Controller` 负责 HTTP 路由入口。
- 使用 `Service` 承载业务逻辑。
- 使用 `Entity` 描述数据库表结构。
- 使用 `DTO` 和 `class-validator` 完成请求参数校验。
- 使用 `TypeORM Repository` 操作 MySQL 数据。
- 使用 `Interceptor` 统一接口响应格式。
- 使用 `Swagger` 自动生成接口文档并支持在线调试。

## 核心功能

任务管理模块提供以下能力：

- 创建任务：提交任务标题和可选描述，默认状态为 `TODO`。
- 查询任务列表：支持查询全部任务，也支持通过 `status` 按任务状态筛选。
- 查询任务详情：根据任务 ID 获取单条任务记录。
- 更新任务状态：将任务状态更新为 `TODO`、`IN_PROGRESS` 或 `DONE`。
- 删除任务：根据任务 ID 删除任务记录。
- 参数校验：自动校验标题、状态枚举、路由 ID 等输入。
- 统一响应：普通接口统一返回 `{ code, message, data }` 结构。
- 在线文档：启动后可通过 Swagger 页面查看和测试接口。

## 技术栈

| 分类 | 技术 |
| --- | --- |
| 后端框架 | NestJS |
| 开发语言 | TypeScript |
| HTTP 平台 | Express |
| 数据库 | MySQL |
| ORM | TypeORM |
| 配置管理 | `@nestjs/config` |
| 参数校验 | `class-validator`、`class-transformer` |
| API 文档 | `@nestjs/swagger`、Swagger UI |
| 测试框架 | Jest、Supertest |
| 代码规范 | ESLint、Prettier |

## 项目结构

```text
nestDemo/
├── src/
│   ├── main.ts                         # 应用入口：全局管道、响应拦截器、Swagger、端口监听
│   ├── app.module.ts                   # 根模块：环境配置、数据库连接、业务模块注册
│   ├── app.controller.ts               # Nest CLI 默认控制器
│   ├── app.service.ts                  # Nest CLI 默认服务
│   ├── common/
│   │   └── response.interceptor.ts     # 全局响应格式封装
│   └── tasks/
│       ├── task.entity.ts              # Task 数据库实体
│       ├── tasks.module.ts             # 任务模块
│       ├── tasks.controller.ts         # 任务接口路由
│       ├── tasks.service.ts            # 任务业务逻辑
│       ├── dto/
│       │   ├── create-task.dto.ts      # 创建任务请求参数校验
│       │   └── update-task-status.dto.ts # 更新任务状态请求参数校验
│       └── enums/
│           └── task-status.enum.ts     # 任务状态枚举
├── test/
│   ├── app.e2e-spec.ts                 # e2e 测试示例
│   └── jest-e2e.json                   # e2e 测试配置
├── .env                                # 本地环境变量，主要用于数据库连接
├── package.json                        # 依赖与 npm scripts
├── tsconfig.json                       # TypeScript 配置
├── nest-cli.json                       # Nest CLI 配置
└── README.md                           # 项目说明文档
```

## 架构说明

请求进入应用后，整体链路如下：

```text
HTTP Request
  ↓
ValidationPipe 全局参数校验与类型转换
  ↓
TasksController 路由接收请求
  ↓
TasksService 处理业务逻辑
  ↓
TypeORM Repository 读写 MySQL
  ↓
ResponseInterceptor 统一包装响应
  ↓
HTTP Response
```

这种分层方式让每个文件职责更单一：

- `Controller` 只关心接口路径、请求参数和响应。
- `Service` 只关心业务规则和数据操作。
- `Entity` 只关心数据库字段映射。
- `DTO` 只关心请求入参结构和校验规则。
- `Interceptor` 处理横切逻辑，避免每个接口重复包装响应。

## 数据模型

任务表对应实体为 `Task`，表名为 `tasks`。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | 自增主键 |
| `title` | varchar(100) | 任务标题，必填，最多 100 个字符 |
| `description` | text | 任务描述，可选 |
| `status` | enum | 任务状态，默认 `TODO` |
| `createdAt` | datetime | 创建时间，由 TypeORM 自动维护 |
| `updatedAt` | datetime | 更新时间，由 TypeORM 自动维护 |

任务状态枚举：

```ts
export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
```

## 环境准备

请先确保本机已安装：

- Node.js
- npm
- MySQL

安装项目依赖：

```bash
npm install
```

创建 MySQL 数据库：

```sql
CREATE DATABASE nest_tasks DEFAULT CHARACTER SET utf8mb4;
```

检查 `.env` 中的数据库连接配置，确保和本机 MySQL 一致：

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=nest_tasks
```

项目当前在开发环境中开启了 TypeORM 的 `synchronize: true`，启动服务后会根据 `Task` 实体自动同步表结构。生产环境中应关闭该配置，并改用数据库迁移管理表结构变更。

## 启动项目

开发模式启动：

```bash
npm run start:dev
```

普通启动：

```bash
npm run start
```

构建生产产物：

```bash
npm run build
```

运行构建后的项目：

```bash
npm run start:prod
```

服务默认监听：

- API 地址：`http://localhost:3000`
- Swagger 文档：`http://localhost:3000/api-docs`
- 任务接口根路径：`http://localhost:3000/tasks`

## 接口说明

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| `POST` | `/tasks` | 创建任务 |
| `GET` | `/tasks` | 查询任务列表 |
| `GET` | `/tasks?status=TODO` | 按状态筛选任务列表 |
| `GET` | `/tasks/:id` | 查询任务详情 |
| `PATCH` | `/tasks/:id/status` | 更新任务状态 |
| `DELETE` | `/tasks/:id` | 删除任务 |

### 创建任务

请求：

```http
POST /tasks
Content-Type: application/json
```

```json
{
  "title": "完成需求评审",
  "description": "与产品经理确认任务范围和接口字段"
}
```

成功响应示例：

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": 1,
    "title": "完成需求评审",
    "description": "与产品经理确认任务范围和接口字段",
    "status": "TODO",
    "createdAt": "2026-06-25T10:00:00.000Z",
    "updatedAt": "2026-06-25T10:00:00.000Z"
  }
}
```

### 查询任务列表

请求：

```http
GET /tasks
```

按状态筛选：

```http
GET /tasks?status=IN_PROGRESS
```

### 查询任务详情

请求：

```http
GET /tasks/1
```

如果任务不存在，服务层会抛出 `NotFoundException`，NestJS 会返回 404 状态码。

### 更新任务状态

请求：

```http
PATCH /tasks/1/status
Content-Type: application/json
```

```json
{
  "status": "DONE"
}
```

`status` 只能是以下三个值之一：

- `TODO`
- `IN_PROGRESS`
- `DONE`

### 删除任务

请求：

```http
DELETE /tasks/1
```

删除成功后返回 HTTP `204 No Content`。

## 响应格式

项目通过全局响应拦截器将普通接口结果包装为统一格式：

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

说明：

- `code`：业务状态码，当前成功固定为 `0`。
- `message`：响应消息，当前成功固定为 `success`。
- `data`：接口返回的数据。

需要注意的是，异常响应和 `204 No Content` 这类无响应体接口不会表现为普通成功响应结构。

## 参数校验

项目在 `main.ts` 中启用了全局 `ValidationPipe`：

```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
);
```

它带来两个效果：

- `whitelist: true`：请求体中未在 DTO 声明的字段会被自动过滤。
- `transform: true`：路由参数等输入会尽可能转换为目标类型，例如将 `id` 从字符串转换为数字。

创建任务时：

- `title` 必须是字符串。
- `title` 不能为空。
- `title` 最多 100 个字符。
- `description` 是可选字符串。

更新状态时：

- `status` 必须是 `TODO`、`IN_PROGRESS`、`DONE` 之一。

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm run start` | 启动应用 |
| `npm run start:dev` | 以 watch 模式启动开发服务 |
| `npm run start:debug` | 以调试模式启动 |
| `npm run build` | 编译项目到 `dist` 目录 |
| `npm run start:prod` | 运行编译后的产物 |
| `npm run lint` | 执行 ESLint 并自动修复 |
| `npm run format` | 使用 Prettier 格式化代码 |
| `npm run test` | 运行单元测试 |
| `npm run test:e2e` | 运行 e2e 测试 |
| `npm run test:cov` | 生成测试覆盖率报告 |

## 后续可扩展方向

这个项目可以继续扩展为更完整的后端练习工程：

- 增加分页、排序和关键词搜索。
- 增加用户注册、登录和 JWT 鉴权。
- 增加任务负责人、截止时间、优先级等字段。
- 增加统一异常过滤器，规范错误响应格式。
- 增加日志中间件或请求追踪 ID。
- 使用 TypeORM Migration 替代开发环境自动同步表结构。
- 增加更多单元测试和 e2e 测试覆盖核心接口。

## 学习重点

通过这个项目可以重点理解：

- NestJS 如何组织模块、控制器和服务。
- DTO 如何同时服务于参数校验和 Swagger 文档。
- TypeORM Entity 如何映射数据库表。
- Repository 模式如何简化数据库读写。
- 全局管道、拦截器如何承载通用逻辑。
- Swagger 如何降低前后端接口联调成本。
