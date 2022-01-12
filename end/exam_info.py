'''
Author: fzf404
Date: 2021-11-27 18:15:06
LastEditTime: 2022-01-12 12:38:49
Description: description
'''
import config
import csv

# def handle_old(student_id):
#     # 处理学号
#     class_id = student_id[:8]
#     mini_id = class_id[:2]+class_id[2:].replace('0', '')

#     # 结果列表
#     exam_data = []

#     with open(config.EXAM_DATA, 'r', encoding='utf-8') as f:
#         data_raw = csv.reader(f)
#         for item in data_raw:
#             if item[0] in [class_id, student_id, mini_id]:
#                 exam_data.append(item)

#     if len(exam_data) == 0:
#         return{
#             "code": 404,
#             "data": None,
#             "msg": "没有找到考试信息!"
#         }

#     return {
#         "code": 200,
#         "data": exam_data,
#         "msg": "Ok"
#     }

def handle_search(student_id):
    # 处理学号
    class_id = student_id[:8]
    mini_id = class_id[:2]+class_id[2:].replace('0', '')

    # 结果列表
    exam_data = []
    notice_data = []

    with open(config.EXAM_DATA, 'r', encoding='utf-8') as f:
        data_raw = csv.reader(f)
        for item in data_raw:
            if item[0] in [class_id, student_id, mini_id]:
                exam_data.append([item[1], item[2], item[3]])
                notice_data.append(item[4])

    if len(exam_data) == 0:
        return{
            "code": 404,
            "data": None,
            "msg": "没有找到考试信息!"
        }

    return {
        "code": 200,
        "data": {
            'head': ['地点', '时间', '科目'],
            'body': exam_data,
            'notice': notice_data
        },
        "msg": "红色为重修, 仅供参考"
    }
