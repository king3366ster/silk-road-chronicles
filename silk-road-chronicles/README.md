# 西域群英传 - Silk Road Chronicles v2.0

> 以西域三十六国为背景的策略战棋角色扮演游戏  
> 参考三国群英传设计模式，从小人物逐步崛起，统一西域诸国

---

## 📋 目录

- [游戏简介](#游戏简介)
- [技术架构](#技术架构)
- [环境要求](#环境要求)
- [快速开始](#快速开始)
- [开发模式](#开发模式)
- [编译部署](#编译部署)
- [项目结构](#项目结构)
- [操作说明](#操作说明)
- [游戏系统](#游戏系统)
- [常见问题](#常见问题)

---

## 🎮 游戏简介

**西域群英传** 是一款以中国古代西域三十六国为历史背景的单机策略战棋游戏。玩家扮演一个出身卑微的小人物，通过政治、商业、军事三条路线，逐步崛起并最终统一西域三十六国。

### 核心特色

| 特色 | 说明 |
|------|------|
| 🏜️ **36个西域国家** | 每个国家有独特文化、技能、特产、地形 |
| 👥 **1000+ 角色** | 超过1000个角色，其中2/3以上为女性角色 |
| ♀️ **全女性国家** | 阿玛宗女战士部落（善战）、西梁女国（善外交） |
| ⚔️ **策略战棋** | 回合制战棋战斗，支持移动、攻击、技能释放 |
| 🏘️ **部落建设** | 农田、市场、兵营、生态管理 |
| 💰 **商贸系统** | 丝绸之路贸易，资源买卖，商路开通 |
| 🤝 **外交系统** | 结盟、赠礼、联姻、外交谈判 |
| 💕 **角色互动** | 交谈、赠礼、歌舞、求婚等深度互动 |
| 📜 **丰富剧情** | 7章主线 + 大量支线任务 |

---

## 💻 技术架构

```
技术栈：
├── 前端框架：原生 JavaScript (ES6+)
├── 图形渲染：HTML5 Canvas 2D
├── 构建工具：Vite 5.x
├── 包管理器：npm
├── 无第三方游戏引擎依赖
└── 纯前端单机运行，无需后端服务器
```

---

## 🔧 环境要求

| 工具 | 最低版本 | 推荐版本 | 安装方式 |
|------|---------|---------|---------|
| **Node.js** | v16.0+ | v18.0+ | [nodejs.org](https://nodejs.org/) |
| **npm** | v7.0+ | v9.0+ | 随 Node.js 安装 |
| **浏览器** | Chrome 90+ / Edge 90+ / Firefox 90+ | 最新版 | - |
| **Git** | v2.0+ | 最新版 | [git-scm.com](https://git-scm.com/) |

### 验证环境

```bash
# 检查 Node.js 版本
node --version

# 检查 npm 版本
npm --version

# 检查 Git 版本
git --version
```

---

## 🚀 快速开始

### 1. 获取项目代码

```bash
# 如果项目已在本地，直接进入目录
cd silk-road-chronicles

# 如果是从 Git 仓库克隆
git clone <repository-url>
cd silk-road-chronicles
```

### 2. 安装依赖

```bash
npm install
```

> 首次安装会下载 Vite 及相关开发依赖，约需 10-30 秒。

### 3. 启动开发服务器

```bash
npx vite
```

启动后，浏览器会自动打开 `http://localhost:5173/`（如端口被占用会自动递增）。

### 4. 开始游戏

1. 等待加载画面完成（生成1000+角色需要几秒）
2. 在主菜单点击 **"开始新游戏"**
3. 选择你的起始绿洲
4. 开始你的西域传奇！

---

## 🔨 开发模式

### 启动开发服务器（热更新）

```bash
# 方式一：使用 vite 直接启动
npx vite

# 方式二：使用 npm script（如果配置了）
npm run dev

# 指定端口
npx vite --port 8080

# 局域网访问（手机/其他设备测试）
npx vite --host
```

开发模式下，修改任何源文件后浏览器会自动热更新。

### 开发调试

- 按 **F12** 打开浏览器开发者工具
- **Console** 面板查看日志输出
- **Sources** 面板设置断点调试
- **Network** 面板检查资源加载

---

## 📦 编译部署

### 方式一：Vite 生产构建（推荐）

#### 步骤 1：构建生产版本

```bash
cd silk-road-chronicles

# 执行构建
npx vite build
```

构建完成后，会在项目根目录生成 `dist/` 文件夹，包含所有优化后的静态文件。

#### 步骤 2：本地预览构建结果

```bash
# 启动预览服务器
npx vite preview
```

访问 `http://localhost:4173/` 预览生产版本。

#### 步骤 3：部署到静态服务器

将 `dist/` 文件夹中的所有文件上传到任何静态文件服务器即可：

```bash
# 示例：使用 Python 简易服务器
cd dist
python -m http.server 8080

# 示例：使用 Node.js serve 工具
npx serve dist -p 8080

# 示例：使用 Nginx
# 将 dist/ 内容复制到 nginx 的 html/ 目录
cp -r dist/* /usr/share/nginx/html/
```

### 方式二：直接打开（无需服务器）

由于项目使用 ES6 模块（`import/export`），直接用 `file://` 协议打开 `index.html` 可能会遇到跨域问题。推荐以下方式：

#### 使用简易本地服务器

```bash
# 方式 A：Python（大多数系统自带）
cd silk-road-chronicles
python -m http.server 8080
# 然后访问 http://localhost:8080

# 方式 B：Node.js npx serve
npx serve silk-road-chronicles -p 8080
# 然后访问 http://localhost:8080

# 方式 C：VS Code Live Server 插件
# 安装 Live Server 扩展，右键 index.html -> Open with Live Server
```

### 方式三：打包为桌面应用（Electron）

如需打包为独立的 `.exe` 桌面应用：

```bash
# 1. 安装 Electron
npm install --save-dev electron electron-builder

# 2. 创建 electron 主进程文件
# 参考下方 electron-main.js 配置

# 3. 在 package.json 中添加脚本
# "scripts": { "electron": "electron .", "build:electron": "electron-builder" }

# 4. 运行桌面版
npm run electron

# 5. 打包为 exe
npm run build:electron
```

#### electron-main.js 示例

```javascript
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    title: '西域群英传 - Silk Road Chronicles',
    webPreferences: { nodeIntegration: false }
  });
  win.loadFile('index.html');
  win.setMenu(null);
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
```

### 方式四：Docker 部署

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx vite build
EXPOSE 8080
CMD ["npx", "serve", "dist", "-p", "8080"]
```

```bash
# 构建并运行
docker build -t silk-road-chronicles .
docker run -p 8080:8080 silk-road-chronicles
```

---

## 📁 项目结构

```
silk-road-chronicles/
├── index.html                  # 入口 HTML 文件
├── package.json                # 项目配置 & 依赖
├── vite.config.js              # Vite 构建配置
├── README.md                   # 本文档
├── STORY.md                    # 剧情文档
│
├── src/                        # 源代码目录
│   ├── main.js                 # 主游戏逻辑（渲染、交互、场景管理）
│   │
│   ├── data/                   # 数据层
│   │   ├── characters.js       # 1000+ 角色数据生成
│   │   ├── nations.js          # 36国数据 + 四大帝国 + 绿洲
│   │   └── quests.js           # 任务/剧情数据 + CG数据
│   │
│   └── engine/                 # 引擎层
│       ├── GameState.js        # 游戏状态管理（存档、资源、外交等）
│       └── CombatSystem.js     # 战斗系统（回合制战棋）
│
└── dist/                       # 构建输出（构建后生成）
    ├── index.html
    └── assets/
```

### 核心文件说明

| 文件 | 行数 | 职责 |
|------|------|------|
| `src/main.js` | ~800 | 游戏主循环、所有场景渲染、用户交互 |
| `src/data/characters.js` | ~600 | 1000+角色模板生成、名字库、称号库 |
| `src/data/nations.js` | ~500 | 36国定义、领土、技能、四大帝国、绿洲 |
| `src/data/quests.js` | ~280 | 主线10章、支线10个、CG场景20个 |
| `src/engine/GameState.js` | ~500 | 游戏状态、存档/读档、资源管理、外交 |
| `src/engine/CombatSystem.js` | ~300 | 战棋战斗引擎、AI、伤害计算 |

---

## 🎯 操作说明

### 基本操作

| 操作 | 按键/方式 | 说明 |
|------|----------|------|
| 移动地图 | `W/A/S/D` 或 `方向键` | 上下左右滚动地图 |
| 快速移动 | `鼠标滚轮` | 滚动地图 |
| 选择/确认 | `鼠标左键` | 点击按钮、选择目标 |
| 返回/取消 | `ESC` 或 `右键` | 关闭面板、返回上一级 |
| 菜单选择 | `↑↓` + `Enter` | 主菜单键盘操作 |

### 地图界面

底部操作栏包含以下功能按钮：

| 按钮 | 功能 | 说明 |
|------|------|------|
| 🏘️ 部落 | 部落管理 | 建设农田、市场、兵营，管理生态 |
| ⚔️ 军事 | 军事管理 | 征兵、训练、进攻敌国 |
| 💰 商贸 | 商业贸易 | 开通商路、资源交易 |
| 🤝 外交 | 外交关系 | 查看36国关系、结盟、赠礼 |
| 📜 任务 | 任务列表 | 查看主线和支线任务进度 |
| 👥 角色 | 角色图鉴 | 查看当前地区的角色信息 |
| 💬 互动 | 角色互动 | 与角色交谈、赠礼、歌舞、求婚 |
| 🎭 礼仪 | 礼仪殿 | 举办宴会、联姻、祭祀、赛马 |
| ⏭️ 回合 | 推进回合 | 进入下一回合，结算资源 |
| 💾 存档 | 保存进度 | 保存当前游戏状态 |

### 战斗操作

| 操作 | 方式 | 说明 |
|------|------|------|
| 选择单位 | 点击蓝色单位 | 选中我方未行动单位 |
| 移动 | 点击蓝色高亮格 | 移动到目标位置 |
| 攻击 | 点击红色高亮格/敌方单位 | 对敌方造成伤害 |
| 结束回合 | 自动 | 所有单位行动完毕后自动切换 |

---

## 🎲 游戏系统

### 1. 绿洲选择（开局）

游戏开始时选择一个绿洲作为起始地点，不同绿洲有不同的难度和资源：

| 绿洲 | 地形 | 难度 | 特色 |
|------|------|------|------|
| 月牙泉 | 绿洲 | 简单 | 水源充足，靠近楼兰 |
| 火焰谷 | 山地 | 困难 | 矿产丰富，强敌环伺 |
| 天山牧场 | 草原 | 普通 | 适合畜牧，靠近乌孙 |
| 大漠绿洲 | 沙漠 | 普通 | 商路要道，贸易便利 |
| 昆仑谷 | 山谷 | 困难 | 玉石产地，靠近于阗 |
| 罗布泊 | 湖泊 | 普通 | 渔业资源，战略要地 |

### 2. 部落建设

- **农田**：消耗木材建造，每回合产出粮食
- **市场**：消耗金币建造，每回合产出金币
- **兵营**：消耗石料建造，允许征兵
- **生态管理**：种树恢复生态，管理水资源

### 3. 资源系统

| 资源 | 用途 | 获取方式 |
|------|------|---------|
| 🌾 食物 | 养活人口、征兵 | 农田产出、交易 |
| 🪵 木材 | 建造农田 | 生态采伐、交易 |
| 🪨 石料 | 建造兵营 | 采矿、交易 |
| 💰 金币 | 通用货币 | 市场、贸易、任务 |
| 💎 玉石 | 高级贸易 | 于阗特产、探索 |
| 🧵 丝绸 | 高级贸易 | 东方进口、任务 |
| ✨ 香料 | 高级贸易 | 西方进口、任务 |
| 🐎 马匹 | 骑兵招募 | 大宛进口、牧场 |
| ⚒️ 铁矿 | 武器锻造 | 采矿、交易 |

### 4. 外交系统

- **赠礼**：消耗资源提升关系值
- **结盟**：关系值达到60+可提议结盟
- **联姻**：女性角色好感70+可求婚
- **贸易**：结盟后可开通贸易路线

### 5. 角色互动

- **交谈**：小幅提升好感度（+5）
- **赠礼**：消耗资源，中幅提升好感（+15）
- **歌舞**：需要魅力属性，中幅提升好感（+10）
- **求婚**：好感70+，成功后获得盟友和特殊加成

### 6. 战斗系统

- 回合制策略战棋
- 8x6 网格战场
- 单位类型：指挥官、步兵、骑兵、弓兵
- 移动范围 + 攻击范围计算
- HP/MP 属性系统
- 地形效果

---

## ❓ 常见问题

### Q: 页面空白/无法加载？
**A:** 确保通过 HTTP 服务器访问（不是直接打开 HTML 文件）。使用 `npx vite` 或 `python -m http.server` 启动本地服务器。

### Q: 构建失败 "Could not resolve entry module"？
**A:** 确保在项目根目录（包含 `index.html` 的目录）执行构建命令：
```bash
cd d:\Models\games\silk-road-chronicles
npx vite build
```

### Q: 如何修改游戏数据？
**A:** 编辑 `src/data/` 目录下的文件：
- `characters.js` - 角色数据
- `nations.js` - 国家数据
- `quests.js` - 任务/剧情数据

### Q: 如何调整窗口大小？
**A:** 游戏自动适配浏览器窗口大小，调整浏览器窗口即可。推荐分辨率 1280x800 以上。

### Q: 存档保存在哪里？
**A:** 存档保存在浏览器的 `localStorage` 中。清除浏览器数据会丢失存档。

### Q: 如何重置游戏？
**A:** 在主菜单选择"开始新游戏"即可重置。或在浏览器控制台执行：
```javascript
localStorage.clear();
location.reload();
```

---

## 📄 许可证

本项目仅供学习和娱乐使用。

---

**🏜️ 愿丝路平安，传奇永存！**