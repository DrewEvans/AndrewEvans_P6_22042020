from flask import Flask, jsonify, request
from flask_cors import CORS
# from flask_restful import Api
import flask, json, os, datetime
data = json.load(open('FishEyeData.json'))
app = Flask(__name__)
# api = Api(app)
CORS(app, resources={r'/*': {'origins': 'http://34.251.153.147'}})

# build static route to return profile landing page
# class RESTapp(Resource):

#     @staticmethod
#         def get(path="http://34.251.153.147/"):
#             return path?

# api.add_resource(RESTapp, '/', '/<path:path>') 

@app.route('/api/photographers', methods=['GET'])
def get_photographers():
        return jsonify(data.get('photographers'))

@app.route('/api/photographers/tags', methods=['GET'])
def get_tags():
    tags = set()
    [tags.update(x.get('tags')) for x in data.get('photographers')]
    return jsonify(list(tags))

@app.route('/api/photographers/<id>')
def get_photographer_by_id(id):
    print(id)
    photographer = [x for x in data.get('photographers') if x.get('id') == int(id)]
    return jsonify(photographer)

@app.route("/api/photographers/<id>/media")
def get_media_by_photographer_id(id):
    media = [x for x in data.get('media') if x.get('photographerId')== int(id)]
    return jsonify(media)

@app.errorhandler(404)   
def not_found(e):   
  return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run('0.0.0.0')

