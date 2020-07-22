from flask import Flask, request, jsonify
import pytesseract
from PIL import Image
import subprocess

# pytesseract.pytesseract.tesseract_cmd = r'/usr/local/Cellar/tesseract/4.1.1'

# custom_config = r'-c preserve_interword_spaces=1 --oem 1 --psm 1 -l eng+ita'

# print(pytesseract.image_to_string(Image.open(
#     '/Users/ricky/Desktop/test.png'), config=custom_config))

app = Flask(__name__)


@app.route("/image", methods=["GET"])
def save_text():
    # get image
    data["image"] = request.get_json()
    # save image as temp.png

    # store the text
    output = subprocess.run(
        ["tesseract", "temp.png", "stdout"], capture_output=True)
    # delete the image
    subprocess.run(["rm", "temp.png"])
    # return output
    return jsonify(output)


@app.route("/code", methods=["GET"])
def run_code():
    # get the text in string format
    data = request.get_json()
    text = data["text"]
    # save the text
    with open("temp.cpp", "w") as f:
        f.write(text)
    # run the suprocess and get the output
    subprocess.run(["make", "temp.cpp"])
    out = subprocess.run(["./temp"], capture_output=True)
    # return the results
    print(out.stdout)


if __name__ == "__main__":
    subprocess.run(
        ["tesseract", "temp.png", "temp"])
    subprocess.run(["mv", "temp.txt", "temp.cpp"])
    subprocess.run(["make", "temp"])
    out = subprocess.run(["./temp"], capture_output=True)
    print(out.stdout.decode())
