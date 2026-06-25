# MySQL 下载、连接、建表和数据操作学习说明

这份文档面向 MySQL 初学者，目标是帮助你完成从安装 MySQL、连接数据库、创建数据库和数据表，到执行基础数据操作的完整学习流程。

本文会同时结合当前 NestJS 项目的数据库配置进行说明。本项目默认使用的数据库名是 `nest_tasks`，核心业务表是任务表 `tasks`。

## 1. MySQL 是什么

MySQL 是一种关系型数据库管理系统。它使用 SQL 语言来创建数据库、创建表、查询数据、插入数据、修改数据和删除数据。

可以简单理解为：

- 数据库：存放一组相关数据的容器，例如 `nest_tasks`。
- 数据表：数据库中的一张表，例如 `tasks`。
- 字段：表中的一列，例如 `id`、`title`、`status`。
- 记录：表中的一行数据，例如一条具体任务。
- SQL：操作数据库的语言，例如 `SELECT`、`INSERT`、`UPDATE`、`DELETE`。

## 2. 如何下载和安装 MySQL

### 2.1 Windows 安装方式

Windows 推荐使用 MySQL 官方安装器。

下载地址：

- MySQL Installer：https://dev.mysql.com/downloads/installer/
- MySQL Community Server：https://dev.mysql.com/downloads/mysql/

推荐步骤：

1. 打开 MySQL Installer 下载页面。
2. 选择 Windows 版本的安装器。
3. 下载 `mysql-installer-community`。
4. 双击安装器开始安装。
5. 安装类型可以选择 `Developer Default` 或 `Server only`。
6. 按照提示安装 MySQL Server。
7. 设置 root 用户密码，请记住这个密码。
8. 保持默认端口 `3306`。
9. 安装完成后，可以同时安装 MySQL Workbench，方便可视化管理数据库。

安装完成后，可以在命令行检查版本：

```bash
mysql --version
```

如果提示找不到 `mysql` 命令，需要把 MySQL 的 `bin` 目录加入系统环境变量 `Path`。常见路径类似：

```text
C:\Program Files\MySQL\MySQL Server 8.0\bin
```

### 2.2 macOS 安装方式

macOS 可以使用官方安装包，也可以使用 Homebrew。

使用 Homebrew 安装：

```bash
brew install mysql
```

启动 MySQL：

```bash
brew services start mysql
```

检查版本：

```bash
mysql --version
```

### 2.3 Linux 安装方式

Ubuntu 或 Debian 可以使用 `apt` 安装：

```bash
sudo apt update
sudo apt install mysql-server
```

启动 MySQL：

```bash
sudo systemctl start mysql
```

设置开机启动：

```bash
sudo systemctl enable mysql
```

检查状态：

```bash
sudo systemctl status mysql
```

CentOS、Rocky Linux 或 AlmaLinux 可以使用 `dnf` 或 `yum` 安装，具体命令会因系统版本不同而不同。

## 3. 如何连接 MySQL

连接 MySQL 常见方式有三种：

- 使用命令行连接。
- 使用图形化工具连接。
- 在项目代码中通过配置文件连接。

### 3.1 使用命令行连接

最常见的连接方式：

```bash
mysql -u root -p
```

含义：

- `mysql`：启动 MySQL 客户端。
- `-u root`：使用 root 用户登录。
- `-p`：提示输入密码。

回车后输入安装时设置的 root 密码。如果登录成功，会看到类似：

```text
mysql>
```

这表示已经进入 MySQL 命令行，可以开始执行 SQL。

如果数据库不在本机，可以指定主机和端口：

```bash
mysql -h 127.0.0.1 -P 3306 -u root -p
```

参数含义：

- `-h`：数据库主机地址。
- `-P`：数据库端口，MySQL 默认是 `3306`。
- `-u`：用户名。
- `-p`：密码输入提示。

### 3.2 使用图形化工具连接

常见图形化工具：

- MySQL Workbench
- DBeaver
- Navicat
- DataGrip

连接时通常需要填写：

| 配置项 | 示例 |
| --- | --- |
| Host | `localhost` 或 `127.0.0.1` |
| Port | `3306` |
| User | `root` |
| Password | 安装 MySQL 时设置的密码 |
| Database | 可以先不填，连接后再选择 |

本地连接示例：

```text
Host: 127.0.0.1
Port: 3306
User: root
Password: 你的 MySQL 密码
```

