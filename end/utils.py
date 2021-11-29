'''
Author: fzf404
Date: 2021-11-19 10:14:21
LastEditTime: 2021-11-27 19:47:22
Description: 工具
'''
import re
import logging
import config

# 邮箱验证
def email_verify(email_address):
    email_re = r'^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$'
    if re.match(email_re, email_address):
        return True
    else:
        return False

# 生成日志对象
def logger(name,filename, level=logging.INFO, fmt=config.LOG_FORMAT, datefmt=config.DATE_FORMAT):
    # 获取日志对象
    logger = logging.getLogger(name)
    logger.setLevel(level)
    # 格式化方式
    formater = logging.Formatter(fmt, datefmt)
    # 新建处理方法
    handler = logging.FileHandler(filename)
    handler.setLevel(level)
    handler.setFormatter(formater)
    # 添加处理方法
    logger.addHandler(handler)
    # 返回logger对象
    return logger
