# TechBlog - 技术博客网站

> 一个基于 Vue 3、Vite 构建的技术博客系统，支持文章展示、图集浏览、后台管理等功能。

## 📌 项目简介

TechBlog 是一个个人技术博客平台，使用现代前端框架 Vue 3 和 Vite 构建。它包含了主页、关于我、文章详情、论文展示、后台管理等多个页面，并集成了一些常用的 UI 库和动画库来提升用户体验。

## 🛠 技术栈

- **Vue** `^3.2.0`
- **Vite** `^6.0.0`
- **Vue Router** `^4.0.0`
- **Element Plus** `^2.0.0`
- **Swiper** `^11.0.0`
- **Vue-Awesome-Swiper** `^5.0.0`
- **TSParticles** `^3.0.0`
- **Sass (Embedded)** `^1.0.0`

## 🗂️ 项目结构概览

```
techblog/
├── src/                  # 源码目录
│   ├── assets/             # 静态资源（CSS、图片等）
│   ├── components/         # Vue 组件
│   ├── router/             # 路由配置
│   ├── views/              # 页面视图
│   ├── App.vue             # 根组件
│   └── main.js             # 入口文件
├── public/                 # 静态资源（无需构建处理）
├── README.md               # 项目说明文档
├── package.json            # 项目依赖与脚本
└── vite.config.js          # Vite 配置文件
```

## 📦 安装依赖

确保你已安装 [Node.js](https://nodejs.org/) 和 [pnpm](https://pnpm.io/zh/)，然后运行以下命令安装依赖：

```bash
pnpm install
```

## 🚀 运行项目

```bash
pnpm run dev
```

这将启动本地开发服务器，默认访问地址：[http://localhost:3000](http://localhost:3000)

## 🧪 构建生产环境包

```bash
pnpm run build
```

构建后的静态文件会输出在 `dist/` 目录下，可部署至任意静态服务器。

## 📡 可用脚本

| 命令           | 说明                         |
|----------------|------------------------------|
| `pnpm run dev` | 启动开发服务器                |
| `pnpm run build` | 构建生产环境包               |
| `pnpm run preview` | 预览构建后的 dist 内容      |

## 📝 功能模块介绍

- **首页 (`index.vue`)**  
  展示轮播图、文章列表、图集展示等内容。
  
- **关于我 (`about.vue`)**  
  包含作者简介、技能标签、联系方式等信息。

- **文章详情 (`article.vue`)**  
  展示单篇技术文章内容。

- **图集 (`gallery.vue`)**  
  使用 Swiper 实现的图集展示功能。

- **论文 (`paper.vue`)**  
  展示学术论文或项目成果。

- **后台管理 (`admin.vue`)**  
  提供文章管理、留言墙、图集管理等功能。

## 💅 样式与主题

- 使用 `Sass (Embedded)` 编写样式，支持变量控制和模块化。
- 所有通用 CSS 存放在 [src/assets/main.css](file:///Users/a1-6/Downloads/techblog/src/assets/main.css)。
- 主题颜色和动画效果通过 SCSS 变量统一管理。

## 🎨 第三方库

- **Element Plus**：UI 组件库，提供按钮、表单、对话框等常用组件。
- **Swiper & vue-awesome-swiper**：实现轮播图和图集滑动效果。
- **TSParticles**：背景粒子动画效果。
- **ParticlesJS**：可选的轻量级粒子特效。

## 📜 开源协议

本项目采用 MIT 协议，详见 [LICENSE](LICENSE) 文件。

## 👥 贡献指南

欢迎提交 PR 或 Issue！请遵循代码风格规范并保持良好的 commit message。

---

如需添加更多细节，比如部署流程、CI/CD、SEO 设置等，也可以继续扩展此文档。