### 3.3 在当前 NestJS 项目中连接数据库

当前项目通过 `.env` 文件配置数据库连接。

示例：

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=123456
DB_DATABASE=nest_tasks
```

字段含义：

| 配置项 | 说明 |
| --- | --- |
| `DB_HOST` | MySQL 主机地址，本机一般是 `localhost` |
| `DB_PORT` | MySQL 端口，默认是 `3306` |
| `DB_USERNAME` | 数据库用户名 |
| `DB_PASSWORD` | 数据库密码 |
| `DB_DATABASE` | 项目要连接的数据库名 |

项目中的 `src/app.module.ts` 会读取这些配置，并通过 TypeORM 建立连接。

启动项目前，请确认：

1. MySQL 服务已经启动。
2. `.env` 中的用户名和密码正确。
3. `nest_tasks` 数据库已经创建。
4. 项目依赖已经安装。

启动项目：

```bash
npm run start:dev
```

## 4. 数据库基础命令

登录 MySQL 后，可以执行下面这些基础命令。

查看所有数据库：

```sql
SHOW DATABASES;
```

创建数据库：

```sql
CREATE DATABASE nest_tasks DEFAULT CHARACTER SET utf8mb4;
```

选择数据库：

```sql
USE nest_tasks;
```

查看当前正在使用的数据库：

```sql
SELECT DATABASE();
```

删除数据库：

```sql
DROP DATABASE nest_tasks;
```

注意：`DROP DATABASE` 会删除整个数据库和里面的所有表，学习时要谨慎执行。

## 5. 如何创建数据库

以当前项目为例，推荐创建名为 `nest_tasks` 的数据库：

```sql
CREATE DATABASE nest_tasks DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

解释：

- `CREATE DATABASE`：创建数据库。
- `nest_tasks`：数据库名称。
- `DEFAULT CHARACTER SET utf8mb4`：使用 `utf8mb4` 字符集，支持中文和更多 Unicode 字符。
- `COLLATE utf8mb4_unicode_ci`：设置排序和比较规则。

创建后选择这个数据库：

```sql
USE nest_tasks;
```

## 6. 如何创建数据表

当前项目使用 TypeORM，并且在开发环境中开启了 `synchronize: true`。这意味着启动项目后，TypeORM 会根据 `Task` 实体自动创建或同步 `tasks` 表。

如果你想手动学习建表，可以使用下面的 SQL：

```sql
CREATE TABLE tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  description TEXT NULL,
  status ENUM('TODO', 'IN_PROGRESS', 'DONE') NOT NULL DEFAULT 'TODO',
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

字段说明：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | `INT` | 任务 ID |
| `PRIMARY KEY` | 约束 | 设置主键 |
| `AUTO_INCREMENT` | 约束 | 自动递增 |
| `title` | `VARCHAR(100)` | 任务标题，最多 100 个字符 |
| `description` | `TEXT` | 任务描述，可以为空 |
| `status` | `ENUM` | 任务状态，只允许指定枚举值 |
| `createdAt` | `DATETIME` | 创建时间 |
| `updatedAt` | `DATETIME` | 更新时间 |

查看当前数据库中的表：

```sql
SHOW TABLES;
```

查看表结构：

```sql
DESC tasks;
```

或者：

```sql
SHOW CREATE TABLE tasks;
```

## 7. 如何操作数据

SQL 中最常见的数据操作可以概括为 CRUD：

- `CREATE`：新增数据，对应 `INSERT`。
- `READ`：读取数据，对应 `SELECT`。
- `UPDATE`：更新数据，对应 `UPDATE`。
- `DELETE`：删除数据，对应 `DELETE`。

### 7.1 新增数据

新增一条任务：

```sql
INSERT INTO tasks (title, description, status)
VALUES ('学习 MySQL', '完成数据库安装、连接和基础 SQL 练习', 'TODO');
```

新增多条任务：

```sql
INSERT INTO tasks (title, description, status)
VALUES
  ('学习 NestJS', '理解 Controller、Service、Module', 'IN_PROGRESS'),
  ('完成接口测试', '使用 Swagger 测试任务 CRUD 接口', 'TODO'),
  ('整理学习笔记', '把数据库和接口学习内容记录下来', 'DONE');
