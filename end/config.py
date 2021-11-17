'''
Author: fzf404
Date: 2021-11-16 11:06:36
LastEditTime: 2021-11-17 10:47:14
Description: 变量配置
'''
# 基本URL
LOGIN_URL = 'http://xg.sylu.edu.cn/SPCP/Web/'
POST_URL = 'http://xg.sylu.edu.cn/SPCP/Web/Temperature/StuTemperatureInfo'

# 格式化
LOG_FORMAT = "%(asctime)s - %(levelname)s - %(message)s"
DATE_FORMAT = "%Y/%m/%d %H:%M"

# 服务邮箱配置
EMAIL_SERVER = "serverfzf404@163.com"
EMAIL_SERVER_PASSWORD = "MFNPGCVDJVEWKWIA"
EMAIL_HOST="smtp.163.com"

# 配置文件
SYLU_TEMP_PATH = 'user.csv'