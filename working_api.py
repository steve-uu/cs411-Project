# from cgitb import text
import datetime
import time
import traceback
from urllib import request

import pymysql
import requests
import json
import oauth2 as oauth

###import needed library functions ^^^

## keys, they might change or expire
import config

yelp_api_key = 'm46NGi5lDJEIYnB934Uqc41VREMs_WRkmdRcc_A1mEihQsn5GjfYDkXX_KGl8gF5RsG0kFJZPCZWkqLfaf66RJeyodU3AH5Fk0o9ztkdE1u6zXlHd-HbnlnMgTZcY3Yx'
twitter_BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAHEriwEAAAAAgM8SIQfA2nl2H06fn2ylYImoai4%3D9P0rsosqGIvkFrDjl4ZwtSWsN8srlaUJTCVkPDWaXO4VuN80JB"


##define search yelp function

# returns long string, will need to process in backend

def yelp_call(keyword, location):
    headers = {'Authorization': 'Bearer {}'.format(yelp_api_key)}
    search_api_url = 'https://api.yelp.com/v3/businesses/search'
    params = {'term': keyword,
              'location': location,
              'limit': 5}
    response = requests.get(search_api_url, headers=headers, params=params, timeout=5)
    return response.text


# print(yelp_call('coffee', 'Boston'))


# define search twitter function
def search_twitter(query):
    tweet_fields = "tweet.fields=text,author_id,created_at,lang"
    max_results = "max_results=20"

    headers = {"Authorization": "Bearer {}".format(twitter_BEARER_TOKEN)}

    url = "https://api.twitter.com/2/tweets/search/recent?query={}&{}&{}".format(
        query, tweet_fields, max_results
    )
    print('url ' + url)
    response = requests.request("GET", url, headers=headers)
    print(response.status_code)

    if response.status_code != 200:
        raise Exception(response.status_code, response.text)
    jsonvalues = response.json()
    data = jsonvalues.get('data')
    for i in response.json().get('data'):
        if i.get('lang') != 'en':
            jsonvalues.get('data').remove(i)

    # save in database
    db = pymysql.connect(host=config.sql_url, user=config.sql_username, password=config.sql_password, database="flask",
                         charset="utf8")
    cursor = db.cursor()
    print(len(data))
    timeNow  = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(time.time()))
    sql = "INSERT INTO history(searchContent,resultNumber,searchTime) VALUES ('" + str(query) + "', '" + str(
        len(data)) + "', '" + str(timeNow) + "')"
    print(sql)
    try:
        cursor.execute(sql)
        db.commit()
    except:
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()

    return json.dumps(jsonvalues, indent=4, sort_keys=True)

# call twitter api - working
# search_twitter(query='starbucks')
# print(search_twitter(query="starbucks"))
