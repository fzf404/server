<!--
 * @Author: fzf404
 * @Date: 2021-11-17 12:43:30
 * @LastEditTime: 2021-11-17 13:06:27
 * @Description: 说明
-->

## 部署
```bash

# 后端
cd end
pm2 --name=auto-temp start "gunicorn app:app -b localhost:8080"

# 定时执行
crontab -e
0 0 8,13,18 * * cd /opt/server/end/auto_temp && python3 main.py

```