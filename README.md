# ElectronPractice
Designed to be a place to store all of the Electron projects that I create in one repo.

## Finished:

### 1. electron-ipc
A platform for me to simply learn more about IPC, which allows the main and renderer processes of Electron to communicate, allowing the renderer processes access to node.js modules.
Run using 'npm start'

### 2. electron-hello-world
The very first project I've done using electron, which is a simple calculator. Very poorly named.
run using 'npx electronmon .'

### 3. screen-recorder
The second project I've done. Had to put a break in it to understand more about preload.js and bridging to allow Electron functions into the renderer.js file.
Also put a break in it because of the way that I've originally set this up, causing issues with git. Most likely had to do with using forge to create the Electron app.
run using 'npx electronmon .'

### 4. image-resizer-electron
An app that allows people to resize images to any dimension.
run using 'npx electronmon .'

### 5. timer-app
An app that acts as a timer, that can be overlayed (Do CommandOrControl+6 on keyboard to enable Overlay Mode) onto your screen. Uses electron-vite, Tailwind, and React.
run using 'npm run dev'
Is packaged into an executable, double click to run dist/win-unpacked/timer-app-1.0.0-setup.exe to setup the app, and run through the shortcut automatically created on your desktop.

### 6. super-browser
An app that works like a browser that always stays on top of other elements on your screen. Built using Electron Forge and the Vite plugin.
Run using 'npm start'

## Ideas:

### 7. Type-Racer (In Progress)
An app that works like type racer to scan wpm calculated on (amount of characters pressed correctly / 5).
Run using 'npm run dev'

### 8. Spotify Monthly Listener Game
An app that works like Higher Or Lower game, but shows artists and their monthly listeners.

### 9. Discord "Who sent that message" game Bot
A Discord bot that I can ask to play "Who sent the message", in which the Bot simply sends a random message from the chat's history without the name, and people have to guess who it is.

### 10. Typewriter Effect
An app that allows you to paste code into an input, to which it would generate a video of that same stuff being written character by character.