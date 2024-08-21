import './index.css';

// Buttons
const backButton = document.getElementById("back-button");
const forwardButton = document.getElementById("forward-button");
const reloadButton = document.getElementById("reload-button");
const searchButton = document.getElementById("search-button");
const newWindowButton = document.getElementById("new-window-button");
const goButton = document.getElementById("go-button");

// URL Input Field
const urlInputField = document.getElementById("url-input");

// Webview
const webview = document.getElementById("webview");
let url = "";

// Waits for enter to be pressed with the urlInputField focused to go to the URL.
urlInputField.addEventListener("keydown", (event) => {
    if(event.key==="Enter") {
        event.preventDefault();
        handleUrl();
    }
});
if(!url) {
    url="https://www.google.com/";
    webview.src = url;
    urlInputField.value = url;
}

// when Go Button is clicked, go to the URL.
goButton.addEventListener("click", (event) => {
    event.preventDefault();
    handleUrl();
});

// when search button is clicked, go to Google.com
searchButton.addEventListener("click", () => {
    url = "https://www.google.com/";
    urlInputField.value=url;
    webview.src = url;
});


backButton.addEventListener("click", () => {
    webview.goBack();
})

forwardButton.addEventListener("click", () => {
    webview.goForward();
})

reloadButton.addEventListener("click", () => {
    webview.reload();
})
//updates urlInputField when navigating from website to website
webview.addEventListener('did-navigate', (event)=> {
    url = event.url;
    urlInputField.value = url;

})

newWindowButton.addEventListener("click", () => {
    api.newWindow();
})

// function that actually changes the 'src' class of the webview element in the html
// to be able to actually access the webpage.
function handleUrl() {
    let url = "";
    const inputUrl = urlInputField.value;
    if(inputUrl.startsWith("http://") || inputUrl.startsWith("https://")){
        url = inputUrl;
    } else {
        url = "http://" + inputUrl;
    }

    webview.src = url;
}