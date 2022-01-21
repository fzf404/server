'''
Author: fzf404
Date: 2021-11-19 10:14:21
LastEditTime: 2022-01-21 13:08:51
Description: 工具
'''
import re
import logging
import config
from paddleocr import PaddleOCR

# 验证码识别


def chptcha_ocr(sess):
    tmp_file = "tmp.jpg"
    # 获得验证码
    res = sess.get(config.GET_CHPTCHA_URL)  # 信息查询
    with open(tmp_file,"wb")as f:
        f.write(res.content)
    # 解析
    ocr = PaddleOCR()
    result = ocr.ocr(tmp_file, det=False)
    # 解析数据
    try:
        result = result[0][0].replace(' ', '')
    except:
        return chptcha_ocr(sess)
    # 长度错误则重新获取
    if len(result) != 4:
        return chptcha_ocr(sess)
    else:
        return result

# 邮箱验证


def email_verify(email_address):
    email_re = r'^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$'
    if re.match(email_re, email_address):
        return True
    else:
        return False

# 生成日志对象


def logger(name, filename, level=logging.INFO, fmt=config.LOG_FORMAT, datefmt=config.DATE_FORMAT):
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
