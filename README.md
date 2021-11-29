<!--
 * @Author: fzf404
 * @Date: 2021-11-17 12:43:30
 * @LastEditTime: 2021-11-17 13:41:08
 * @Description: 说明
-->

## 部署
```bash
# 后端
cd end
pm2 --name=auto-temp start "gunicorn -k geventwebsocket.gunicorn.workers.GeventWebSocketWorker -w 1 app:app -b 0.0.0.0:8080"

# 定时执行
crontab -e
0 0 8,13,18 * * cd /opt/server/end && python3 main.py

```