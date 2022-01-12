'''
Author: fzf404
Date: 2021-11-16 11:06:36
LastEditTime: 2022-01-12 17:13:41
Description: 变量配置
'''

# 基本URL
LOGIN_URL = 'http://xg.sylu.edu.cn/SPCP/Web/'
TEMP_POST_URL = 'http://xg.sylu.edu.cn/SPCP/Web/Temperature/StuTemperatureInfo'

# 格式化
LOG_FORMAT = '%(asctime)s - %(levelname)s - %(message)s'
DATE_FORMAT = '%Y/%m/%d %H:%M:%S'

# 服务邮箱配置
EMAIL_SERVER = 'serverfzf404@163.com'
EMAIL_SERVER_PASSWORD = ''
EMAIL_HOST = 'smtp.163.com'

# 数据文件
DATA_PATH = 'data/'
TEMP_DATA = DATA_PATH + 'auto-temp.csv'
REPORT_DATA = DATA_PATH + 'auto-report.csv'
STOP_DATA = DATA_PATH + 'stop.csv'
EXAM_DATA = DATA_PATH + 'exam-info.csv'

# 日志
LOG_PATH = 'logs/'
APP_LOG = LOG_PATH + 'app.log'
TEMP_LOG = LOG_PATH + 'auto-temp.log'
REPORT_LOG = LOG_PATH + 'auto-report.log'
CHAT_LOG = LOG_PATH + 'chat.log'
