'''
Author: fzf404
Date: 2021-11-16 11:15:21
LastEditTime: 2021-11-22 16:14:16
Description: 后端
'''
import csv
import auto_temp
import logging
import config
import utils
from flask_cors import *
from flask import Flask, request

app = Flask("server")
CORS(app, supports_credentials=True)

logging.basicConfig(filename=config.APP_LOG, level=logging.INFO,
                    format=config.LOG_FORMAT, datefmt=config.DATE_FORMAT)


@app.route('/auto-temp/new', methods=["POST"])
def sylu_temp_new():
    # 获得全部信息
    student_id = request.form.get('student_id')
    password = request.form.get('password')
    user_name = request.form.get('user_name')
    user_email = request.form.get('email')

    # 判断是否为None
    if (student_id and password and user_name and user_email) is None:
        return {
            "code": 400,
            "data": None,
            "msg": "所有字段不应为空，请输入所有字段哦!"
        }

    # 判断是否为空
    if (len(student_id) and len(password) and len(user_name) and len(user_email)) == 0:
        return {
            "code": 400,
            "data": None,
            "msg": "所有字段不应为空，请输入所有字段哦!"
        }

    # 验证邮箱
    if not utils.email_verify(user_email):
        return {
            "code": 403,
            "data": None,
            "msg": "邮箱不存在!"
        }

    # 验证用户是否已存在
    with open(config.STU_DATA, 'r', encoding='utf-8') as f:
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
    if not auto_temp.user_verfiy(student_id, password):
        return {
            "code": 403,
            "data": None,
            "msg": "学号不正确或密码错误!"
        }

    auto_temp.post_temp([student_id, password, user_name, user_email])

    # 打开文件并写入, 需指定换行符
    with open(config.STU_DATA, 'a+', encoding='utf-8', newline='') as f:
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


@app.route('/exam-query/find')
def exam_query_find():
    student_id = request.args.get('student_id')

     # 判断是否为None
    if (student_id) is None:
        return {
            "code": 400,
            "data": None,
            "msg": "所有字段不应为空，请输入所有字段哦!"
        }

    # 判断是否为空
    if (len(student_id)) != 10:
        return {
            "code": 400,
            "data": None,
            "msg": "学号不存在!"
        }

    student_id= student_id[:8]
    exam_data = []

    with open(config.EXAM_DATA, 'r', encoding='utf-8') as f:
        data_raw = csv.reader(f)
        for item in data_raw:
            if student_id == item[0]:
                exam_data.append(item)
                
    if len(exam_data) == 0:
        return{
            "code": 404,
            "data": None,
            "msg": "没有找到考试信息!"
        }

    return {
        "code": 200,
        "data": exam_data,
        "msg": "Ok"
    }


if __name__ == '__main__':
    app.run('127.0.0.1', port='8080')
