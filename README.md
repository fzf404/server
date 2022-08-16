<!--
 * @Author: fzf404
 * @Date: 2021-11-17 12:43:30
 * @LastEditTime: 2022-01-12 19:48:23
 * @Description: 说明
-->

## 服务

> 为同学们提供一系列好用的工具
>
> 使用 Flask + Vue3 开发
>
> [网站入口](http://server.fzf404.art/#/)

## 说明

- 前端
  ```bash
  web/src
  ├── App.vue
  ├── assets
  │   └── logo.png
  ├── components
  ├── main.js
  ├── pages # 全部页面
  │   ├── 404.vue
  │   ├── auto-report.vue
  │   ├── auto-temp.vue
  │   ├── chat.vue
  │   ├── error.vue
  │   ├── exam-info.vue
  │   ├── feed.vue
  │   ├── index.vue
  │   ├── reward.vue
  │   ├── stop-report.vue
  │   ├── stop-temp.vue
  │   └── success.vue
  ├── router # 路由
  │   └── router.js
  └── utils # 工具
    ├── chat.js
    ├── request.js
    ├── theme.js
    └── warning.js
  ```
- 后端

  ```bash
  end
  ├── data # 数据
  │   ├── auto-report.csv
  │   ├── auto-temp.csv
  │   ├── exam-info.csv
  │   └── stop.csv
  ├── logs # 日志
  │   ├── app.log
  │   ├── auto-report.log
  │   ├── auto-temp.log
  │   └── chat.log
  ├── templates # 邮件模板
  │   ├── report.html
  │   └── temp.html
  ├── app.py # flask 核心
  ├── auto_report.js # 健康填报
  ├── auto_report.py # 健康填报信息处理
  ├── auto_report_test.js # 健康填报测试
  ├── auto_temp.py # 提问填报
  ├── config.py # 配置
  ├── exam_info.py # 考试信息
  ├── utils.py # 工具
  ├── package-lock.json
  └── package.json
  ```

## 部署

- 前端

  ```bash
  cd web
  npm install
  npm run build
  python3 -m http.server 80 -d ./dist
  ```

- 后端

  ```bash
  pip3 install -r requires.txt # py 依赖
  cd end
  npm install # node 依赖
  apt install chromium-browser
  # 运行
  python3 app.py

  # 部署
  apt install
  pm2 --name=server start "gunicorn -k geventwebsocket.gunicorn.workers.GeventWebSocketWorker -w 1 -b 0.0.0.0:8080 app:app"
  # 定时执行
  crontab -e
  0 0 8,13,18 * * cd /opt/server/end && python3 main.py
  0 8 * * * cd /opt/server/end && node auto_report.js
  ```
