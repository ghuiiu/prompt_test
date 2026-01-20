# 📋 Kanban 看板任务管理系统

## 📌 项目简介
这是一个基于全栈技术栈开发的现代化 Kanban 看板任务管理系统，支持任务的拖拽管理、状态流转和主题切换功能。

### ✨ 核心功能
- 🎨 支持明暗主题切换，提供舒适的视觉体验
- 🖱️ 拖拽式任务管理，轻松实现状态流转（TODO → DOING → DONE）
- ➕ 快速添加、编辑和删除任务
- 💾 数据持久化存储，确保任务信息不会丢失
- 🔄 实时数据同步，多设备访问一致

### 🛠️ 技术栈
- **前端**：Vue.js 3 + Vite + Vue Draggable
- **后端**：Spring Boot + Java 17
- **数据库**：PostgreSQL
- **容器化**：Docker + Docker Compose

## 🚀 快速启动

### 环境要求
确保已安装 Docker 和 Docker Compose

### 启动步骤
1. 克隆或下载项目到本地
2. 进入项目根目录
3. 执行以下命令启动所有服务：

```bash
docker compose up --build
```

4. 服务启动成功后，访问以下地址：
   - Kanban 看板：http://localhost:3000
   - 后端 API：http://localhost:8080

### 停止服务
在命令行中按 `Ctrl + C` 即可停止服务，或执行以下命令：

```bash
docker compose down
```

## 📁 项目结构

```text
├── frontend/          # 前端项目代码
│   ├── src/           # 前端源代码
│   ├── Dockerfile     # 前端 Docker 配置
│   └── ...
├── backend/           # 后端项目代码
│   ├── src/           # 后端源代码
│   ├── Dockerfile     # 后端 Docker 配置
│   └── ...
└── docker-compose.yml # Docker Compose 配置文件
```

## 📝 使用说明

1. **添加任务**：在 TODO 列底部的输入框中输入任务标题，点击「Add」按钮
2. **编辑任务**：点击任务卡片可编辑任务内容
3. **删除任务**：点击任务卡片上的「Delete」按钮
4. **切换任务状态**：拖拽任务卡片到目标状态列（TODO/DOING/DONE）
5. **切换主题**：点击页面顶部的「Light Mode/Dark Mode」按钮切换主题

## 🎨 主题切换

系统默认使用暗色主题，可通过页面顶部的切换按钮随时切换到亮色主题，主题设置会自动保存到本地存储中。
