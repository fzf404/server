'''
Author: fzf404
Date: 2021-11-19 10:14:21
LastEditTime: 2021-11-19 10:28:34
Description: 小工具
'''
import re


def email_verify(email_address):
    email_re = r'^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$'
    if re.match(email_re, email_address):
        return True
    else:
        return False


if __name__ == '__main__':
    print(email_verify("f@q.co"))
