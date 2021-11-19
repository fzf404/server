'''
Author: fzf404
Date: 2021-11-16 16:12:35
LastEditTime: 2021-11-19 10:13:43
Description: 体温自动填报
'''
import yagmail
import time
import requests
import logging
import random
import config
from jinja2 import FileSystemLoader, Environment
from lxml import etree

'''
description: 验证用户信息是否正确
param {*} student_id
param {*} password
'''


def user_verfiy(student_id, password):
    # 登录信息
    data = {'txtUid': student_id, 'txtPwd': password}
    # 发送请求
    res = requests.post(config.LOGIN_URL, data=data)

    # 解析html
    content = etree.HTML(res.text)
    mess = content.xpath('//head/title/text()')

    # 判断是否登录成功
    if mess[0] in ["信息提示页面", "沈阳理工大学信息提示页"]:
        return False
    return True


'''
description: 发送邮件
param {*} user_name 用户名
param {*} user_email 用户邮箱
param {*} status 状态
param {*} message 信息
param {*} temperature 体温
'''


def send_email(user_name, user_email, message, temperature):
    # 当前时间
    now = time.strftime('%Y-%m-%d %H:%M', time.localtime())

    # SMTP对象
    yag = yagmail.SMTP(user=config.EMAIL_SERVER,
                       password=config.EMAIL_SERVER_PASSWORD, host=config.EMAIL_HOST)

    # Jinja对象
    env = Environment(loader=FileSystemLoader('templates'))
    # 加载模板文件
    template = env.get_template('email.html')
    # 渲染html
    html = template.render(name=user_name,
                           message=message, temp=temperature, now=now)   # 渲染
    try:
        # 发送
        yag.send(to=user_email, subject="体温填报提醒", contents=html)
    except:
        logging.warning(f'{user_name}: 邮件发送失败')


'''
description: 体温填报 
param {*} info
'''


def post_temp(info):
    student_id, password, user_name, user_email = info
    # 登录信息
    login_data = {'txtUid': student_id, 'txtPwd': password}

    # 创建会话
    sess = requests.session()

    # 发送登录请求
    sess.post(config.LOGIN_URL, data=login_data)

    # 随机温度
    temperature = random.randint(361, 369)
    temp_int = int(temperature/10)
    temp_point = temperature % 10
    temp_str = str(temp_int)+'.'+str(temp_point)

    # 当前时间
    hour = time.strftime("%H", time.localtime())
    minute = time.strftime("%M", time.localtime())
    # 体温数据
    temp_data = {'TimeNowHour': hour, 'TimeNowMinute': minute,
                 'Temper1': temp_int, 'Temper2': temp_point}

    # 发送请求
    res = sess.post(config.POST_URL, data=temp_data)

    # 解析html
    content = etree.HTML(res.text)
    mess = content.xpath('//body/script/text()')
    message = mess[0].split("'")[1]
    if message == "填报成功！":
        logging.info(f'{user_name}: {message}')
        send_email(user_name=user_name, user_email=user_email,
                   message=None, temperature=temp_str)
    else:
        logging.warning(f'{user_name}: {message}')
        send_email(user_name=user_name, user_email=user_email,
                   message=message, temperature=None)
