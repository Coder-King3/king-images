# King Images

## 项目介绍

King Images 是一个功能强大的图片上传和管理工具，支持多种图片格式，提供便捷的上传、管理和复制功能。无论是开发者还是内容创作者，都能通过本工具高效地处理和组织图片资源。

## 主要功能

### 图片上传

- **多种上传方式**：支持拖拽上传、点击选择和粘贴上传
- **批量处理**：支持多图片同时上传，并显示实时上传进度
- **格式支持**：兼容JPG、PNG、GIF、WebP等常见图片格式
- **上传进度**：实时显示上传速度、剩余时间和成功/失败状态

### 图片管理

- **图片库**：集中管理所有已上传的图片资源
- **快速复制**：支持Markdown格式和WebP链接一键复制
- **本地存储**：使用IndexedDB在浏览器中存储图片信息，无需服务器

## 安装与使用

### 环境要求

- Node.js 16.0.0 或更高版本
- npm 7.0.0 或更高版本 / pnpm 8.0.0 或更高版本

### 安装步骤

1. 克隆项目到本地

```bash
git clone https://github.com/yourusername/king-images.git
cd king-images
```

2. 安装依赖

```bash
# 使用 npm
npm install

# 或使用 pnpm
pnpm install
```

3. 启动开发服务器

```bash
# 使用 npm
npm run dev

# 或使用 pnpm
pnpm dev
```

4. 构建生产版本

```bash
# 使用 npm
npm run build

# 或使用 pnpm
pnpm build
```

### 使用指南

1. **图片上传**

   - 进入首页，点击"图片上传"标签
   - 将图片拖拽到上传区域，或点击"选择文件"按钮选择图片
   - 也可以直接复制图片并粘贴到页面中
   - 点击"上传全部"按钮开始上传
   - 上传完成后，图片将显示在"最近上传"区域

2. **图片库管理**
   - 点击"图片库"标签查看所有已上传的图片
   - 点击图片可复制对应格式的链接（Markdown或WebP）
   - 可以根据需要删除或管理图片

## 项目结构

```
king-images/
├── src/                    # 源代码
│   ├── api/                # API接口
│   ├── components/         # 组件
│   ├── db/                 # 数据库相关
│   ├── hooks/              # 自定义Hooks
│   ├── pages/              # 页面
│   │   ├── Login/          # 登录页面
│   │   ├── Upload/         # 上传页面
│   │   └── Welcome.tsx     # 欢迎页面
│   ├── types/              # 类型定义
│   └── utils/              # 工具函数
├── public/                 # 静态资源
└── ...                     # 其他配置文件
```

## 技术栈

- **前端框架**：React
- **UI组件**：Shadcn UI
- **状态管理**：React Hooks
- **数据存储**：Dexie.js (IndexedDB)
- **构建工具**：Vite
- **样式方案**：Tailwind CSS

## 贡献指南

欢迎提交问题和贡献代码！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

## 许可证

[MIT](LICENSE)

## 联系方式

如有任何问题或建议，请通过以下方式联系我们：

- 项目仓库：[https://github.com/yourusername/king-images](https://github.com/yourusername/king-images)
- 电子邮件：your.email@example.com

---

[English Documentation](README.md)
