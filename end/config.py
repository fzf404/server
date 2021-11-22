'''
Author: fzf404
Date: 2021-11-16 11:06:36
LastEditTime: 2021-11-22 16:01:13
Description: 变量配置
'''

# 基本URL
LOGIN_URL = 'http://xg.sylu.edu.cn/SPCP/Web/'
POST_URL = 'http://xg.sylu.edu.cn/SPCP/Web/Temperature/StuTemperatureInfo'

# 格式化
LOG_FORMAT = '%(asctime)s - %(levelname)s - %(message)s'
DATE_FORMAT = '%Y/%m/%d %H:%M'

# 服务邮箱配置
EMAIL_SERVER = 'serverfzf404@163.com'
EMAIL_SERVER_PASSWORD = 'MFNPGCVDJVEWKWIA'
EMAIL_HOST = 'smtp.163.com'

# 数据文件
STU_DATA = 'data/auto-temp.csv'
EXAM_DATA = 'data/exam-info.csv'

# 日志
APP_LOG = 'logs/app.log'
AUTO_TEMP_LOG = 'logs/auto-temp.log'
