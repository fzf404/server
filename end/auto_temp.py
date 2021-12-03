'''
Author: fzf404
Date: 2021-11-16 16:12:35
LastEditTime: 2021-11-27 18:23:44
Description: 体温自动填报
'''
import csv
import time
import yagmail
import requests
import logging
import random
import config
import utils
from lxml import etree
from jinja2 import FileSystemLoader, Environment

# 日志配置
temp_logger = utils.logger('auto-temp', config.TEMP_LOG, level=logging.WARNING)
# 缓存
user_temp = []

'''
description: 验证用户信息是否正确
param {*} student_id
param {*} password
'''


def user_verfiy(student_id, password):
    # 登录信息
    data = {'txtUid': student_id, 'txtPwd': password}
    # 发送请求
    res = requests.post(config.TEMP_LOGIN_URL, data=data)

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
        temp_logger.warning(f'{user_name}: 邮件发送失败')


'''
description: 发送体温信息 
param {*} info
'''


def post_temp(info):
    student_id, password, user_name, user_email = info
    # 登录信息
    login_data = {'txtUid': student_id, 'txtPwd': password}

    # 创建会话
    sess = requests.session()

    # 发送登录请求
    sess.post(config.TEMP_LOGIN_URL, data=login_data)

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
    res = sess.post(config.TEMP_POST_URL, data=temp_data)

    # 解析html
    content = etree.HTML(res.text)
    mess = content.xpath('//body/script/text()')
    message = mess[0].split("'")[1]
    if message == "填报成功！":
        temp_logger.info(f'{user_name}: {message}')
        # 暂停邮件发送
        # send_email(user_name=user_name, user_email=user_email,
        #            message=None, temperature=temp_str)
    else:
        temp_logger.warning(f'{user_name}: {message}')
        # 暂停邮件发送
        # send_email(user_name=user_name, user_email=user_email,
        #            message=message, temperature=None)


'''
description: 用户缓存装饰器
param {*} func
'''


def temp_verify(func):
    def handle_new(*args):
        student_id = args[0]
        # 是否正在处理
        if student_id in user_temp:
            return {
                "code": 409,
                "data": None,
                "msg": "正在处理中, 请不要重复提交!"
            }
        user_temp.append(student_id)  # 缓存用户id
        result = func(*args)  # 调用函数
        user_temp.remove(student_id)  # 删·除缓存
        return result

    return handle_new


'''
description: 新增用户
param {*} func
'''


@temp_verify
def handle_new(student_id, password, user_name, user_email):
    # 验证用户是否已存在
    with open(config.TEMP_DATA, 'r', encoding='utf-8') as f:
        data_raw = csv.reader(f)
        for item in data_raw:
            id_tmp = item[0]
            if student_id == id_tmp:
                return {
                    "code": 403,
                    "data": None,
                    "msg": "该用户已存在!"
                }

    # 判断用户名密码是否合法
    if not user_verfiy(student_id, password):
        return {
            "code": 403,
            "data": None,
            "msg": "学号不正确或密码错误!"
        }

    post_temp([student_id, password, user_name, user_email])

    # 打开文件并写入, 需指定换行符
    with open(config.TEMP_DATA, 'a+', encoding='utf-8', newline='') as f:
        data_write = csv.writer(f)
        data_write.writerow([student_id, password, user_name, user_email])

    return {
        "code": 200,
        "data": {
            "student_id": student_id,
            "user_name": user_name
        },
        "msg": "Ok"
    }


def main():
    # 遍历用户表
    with open(config.TEMP_DATA, 'r', encoding='utf8') as f:
        csv_list = csv.reader(f)
        for item in csv_list:
            post_temp(item)


if __name__ == '__main__':
    main()
