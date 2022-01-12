"""
Author: fzf404
Date: 2021-11-16 11:15:21
LastEditTime: 2022-01-12 12:55:59
Description: 后端
"""
import auto_temp
import auto_report
import exam_info
import logging
import utils
import config
from flask import Flask, request
from flask_cors import CORS
from flask_socketio import SocketIO

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# flask日志
app_logger = utils.logger("app", config.APP_LOG, level=logging.WARNING)
app.logger = app_logger

# 聊天室日志
chat_logger = utils.logger("chat", config.CHAT_LOG)
# 用户数量
user_number = 0


@socketio.on("connect")
def test_connect():
    global user_number
    user_number += 1
    socketio.emit("number", user_number)


@socketio.on("disconnect")
def test_disconnect():
    global user_number
    user_number -= 1
    socketio.emit("number", user_number)


@socketio.on("message")
def handle_message(msg):
    chat_logger.info(msg)
    socketio.send(msg)


@app.route("/auto-temp/new", methods=["POST"])
def sylu_temp_new():
    # 获得全部信息
    student_id = request.json.get("student_id")
    password = request.json.get("password")
    user_name = request.json.get("user_name")
    user_email = request.json.get("email")

    # 判断是否为None
    if (student_id and password and user_name and user_email) is None:
        return {"code": 400, "data": None, "msg": "所有字段不应为空，请输入所有字段哦!"}

    # 判断是否为空
    if (len(student_id) and len(password) and len(user_name) and len(user_email)) == 0:
        return {"code": 400, "data": None, "msg": "所有字段不应为空，请输入所有字段哦!"}

    # 验证邮箱
    if not utils.email_verify(user_email):
        return {"code": 403, "data": None, "msg": "邮箱不存在!"}

    return auto_temp.handle_new(student_id, password, user_name, user_email)


@app.route("/auto-temp/remove", methods=["POST"])
def sylu_temp_remove():
    # 获得全部信息
    student_id = request.json.get("student_id")
    password = request.json.get("password")

    # 判断是否为None
    if (student_id and password) is None:
        return {"code": 400, "data": None, "msg": "所有字段不应为空，请输入所有字段哦!"}

    # 判断是否为空
    if (len(student_id) and len(password)) == 0:
        return {"code": 400, "data": None, "msg": "所有字段不应为空，请输入所有字段哦!"}

    return auto_temp.handle_remove(student_id, password)


@app.route("/auto-report/new", methods=["POST"])
def sylu_report_new():
    # 获得全部信息
    student_id = request.json.get("student_id")
    password = request.json.get("password")
    user_name = request.json.get("user_name")
    user_email = request.json.get("email")

    # 判断是否为None
    if (student_id and password and user_name and user_email) is None:
        return {"code": 400, "data": None, "msg": "所有字段不应为空，请输入所有字段哦!"}

    # 判断是否为空
    if (len(student_id) and len(password) and len(user_name) and len(user_email)) == 0:
        return {"code": 400, "data": None, "msg": "所有字段不应为空，请输入所有字段哦!"}

    # 验证邮箱
    if not utils.email_verify(user_email):
        return {"code": 403, "data": None, "msg": "邮箱不存在!"}

    return auto_report.handle_new(student_id, password, user_name, user_email)


@app.route("/auto-report/remove", methods=["POST"])
def sylu_report_remove():
    # 获得全部信息
    student_id = request.json.get("student_id")
    password = request.json.get("password")

    # 判断是否为None
    if (student_id and password) is None:
        return {"code": 400, "data": None, "msg": "所有字段不应为空，请输入所有字段哦!"}

    # 判断是否为空
    if (len(student_id) and len(password)) == 0:
        return {"code": 400, "data": None, "msg": "所有字段不应为空，请输入所有字段哦!"}

    return auto_report.handle_remove(student_id, password)


@app.route("/exam-info/search")
def exam_info_search():
    student_id = request.args.get("student_id")
    # is_new = request.args.get('new') # 旧版

    # 判断是否为None
    if student_id is None:
        return {"code": 400, "data": None, "msg": "所有字段不应为空，请输入所有字段哦!"}

    # 判断是否为空
    if (len(student_id)) != 10:
        return {"code": 400, "data": None, "msg": "学号不存在!"}

    # 旧版
    # if is_new is None:
    #     return exam_info.handle_old(student_id)

    return exam_info.handle_search(student_id)


if __name__ == "__main__":
    # app.run('0.0.0.0', port='8080')
    socketio.run(app, "0.0.0.0", port=8080)
