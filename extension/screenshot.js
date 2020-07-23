function scaleToFit(canvas, ctx, img) {
  var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
  var x = (canvas.width / 2) - (img.width / 2) * scale;
  var y = (canvas.height / 2) - (img.height / 2) * scale;
  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

function setScreenshotUrl(url) {
  const canvas = document.getElementById("target")
  context = canvas.getContext("2d")
  context.canvas.width = window.innerWidth;
  context.canvas.height = window.innerHeight;
  var image = new Image();
  image.onload = function () {
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
    scaleToFit(canvas, context, image)
    const cropper = new Cropper(canvas);
    // add a listener here s.t. when enter is clicked, you export it...
    document.getElementById("send-button").onclick = function () {
      data = cropper.getCroppedCanvas().toDataURL('image/png');
      // console.log(data)
      fetch(`http://localhost:5000/image`, {
        method: "POST",
        body: JSON.stringify({ "image": data }),
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(response => response.json())
        .then(function (data) {
          redesign(data);
        })
    }
  }
  image.src = url;
}

function redesign(data) {
  textAreaInput = document.createElement("textarea");
  textAreaInput.classList.add("text-1");
  textAreaInput.id = "text-1";
  textAreaResults = document.createElement("textarea");
  textAreaResults.classList.add("text-2");
  textAreaResults.id = "text-2";
  textAreaInput.value = data["code"];

  newButton = document.createElement("button")
  saveButton = document.createElement("button")
  newButton.id = "code-button";
  saveButton.id = "save-button";
  newButton.type = "button";
  saveButton.type = "button";
  newButton.classList.add("btn");
  newButton.classList.add("btn-success");
  saveButton.classList.add("btn");
  saveButton.classList.add("btn-info");
  newButton.innerText = "Run Code";
  saveButton.innerText = "Save Code";

  holder = document.getElementById("target-holder");
  holder.innerHTML = ""
  holder.appendChild(textAreaInput);
  tempDiv = document.createElement("div");
  holder.appendChild(tempDiv);
  tempDiv.id = "center-div";
  title = document.createElement("h1");
  title.innerHTML = "Co(de)py"
  tempDiv.appendChild(title)
  tempDiv.appendChild(newButton);
  tempDiv.appendChild(saveButton);
  holder.appendChild(textAreaResults);
  holder.classList.add("target-holder");

  var im = CodeMirror.fromTextArea(textAreaInput, {
    theme: "dracula",
    lineNumbers: true,
    autoCloseBrackets: true
  });

  var rm = CodeMirror.fromTextArea(textAreaResults, {
    theme: "dracula"
  });

  buttonHolder = document.getElementById("button-holder");
  buttonHolder.innerHTML = "";
  newButton.onclick = function () {
    im.save();
    codeToSend = document.getElementById("text-1").value;
    fetch(`http://localhost:5000/code`, {
      method: "POST",
      body: JSON.stringify({ "code": codeToSend }),
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => response.json())
      .then(function (data) {
        console.log("received")
        resultArea = document.getElementById("text-2");
        rm.getDoc().setValue(data["result"]);
      })
  };
  saveButton.onclick = function () {
    // fill in
  }
}