```

如果不填写 `status`，会使用默认值 `TODO`：

```sql
INSERT INTO tasks (title, description)
VALUES ('默认状态任务', '这条任务会自动使用 TODO 状态');
```

### 7.2 查询数据

查询所有任务：

```sql
SELECT * FROM tasks;
```

只查询部分字段：

```sql
SELECT id, title, status FROM tasks;
```

根据 ID 查询：

```sql
SELECT * FROM tasks WHERE id = 1;
```

根据状态查询：

```sql
SELECT * FROM tasks WHERE status = 'TODO';
```

按创建时间倒序：

```sql
SELECT * FROM tasks ORDER BY createdAt DESC;
```

限制返回数量：

```sql
SELECT * FROM tasks ORDER BY createdAt DESC LIMIT 10;
```

模糊搜索标题：

```sql
SELECT * FROM tasks WHERE title LIKE '%MySQL%';
```

统计任务数量：

```sql
SELECT COUNT(*) AS total FROM tasks;
```

按状态分组统计：

```sql
SELECT status, COUNT(*) AS total
FROM tasks
GROUP BY status;
```

### 7.3 更新数据

根据 ID 修改任务状态：

```sql
UPDATE tasks
SET status = 'IN_PROGRESS'
WHERE id = 1;
```

同时修改标题和描述：

```sql
UPDATE tasks
SET
  title = '深入学习 MySQL',
  description = '练习建表、查询、更新和删除'
WHERE id = 1;
```

注意：执行 `UPDATE` 时一定要写 `WHERE` 条件。否则会更新整张表的数据。

错误示例：

```sql
UPDATE tasks SET status = 'DONE';
```

上面的 SQL 会把所有任务都改成 `DONE`。

### 7.4 删除数据

根据 ID 删除一条任务：

```sql
DELETE FROM tasks WHERE id = 1;
```

删除所有已完成任务：

```sql
DELETE FROM tasks WHERE status = 'DONE';
```

注意：执行 `DELETE` 时也要写好 `WHERE` 条件。否则会删除整张表的数据。

错误示例：

```sql
DELETE FROM tasks;
```

上面的 SQL 会删除 `tasks` 表中的所有数据。

### 7.5 清空表数据

清空整张表，并重置自增 ID：

```sql
TRUNCATE TABLE tasks;
```

`TRUNCATE` 比 `DELETE FROM tasks` 更彻底，通常用于清空测试数据。学习时请谨慎使用。

## 8. 常见字段类型

| 类型 | 说明 | 示例 |
| --- | --- | --- |
| `INT` | 整数 | `id INT` |
| `VARCHAR(n)` | 可变长度字符串 | `title VARCHAR(100)` |
| `TEXT` | 长文本 | `description TEXT` |
| `DATETIME` | 日期时间 | `createdAt DATETIME` |
| `DATE` | 日期 | `birthday DATE` |
| `DECIMAL(m,n)` | 精确小数 | `price DECIMAL(10,2)` |
| `BOOLEAN` | 布尔值 | `isDeleted BOOLEAN` |
| `ENUM` | 枚举值 | `status ENUM('TODO', 'DONE')` |

## 9. 常见约束

| 约束 | 说明 |
| --- | --- |
| `PRIMARY KEY` | 主键，唯一标识一行数据 |
| `AUTO_INCREMENT` | 自增，常用于 ID |
| `NOT NULL` | 不允许为空 |
| `NULL` | 允许为空 |
| `DEFAULT` | 默认值 |
| `UNIQUE` | 唯一约束 |
| `FOREIGN KEY` | 外键，用于关联另一张表 |

示例：

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## 10. 使用事务保证数据一致性

事务可以保证一组 SQL 要么全部成功，要么全部失败。适合处理转账、订单、库存扣减等场景。

事务示例：

```sql
START TRANSACTION;

UPDATE tasks SET status = 'IN_PROGRESS' WHERE id = 1;
UPDATE tasks SET status = 'DONE' WHERE id = 2;

