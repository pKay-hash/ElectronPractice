const chrome = document.getElementById("chrome");
const node = document.getElementById("node");
const electron = document.getElementById("electron");
const inputArea = document.getElementById("input-area");
const submitButton = document.getElementById("url-submit");
const fileSelector = document.getElementById("file-select");
const filePath = document.getElementById("file-path");

//Adds version numbers of Chrome, Node, and Electron to the h3 elements that serve the purpose of specifying the versions of these that the app is running on.
chrome.innerHTML += versions.chrome()
node.innerHTML += versions.node()
electron.innerHTML += versions.electron()

//When the submit button is clicked, take the URL from the inputArea
submitButton.addEventListener("click", () => {
    const url = inputArea.value;
    if(url.trim() !== ""){
        openNewWindow.openUrl(url);
    }
})

//
fileSelector.addEventListener("click", async () => {
    const path = await openFileApi.openFile();
    filePath.innerHTML += path;
})