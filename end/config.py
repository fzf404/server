'''
Author: fzf404
Date: 2021-11-16 11:06:36
LastEditTime: 2021-11-27 18:45:42
Description: 变量配置
'''

# 基本URL
TEMP_LOGIN_URL = 'http://xg.sylu.edu.cn/SPCP/Web/'
TEMP_POST_URL = 'http://xg.sylu.edu.cn/SPCP/Web/Temperature/StuTemperatureInfo'

# 格式化
LOG_FORMAT = '%(asctime)s - %(levelname)s - %(message)s'
DATE_FORMAT = '%Y/%m/%d %H:%M:%S'

# 服务邮箱配置
EMAIL_SERVER = 'serverfzf404@163.com'
EMAIL_SERVER_PASSWORD = 'QLJAYNHRNYDDVAIF'
EMAIL_HOST = 'smtp.163.com'

# 数据文件
DATA_PATH = 'data/'
TEMP_DATA = DATA_PATH + 'auto-temp.csv'
STOP_DATA = DATA_PATH + 'stop-temp.csv'
EXAM_DATA = DATA_PATH + 'exam-info.csv'

# 日志
LOG_PATH = 'logs/'
APP_LOG = LOG_PATH + 'app.log'
TEMP_LOG = LOG_PATH + 'auto-temp.log'
CHAT_LOG = LOG_PATH + 'chat.log'
