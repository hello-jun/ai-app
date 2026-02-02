# AI App 代理指南

本文档为在此 Next.js TypeScript 仓库中工作的 AI 代理提供指南。进行更改时请遵循这些约定。

## 项目概览

- **框架**: Next.js 16.1.6 with App Router
- **UI 库**: React 19.2.3
- **样式**: Tailwind CSS v4
- **包管理器**: pnpm
- **代码质量**: ESLint (Next.js core-web-vitals 配置), TypeScript (严格模式)
- **CSS 处理**: PostCSS with @tailwindcss/postcss 插件

## 构建和开发命令

### 基本命令
```bash
# 安装依赖
pnpm install

# 开发服务器
pnpm dev

# 生产构建
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint

# 类型检查 (建议添加到 package.json)
pnpm typecheck
```

### 推荐附加脚本
将这些添加到 `package.json` 以获得更好的开发体验：

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "lint:fix": "eslint --fix"
  }
}
```

### 运行测试
当前未配置测试框架。如果要添加测试：
- 使用 Vitest 进行单元测试（推荐用于 Next.js）
- 使用 React Testing Library 进行组件测试
- 使用 `pnpm test` 运行测试

## 代码风格指南

### TypeScript 配置
- 启用严格模式 (`strict: true`)
- 使用显式类型，避免 `any`
- 使用 `interface` 定义对象类型，`type` 用于联合类型、元组和复杂类型
- 启用所有严格标志（已由 Next.js 模板设置）

### 导入顺序
1. React/Next.js 导入
2. 第三方库导入
3. 内部模块导入
4. 仅类型导入 (使用 `import type`)
5. CSS/资源导入

示例：
```typescript
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { useState } from "react";
import { someUtility } from "@/lib/utils";
import "./styles.css";
```

### 组件约定
- 使用函数组件并导出为默认导出 (`export default`)
- 适当情况下使用 `Readonly` 修饰 props
- 为公共组件使用显式返回类型
- 内联或单独定义 props 接口

示例：
```typescript
export default function ComponentName({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
```

### 命名约定
- **组件**: PascalCase (例如 `UserProfile`)
- **文件**: 
  - Next.js 特殊文件：小写 (例如 `page.tsx`, `layout.tsx`, `error.tsx`)
  - 常规组件：PascalCase (例如 `Button.tsx`)
  - 工具函数：camelCase (例如 `formatDate.ts`)
- **变量**: camelCase
- **常量**: 环境变量使用 UPPER_SNAKE_CASE，其他使用常规 camelCase
- **类型/接口**: PascalCase，可添加 `T` 前缀或后缀 (例如 `UserProps` 或 `TUser`)

### 错误处理
- 对异步操作使用 try-catch
- 抛出有意义的错误信息
- 对 React 错误使用 Next.js 错误边界

### Tailwind CSS 样式
- 直接在 JSX 中使用 Tailwind 工具类
- 复杂样式可提取到 CSS 模块中
- 遵循响应式设计模式：移动端优先
- 使用暗黑模式变体：`dark:bg-black`
- 逻辑上对类名进行排序（布局、排版、颜色等）

### 文件结构
```
app/
├── layout.tsx          # 根布局
├── page.tsx           # 首页
├── globals.css        # 全局样式
├── components/        # 可复用组件
├── lib/              # 工具函数和助手
├── hooks/            # 自定义 React Hooks
├── types/            # TypeScript 定义
└── [routes]/         # 动态路由
```

### ESLint 规则
- 遵循 Next.js core-web-vitals 配置
- 无未使用变量
- 生产代码中无 console 语句
- 强制执行 React hooks 规则

## 代理工作流程

### 修改前
1. 运行 `pnpm lint` 检查当前代码质量
2. 如果存在 `pnpm typecheck` 脚本则运行类型检查
3. 理解要修改的文件中的现有模式

### 实施期间
1. 遵循文件中的现有代码模式
2. 严格使用 TypeScript (不使用 `any`，使用正确的返回类型)
3. 编写具有有意义名称的自文档化代码
4. 保持函数小而专注

### 修改后
1. 运行 `pnpm lint` 确保没有新的违规
2. 运行类型检查以捕获 TypeScript 错误
3. 尽可能手动测试功能

### Git 实践
- 使用约定风格编写有意义的提交信息
- 保持更改集中和原子化
- 在适用时引用问题/票据
- 永不提交密钥或环境特定配置

## 资源

- [Next.js 文档](https://nextjs.org/docs)
- [React 文档](https://react.dev)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)

---

*最后更新: 2026年2月2日*