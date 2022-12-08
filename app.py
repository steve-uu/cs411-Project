#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json
import traceback
from urllib.parse import parse_qsl

import pymysql
import requests

from flask import Flask, request
from flask_cors import CORS
from pymysql import cursors

import config
import working_api
import oauth2 as oauth

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})


@app.route("/yelp_call")
def yelp_call():
    keyword = request.args.get('keyword')
    location = request.args.get('location')
    if not (keyword and location):
        return "wrong parameter", 400
    return working_api.yelp_call(keyword, location)


@app.route("/search_twitter")
def search_twitter():
    query = request.args.get('query')
    if not query:
        return "wrong parameter", 400
    return working_api.search_twitter(query)


@app.route('/githubToken', methods=['GET', 'POST'])
def login():
    header = {
        "Connection": "keep-alive",
        "content-type": "application/json",
    }
    client_id = "dad6e9352ab9435c21b3"
    client_secret = "47f4ac194f875e8b8d19b123c44477f11dd8a0f9"
    code = request.args.get('code')
    url = "https://github.com/login/oauth/access_token"
    dataRaw = {"code": code, "client_id": client_id, "client_secret": client_secret}
    data = json.dumps(dataRaw)
    response = requests.request(method="POST", url=url, data=data, headers=header)
    res = response.text
    access_token_raw, others = res.split("&", 1)
    others, access_token = access_token_raw.split("=", 1)
    return json.dumps({"accessToken": access_token})


@app.route('/registuser', methods=['GET', 'POST'])
def getRigistRequest():
    db = pymysql.connect(host=config.sql_url, user=config.sql_username, password=config.sql_password, database="flask",
                         charset="utf8")
    cursor = db.cursor()
    username = request.args.get('username')
    password = request.args.get('password')

    querySql = "select * from `user` where `username` = '" + username + "'"
    cursor.execute(querySql)
    rest = cursor.fetchone()
    if rest is not None:
        print("user had existed")
        return "user had existed"

    sql = "INSERT INTO user(username, password) VALUES ('" + str(username) + "', '" + str(password) + "')"
    try:
        cursor.execute(sql)
        db.commit()
        print("register successfully")
        return 'register successfully'
    except:
        traceback.print_exc()
        db.rollback()
        print("register failed")
        return 'register failed'
    finally:
        db.close()


@app.route('/history', methods=['GET', 'POST'])
def history():
    db = pymysql.connect(host=config.sql_url, user=config.sql_username, password=config.sql_password, database="flask",
                         charset="utf8", cursorclass=cursors.DictCursor)
    cursor = db.cursor()
    querySql = "select * from history"
    cursor.execute(querySql)
    rest = cursor.fetchall()
    print(rest)
    return json.dumps({"data": rest})
