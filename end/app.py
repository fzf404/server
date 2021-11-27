'''
Author: fzf404
Date: 2021-11-16 11:15:21
LastEditTime: 2021-11-27 20:47:03
Description: 后端
'''
import auto_temp
import exam_info
import logging
import utils
import config
from flask import Flask, request
from flask_cors import *
from flask_sockets import Sockets


app = Flask("server")
CORS(app, supports_credentials=True)
sockets = Sockets(app)


chat_logger = utils.logger('chat', config.CHAT_LOG)

logging.basicConfig(filename=config.APP_LOG, level=logging.DEBUG,
                    format=config.LOG_FORMAT, datefmt=config.DATE_FORMAT)


chat_list = []


@sockets.route('/chat/connect')
def chat(ws):
    ws.send("「请设置用户名」")
    user_name = ws.receive()

    chat_list.append(ws)

    for user in chat_list:
        user.send(f'{user_name}: 连接成功')

    while not ws.closed:
        message = ws.receive()  # 接收消息
        # 判断是否收到
        if message is not None:
            message = f'{user_name}: {message}'
            chat_logger.info(message)  # 打印日志
            # 将信息发给全部用户
            for user in chat_list:
                user.send(message)
        else:
            chat_list.remove(ws)  # 从在线列表中删除
            message = f'{user_name} - 断开连接'
            for user in chat_list:
                user.send(message)
            chat_logger.info(message)


@app.route('/chat/number')
def chat_number():
    return str(len(chat_list))


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
    from gevent import pywsgi
    from geventwebsocket.handler import WebSocketHandler
    server = pywsgi.WSGIServer(('', 8080), app, handler_class=WebSocketHandler)
    server.serve_forever()
    # 非启动器
    # app.run('0.0.0.0', port='8080')
