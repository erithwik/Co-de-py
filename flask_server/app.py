from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import subprocess
import base64
import time

app = Flask(__name__)
CORS(app)


@app.route("/image", methods=["GET", "POST"])
def save_text():
    image = request.get_json(force=True)
    image = image["image"]
    # save image as temp.png
    head, data = image.split(',', 1)
    file_ext = head.split(';')[0].split('/')[1]
    plain_data = base64.urlsafe_b64decode(data)
    with open('image.' + file_ext, 'wb') as f:
        f.write(plain_data)
    # store the text
    output = subprocess.run(
        ["tesseract", "image." + file_ext, "stdout"], capture_output=True, text=True)
    # return output
    return jsonify({"code": str(output.stdout)})


@ app.route("/code", methods=["GET", "POST"])
def run_code():
    # save the text
    text = request.get_json(force=True)
    text = text["code"]
    with open("text.cpp", "w") as f:
        f.write(text)
    # run the suprocess and get the output
    first = subprocess.run(["make", "text"],
                           capture_output=True, text=True)
    print(first.stdout, sys.stderr)
    print(first.stderr, sys.stderr)
    if(len(first.stderr) > 0):
        subprocess.run(["rm", "text.cpp"])
        return jsonify({"result": str(first.stderr)})
    second = subprocess.run(["./text"], capture_output=True, text=True)
    if(len(second.stderr) > 0):
        subprocess.run(["rm", "text.cpp"])
        subprocess.run(["rm", "text"])
        return jsonify({"result": str(second.stderr)})
    subprocess.run(["rm", "text.cpp"])
    subprocess.run(["rm", "text"])
    return jsonify({"result": str(second.stdout)})


@app.route("/add", methods=["POST"])
def add_codebase():
    text = request.get_json(force=True)
    text = text["code"]
    strings.append(text)
    return jsonify({"result": text})


@app.route("/codebase", methods=["GET"])
def get_codebase():
    return jsonify({"result": strings})


if __name__ == "__main__":
    strings = []
    app.run(debug=True)
