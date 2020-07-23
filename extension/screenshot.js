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
    const cropper = new Cropper(canvas, {
      crop(event) { },
    });
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
  textAreaInput.textContent = data["code"];

  holder = document.getElementById("target-holder");
  holder.innerHTML = ""
  holder.appendChild(textAreaInput);
  holder.appendChild(textAreaResults);
  holder.classList.add("target-holder");

  buttonHolder = document.getElementById("button-holder");
  buttonHolder.innerHTML = "";

  newButton = document.createElement("button")
  newButton.id = "code-button";
  newButton.type = "button";
  newButton.classList.add("btn");
  newButton.classList.add("btn-success");
  newButton.innerText = "Send Code";
  buttonHolder.appendChild(newButton)
  buttonHolder.classList.add("vertical-center");
}

function sendCode() {
  codeToSend = document.getElementById("text-1").textContent;
  fetch(`http://localhost:5000/code`, {
    method: "POST",
    body: JSON.stringify({ "code": codeToSend }),
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json())
    .then(function (data) {
      resultArea = document.getElementById("text-2");
      resultArea.innerHTML = data["result"];
    })
}