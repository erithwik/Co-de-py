function scaleToFit(canvas, ctx, img) {
  console.log("canvas height: " + canvas.height)
  console.log("canvas width: " + canvas.width)
  console.log("image height: " + img.height)
  console.log("image width: " + img.width)
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
      crop(event) {
        console.log(event.detail.x);
        console.log(event.detail.y);
        console.log(event.detail.width);
        console.log(event.detail.height);
        console.log(event.detail.rotate);
        console.log(event.detail.scaleX);
        console.log(event.detail.scaleY);
      },
    });
    // add a listener here s.t. when enter is clicked, you export it...
    document.getElementById("send-button").onclick = function () {
      data = cropper.getCroppedCanvas().toDataURL('image/png');
      // console.log(data)
      fetch(`http://localhost:5000/image`, {
        method: "POST",
        body: JSON.stringify({ "image": data }),
        mode: "no-cors",
      })
        .then(response => response.json())
        .then(function (data) {
          console.log(data)
        })
    }
  }
  image.src = url;
}