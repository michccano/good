from requests.auth import HTTPBasicAuth
import requests
from flask import Flask, render_template,request
from flask_json import FlaskJSON, JsonError, json_response, as_json
from flask_cors import CORS
from datetime import datetime


import pymongo


myclient = pymongo.MongoClient("mongodb://localhost:27017/")

mydb = myclient["vds"]


mycol = mydb["quotes"]

quotes = []



app = Flask(__name__, static_url_path='/static')
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
json = FlaskJSON(app)


CORS(app)



@app.route('/<path>')
def index(path):

    now = datetime.now()


    asd = requests.get('https://clippingmagic.com/api/v1/images/'+path, auth=HTTPBasicAuth('9461', 'l9d9drhgc66s7j11spem2m47tlc2cfai7j0dm9qbmqm02hpfodnj')).content

    tmp = now.strftime("%d%m%Y%H%M%S")
    with open('./static/'+tmp+'.jpg', 'wb') as handler:
        handler.write(asd)

    return tmp


@app.route('/get/<path:path>')
def get(path):
    app.send_static_file(path+'.jpg')


@app.route('/search_quotes/<kw>')
def read(kw):
    myquery = {"$or":[{"the_quote":{"$regex":"^"+kw+"^"}}, {"tag": kw }] }

    mydoc = mycol.find(myquery)
    results = []
    for x in mydoc:
        results.append({"quote":x["the_quote"],"author":x["author"]})

    return dict(data=results)



if __name__ == '__main__':
   app.run()