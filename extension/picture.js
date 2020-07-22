var data_source = "";

chrome.runtime.onMessage.addListener(function (request, sender, response) {
    data_source = request.inputImage;
    return true;
});

window.addEventListener("load", function () {
    image = document.createElement("img");
    image.setAttribute("src", data_source);
    document.body.appendChild(image);
    console.log("We opened a new Tab");
});