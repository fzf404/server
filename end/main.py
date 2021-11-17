'''
Author: fzf404
Date: 2021-11-16 11:16:16
LastEditTime: 2021-11-17 10:45:25
Description: 发送请求
'''

import csv
import auto_temp
import logging
import config

# 日志配置
logging.basicConfig(filename='post.log', level=logging.INFO,
                    format=config.LOG_FORMAT, datefmt=config.DATE_FORMAT)
logging.basicConfig(filename='post.log', level=logging.WARNING,
                    format=config.LOG_FORMAT, datefmt=config.DATE_FORMAT)
                    
def main():
    csv_raw = open(config.SYLU_TEMP_PATH, 'r', encoding='utf8')
    csv_list = csv.reader(csv_raw)
    for item in csv_list:
        status = auto_temp.post_temp(item)


if __name__ == '__main__':
    main()
