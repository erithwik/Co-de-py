chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: "takePicture", // you'll use this in the handler function to identify this context menu item
        title: 'Take Screenshot',
        contexts: ['all'],
    });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "takePicture") { // here's where you'll need the ID
        chrome.tabs.captureVisibleTab(function (dataUrl) {
            chrome.tabs.create({ 'url': chrome.extension.getURL('picture.html') }, function (currentTab) {
                chrome.runtime.sendMessage(currentTab, { inputImage: dataUrl }, function (response) {
                    console.log("finished");
                })
            });
        })
    }
});