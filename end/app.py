'''
Author: fzf404
Date: 2021-11-16 11:15:21
LastEditTime: 2021-11-28 20:16:26
Description: 后端
'''
import auto_temp
import exam_info
import logging
import utils
import config
from flask import Flask, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit

app = Flask("server")

socketio = SocketIO(app, cors_allowed_origins="*")

CORS(app)


chat_logger = utils.logger('chat', config.CHAT_LOG)

# logging.basicConfig(filename=config.APP_LOG, level=logging.DEBUG,
# format=config.LOG_FORMAT, datefmt=config.DATE_FORMAT)


@socketio.on("message")
def handle_message(message):
    print("received message: " + message)


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

    return auto_temp.handle_new(student_id, password, user_name, user_email)


@app.route('/exam-info/search')
def exam_info_search():
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

    return exam_info.handle_search(student_id)


if __name__ == '__main__':
    # app.run('0.0.0.0', port='8080')
    socketio.run(app, '0.0.0.0', port='8080')
