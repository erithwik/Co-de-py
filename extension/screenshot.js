function setScreenshotUrl(url) {
  document.getElementById('target').src = url;
  const image = document.getElementById('target');
  const cropper = new Cropper(image, {
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
  // you need to convert image to canvas
  // canvas has a dataURL thing which can be sent over...
}