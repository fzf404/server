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

def logger(name,filename, level=logging.INFO, fmt=config.LOG_FORMAT, datefmt=config.DATE_FORMAT):
    logger = logging.getLogger('name')
    logger.setLevel(level)

    formater = logging.Formatter(fmt, datefmt)

    handler = logging.FileHandler(filename)
    handler.setLevel(level)
    handler.setFormatter(formater)

    logger.addHandler(handler)

    return logger
