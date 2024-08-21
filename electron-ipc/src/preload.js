// preload.js will be used to give the renderer processes access to functions from the node modules

const { contextBridge, ipcRenderer } = require("electron")

// used for find version numbers of node, chrome, and electron which will be used for the first thing in the app.
contextBridge.exposeInMainWorld("versions", {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
})

// triggered by onClick for submit button, gives main the url and the command to create a new window that opens the url
contextBridge.exposeInMainWorld("openNewWindow", {
    openUrl: (url) => {
        ipcRenderer.send("openUrl", url)
    }
})

contextBridge.exposeInMainWorld("openFileApi", {
    openFile: ()=>{
        return ipcRenderer.invoke("open-file");
    }
})