from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import subprocess
import base64

# pytesseract.pytesseract.tesseract_cmd = r'/usr/local/Cellar/tesseract/4.1.1'

# custom_config = r'-c preserve_interword_spaces=1 --oem 1 --psm 1 -l eng+ita'

# print(pytesseract.image_to_string(Image.open(
#     '/Users/ricky/Desktop/test.png'), config=custom_config))

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
    ret = jsonify({"code": str(output.stdout)})
    print({"code": str(output.stdout)}, file=sys.stderr)
    return ret


@ app.route("/code/<code>", methods=["GET"])
def run_code(code):
    # save the text
    with open("temp.cpp", "w") as f:
        f.write(text)
    # run the suprocess and get the output
    subprocess.run(["make", "temp.cpp"])
    out = subprocess.run(["./temp"], capture_output=True)
    # return the results
    print(out.stdout)


if __name__ == "__main__":
    # subprocess.run(
    #     ["tesseract", "temp.png", "temp"])
    # subprocess.run(["mv", "temp.txt", "temp.cpp"])
    # subprocess.run(["make", "temp"])
    # out = subprocess.run(["./temp"], capture_output=True)
    # print(out.stdout.decode())
    app.run(debug=True)
