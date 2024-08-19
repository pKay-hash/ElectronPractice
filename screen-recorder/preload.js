const { Buffer } = require('buffer');
const { ipcRenderer, contextBridge } = require('electron');
const remote = require('@electron/remote');
const {dialog} = remote;
const { writeFile } = require('fs');
contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
});

contextBridge.exposeInMainWorld('electronAPI', {
    getVideoSources: () => ipcRenderer.invoke('get-video-sources'),
    showContextMenu: (template) => {
        const { Menu } = remote;
        const videoOptionsMenu = Menu.buildFromTemplate(template);
        videoOptionsMenu.popup();
    },
    writeFile: async (arrayBuffer) => {
        const buffer = Buffer.from(arrayBuffer);
        const { filePath } = await dialog.showSaveDialog({
            buttonLabel: 'Save Video',
            defaultPath: `vid-${Date.now()}.webm`
        });
        writeFile(filePath, buffer, () => console.log('SAVED RECORDING'));
    },
});