document.body.style.border = "5px solid red";

browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
        "id": "sampleContextMenu",
        "title": "Sample Context Menu",
        "contexts": ["selection"]
    });
});