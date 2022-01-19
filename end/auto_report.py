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
report_logger = utils.logger(
    "auto-report", config.REPORT_LOG, level=logging.WARNING)
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
description: 发送健康信息
param {*} info
"""


def post_report(info):
    student_id, password, username, email = info

    sess = requests.session()  # 创建会话
    login_data = {"txtUid": student_id, "txtPwd": password}
    sess.post(config.LOGIN_URL, data=login_data)  # 发送登录请求
    res = sess.get(config.REPORT_POST_URL)  # 信息查询

    content = etree.HTML(res.text)  # 解析 html
    try:
        name = content.xpath('//*[@id="Name"]/@value')[0]
        sex = content.xpath('//*[@id="Sex"]/@value')[0]
        grade = content.xpath('//*[@id="SpeGrade"]/@value')[0]
        college = content.xpath('//*[@id="form1"]/div[1]/div[2]/div[5]/div[2]/text()')[
            0].replace('\r\n', '').replace(' ', '')
        special = content.xpath('//*[@id="SpecialtyName"]/@value')[0]

        province = content.xpath('//*[@id="FaProvinceName"]/@value')[0]
        if len(province) == 0:
            province = '读取错误'
        city = content.xpath('//*[@id="FaCityName"]/@value')[0]
        if len(city) == 0:
            city = '读取错误'
        county = content.xpath('//*[@id="FaCountyName"]/@value')[0]
        if len(county) == 0:
            county = '读取错误'
        street = content.xpath(
            '//*[@id="form1"]/div[1]/div[5]/div[2]/input/@value')[0]
        phone = content.xpath('//*[@id="MoveTel"]/@value')[0]
        studentId = content.xpath('//*[@id="StudentId"]/@value')[0]
        idCard = content.xpath('//*[@id="IdCard"]/@value')[0]
    except:
        report_logger.warning(f"{username}/{student_id}: 填报失败")
        report_logger.warning(content.xpath("//body/script/text()"))
        return

    data = {
        "StudentId": studentId,
        "Name": name,
        "Sex": sex,
        "SpeType": grade,
        "CollegeNo": college,
        "SpeGrade": grade,
        "SpecialtyName": special,
        "ClassName":  special,
        "MoveTel": phone,
        "Province": province,
        "City": city,
        "County": county,
        "ComeWhere": street,
        "ProvinceName": province,
        "CityName": city,
        "CountyName": county,
        "FaProvince": province,
        "FaCity": city,
        "FaCounty": county,
        "FaComeWhere": street,
        "FaProvinceName": province,
        "FaCityName": city,
        "FaCountyName": county,
        "radio_1": "e2f169d0-0778-4e3e-8ebf-64ce5a44f307",
        "radio_2": "c8ecb725-9788-4ed0-b9d2-4be23444ce3e",
        "radio_3": "a884f81e-f401-451d-9f3d-0526aa886feb",
        "radio_4": "62ad9bed-3201-4607-b845-5e279a0311d0",
        "radio_5": "57722ddd-3093-4978-86da-1213420f36c4",
        "radio_6": "c6bcc8ce-86f1-404c-b7f8-ac583d899c75",
        "radio_7": "12727e9b-cd2f-413e-ae30-36adafd5203f",
        "radio_8": "e0559a52-d3d1-4203-ac9a-d221506a507f",
        "radio_9": "c16d5a27-5923-43d8-b6a6-d5733803490b",
        "radio_10": "3a5fbe75-7bf4-4b6d-93f1-f561dbbf0ead",
        "radio_11": "3a36a22f-5af7-4b48-a472-7df55a8ba374",
        "radio_12": "8f1dddba-8bfc-4b06-8f9c-44a50d7c5ceb",
        "radio_13": "51fac408-9d07-4a7a-9375-b1872c4ab0bd",
    }
    res = sess.post(config.REPORT_POST_URL, data=data)

    content = etree.HTML(res.text)
    report_logger.info(f"{username}/{student_id}: 填报成功")
    report_logger.info(content.xpath("//body/script/text()"))


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


"""
description: 删除用户
param {*} func
"""


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
                    report_logger.warning(f"{item[2]}/{student_id}: 取消自动填报")

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


def main():
    # 遍历用户表
    with open(config.REPORT_DATA, "r", encoding="utf8") as f:
        csv_list = csv.reader(f)
        for item in csv_list:
            post_report(item)


if __name__ == "__main__":
    main()
