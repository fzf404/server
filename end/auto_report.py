"""
Author: fzf404
Date: 2021-11-16 16:12:35
LastEditTime: 2022-01-12 12:44:14
Description: 体温自动填报
"""
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
report_logger = utils.logger("auto-report", config.REPORT_LOG, level=logging.WARNING)
# 缓存
user_tmp = []

"""
description: 验证用户信息是否正确
param {*} student_id
param {*} password
"""


def user_verfiy(student_id, password):
    # 登录信息
    data = {"txtUid": student_id, "txtPwd": password}
    # 发送请求
    res = requests.post(config.LOGIN_URL, data=data)

    # 解析html
    content = etree.HTML(res.text)
    mess = content.xpath("//head/title/text()")

    # 判断是否登录成功
    if mess[0] in ["信息提示页面", "沈阳理工大学信息提示页"]:
        return False
    return True


"""
description: 发送邮件
param {*} user_name 用户名
param {*} user_email 用户邮箱
"""


def send_email(user_name, user_email):
    # 当前时间
    now = time.strftime("%Y-%m-%d %H:%M", time.localtime())

    # SMTP对象
    yag = yagmail.SMTP(
        user=config.EMAIL_SERVER,
        password=config.EMAIL_SERVER_PASSWORD,
        host=config.EMAIL_HOST,
    )

    # Jinja对象
    env = Environment(loader=FileSystemLoader("templates"))
    # 加载模板文件
    template = env.get_template("report.html")
    # 渲染html
    html = template.render(name=user_name, now=now)  # 渲染
    try:
        # 发送
        yag.send(to=user_email, subject="填报提醒", contents=html)
    except:
        report_logger.warning(f"{user_name}: 邮件发送失败")


"""
description: 用户缓存装饰器
param {*} func
"""


def handle_verify(func):
    def handle_new(*args):
        student_id = args[0]
        # 是否正在处理
        if student_id in user_tmp:
            return {"code": 409, "data": None, "msg": "正在处理中, 请不要重复提交!"}
        user_tmp.append(student_id)  # 缓存用户id
        result = func(*args)  # 调用函数
        user_tmp.remove(student_id)  # 删·除缓存
        return result

    return handle_new


"""
description: 新增用户
param {*} func
"""


@handle_verify
def handle_new(student_id, password, user_name, user_email):
    # 验证用户是否已存在
    with open(config.REPORT_DATA, "r", encoding="utf-8") as f:
        data_raw = csv.reader(f)
        for item in data_raw:
            id_tmp = item[0]
            if student_id == id_tmp:
                return {"code": 403, "data": None, "msg": "该用户已存在!"}

    # 判断用户名密码是否合法
    if not user_verfiy(student_id, password):
        return {"code": 403, "data": None, "msg": "学号不正确或密码错误!"}

    # 打开文件并写入, 需指定换行符
    with open(config.REPORT_DATA, "a+", encoding="utf-8", newline="") as f:
        data_write = csv.writer(f)
        data_write.writerow([student_id, password, user_name, user_email])

    send_email(
        user_name=user_name,
        user_email=user_email,
    )

    return {
        "code": 200,
        "data": {
            "head": ["学号", "姓名"],
            "body": [[student_id, user_name]],
            "notice": [0],
        },
        "msg": "请注意查收邮件!",
    }


@handle_verify
def handle_remove(student_id, password):
    # 验证用户是否存在
    with open(config.REPORT_DATA, "r", encoding="utf-8") as f:
        data_raw = csv.reader(f)
        data = list(data_raw)
        for item in data:
            if student_id == item[0] and password == item[1]:

                # 删除该用户
                data.remove(item)

                # 重新写入
                with open(config.REPORT_DATA, "w", encoding="utf-8") as f:
                    data_write = csv.writer(f)
                    data_write.writerows(data)

                    # 打印日志
                    report_logger.warning(f"{item[2]}-{student_id}: 取消自动填报")

                    # 缓存数据
                    with open(config.STOP_DATA, "a", encoding="utf-8", newline="") as f:
                        data_write = csv.writer(f)
                        data_write.writerow(item)
                    return {
                        "code": 200,
                        "data": {
                            "head": ["学号", "姓名"],
                            "body": [[item[0], item[2]]],
                            "notice": [0],
                        },
                        "msg": "取消自动填报成功!",
                    }

    return {"code": 403, "data": None, "msg": "学号不正确或密码错误!"}


if __name__ == "__main__":
    pass
