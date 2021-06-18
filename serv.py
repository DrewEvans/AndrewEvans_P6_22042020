from flask import Flask, jsonify, request
from flask_cors import CORS
import flask, json, os, datetime
data = json.load(open('FishEyeData.json'))
app = Flask(__name__)

CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/')
@app.route('/<path:path>')

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

if __name__ == '__main__':
    app.run('0.0.0.0')

