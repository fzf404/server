'''
Author: fzf404
Date: 2021-11-27 18:15:06
LastEditTime: 2021-11-27 18:16:45
Description: description
'''
import config
import csv

def handle_search(student_id):
    class_id = student_id[:8]
    mini_id = class_id[:2]+class_id[2:].replace('0', '')

    exam_data = []

    with open(config.EXAM_DATA, 'r', encoding='utf-8') as f:
        data_raw = csv.reader(f)
        for item in data_raw:
            if item[0] in [class_id, student_id, mini_id]:
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