COMMIT;
```

如果执行过程中发现问题，可以回滚：

```sql
ROLLBACK;
```

常见事务命令：

| 命令 | 说明 |
| --- | --- |
| `START TRANSACTION` | 开始事务 |
| `COMMIT` | 提交事务 |
| `ROLLBACK` | 回滚事务 |

## 11. 当前项目中的数据库表和接口关系

当前 NestJS 项目的任务接口会操作 MySQL 中的 `tasks` 表。

对应关系：

| HTTP 接口 | SQL 操作 | 说明 |
| --- | --- | --- |
| `POST /tasks` | `INSERT` | 新增任务 |
| `GET /tasks` | `SELECT` | 查询任务列表 |
| `GET /tasks/:id` | `SELECT ... WHERE id = ?` | 查询任务详情 |
| `PATCH /tasks/:id/status` | `UPDATE ... WHERE id = ?` | 更新任务状态 |
| `DELETE /tasks/:id` | `DELETE ... WHERE id = ?` | 删除任务 |

在代码中，Controller 不会直接写 SQL，而是调用 Service。Service 再通过 TypeORM Repository 操作数据库。

简化理解：

```text
前端请求
  ↓
NestJS Controller
  ↓
NestJS Service
  ↓
TypeORM Repository
  ↓
MySQL tasks 表
```

## 12. 推荐练习顺序

建议按照下面顺序练习：

1. 安装并启动 MySQL。
2. 使用命令行或图形化工具连接 MySQL。
3. 执行 `SHOW DATABASES;` 查看数据库列表。
4. 创建 `nest_tasks` 数据库。
5. 执行 `USE nest_tasks;` 选择数据库。
6. 手动创建 `tasks` 表。
7. 使用 `INSERT` 新增几条任务。
8. 使用 `SELECT` 查询任务。
9. 使用 `UPDATE` 修改任务状态。
10. 使用 `DELETE` 删除指定任务。
11. 启动当前 NestJS 项目。
12. 打开 Swagger 文档，测试接口是否能正常读写数据库。

## 13. 常见问题

### 13.1 连接时提示 Access denied

常见原因：

- 用户名写错。
- 密码写错。
- 当前用户没有权限。

可以先确认 `.env` 中的 `DB_USERNAME` 和 `DB_PASSWORD` 是否和 MySQL 实际账号一致。

### 13.2 连接时提示 ECONNREFUSED

常见原因：

- MySQL 服务没有启动。
- 端口不是 `3306`。
- `DB_HOST` 配置错误。

可以先检查 MySQL 服务状态，并确认端口配置。

### 13.3 项目启动时报数据库不存在

需要先创建数据库：

```sql
CREATE DATABASE nest_tasks DEFAULT CHARACTER SET utf8mb4;
```

然后重新启动项目：

```bash
npm run start:dev
```

### 13.4 中文乱码

创建数据库时建议使用 `utf8mb4`：

```sql
CREATE DATABASE nest_tasks DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 13.5 表没有自动创建

请检查：

- 项目是否成功连接到 MySQL。
- `.env` 数据库名是否正确。
- `src/app.module.ts` 中是否配置了实体 `Task`。
- TypeORM 是否开启了 `synchronize: true`。

开发环境可以使用 `synchronize: true` 学习和演示。生产环境不建议开启，应使用迁移脚本管理表结构。

## 14. 一份完整练习 SQL

可以把下面 SQL 复制到 MySQL 命令行或图形化工具中分段执行：

```sql
CREATE DATABASE IF NOT EXISTS nest_tasks
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE nest_tasks;

CREATE TABLE IF NOT EXISTS tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  description TEXT NULL,
  status ENUM('TODO', 'IN_PROGRESS', 'DONE') NOT NULL DEFAULT 'TODO',
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, description, status)
VALUES
  ('学习 MySQL 安装', '下载安装 MySQL 并启动服务', 'DONE'),
  ('连接数据库', '使用命令行或 Workbench 连接 MySQL', 'IN_PROGRESS'),
  ('练习 CRUD', '使用 SQL 完成增删改查', 'TODO');

SELECT * FROM tasks;

SELECT * FROM tasks WHERE status = 'TODO';

UPDATE tasks
SET status = 'DONE'
WHERE title = '练习 CRUD';

DELETE FROM tasks
WHERE title = '学习 MySQL 安装';

SELECT status, COUNT(*) AS total
FROM tasks
GROUP BY status;
```

## 15. 学完后你应该掌握什么

完成这份文档中的练习后，你应该能够：

- 知道如何下载并安装 MySQL。
- 知道如何启动 MySQL 服务。
- 知道如何使用命令行或工具连接数据库。
- 知道如何创建数据库和数据表。
- 理解常见字段类型和表约束。
- 能使用 SQL 完成新增、查询、更新和删除。
- 能理解当前 NestJS 项目如何通过 `.env` 和 TypeORM 连接 MySQL。
- 能看懂接口请求和数据库操作之间的关系。
