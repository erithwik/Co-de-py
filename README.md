# Co(de)Py

A Chrome Extension that acts as a companion for learning algorithm design and coding languages. It uses a Flask backend which integrates with the extension code.
#### Features
- Screenshot code directly from any source (including videos) and copy the contents.

![](https://media.giphy.com/media/YRnv1dI1lHxXQCKa5r/giphy.gif)

- Save any (interesting) code snippets for future use.

![](https://media.giphy.com/media/dU5VqsHfx8H6tgZlgM/giphy.gif)

- Run copied code directly on the extension. (Will show build errors and output allowing it to act as a self-contained runner)

![](https://media.giphy.com/media/Tdjn6OuSFNt3CYeT3b/giphy.gif)

### Installation (MacOS)

- Install tesseract with `brew install tesseract`
- Install python requirements: `flask`, `flask-cors`
- Go to `chrome://extensions` and choose `Load unpacked` and then select the `extension` folder in the repo.

### Usage

(This will be run locally (future iteration will allow full cloud integration).)
- In the `flask-server` folder, enter in the command: `python app.py`
- Go on chrome and click the extension to start using the extension.

### In-progress updates

- Integrating with repl.it's API to allow for full cloud integration.
- Updating the design of the extension