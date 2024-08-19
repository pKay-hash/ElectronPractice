const videoElement = document.querySelector('video');
const strtBtn = document.getElementById('strtBtn');
const stpBtn = document.getElementById('stpBtn');
const vidSlctBtn = document.getElementById('vidSlctBtn');

vidSlctBtn.onclick = getVideoSources;

async function getVideoSources() {
    const inputSources = await window.electronAPI.getVideoSources();
    const videoOptionsMenuTemplate = inputSources.map(source => {
        return {
            label: source.name,
            click: () => selectSource(source)
        };
    });   
    window.electronAPI.showContextMenu(videoOptionsMenuTemplate); 
}

let mediaRecorder; //MediaRecorder instance to actually capture the footage
const recordedChunks = [];

async function selectSource(source){
    vidSlctBtn.innerText=source.name;

    const constraints = {
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: source.id
            }
        }
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement.srcObject = stream;
    videoElement.play();

    // Create Media Recorder
    const options = { mimeType: 'video/webm; codecs=vp9'};
    mediaRecorder = new MediaRecorder(stream, options);

    // Event Handlers
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.onstop = handleStop;
    
}



function handleDataAvailable(e) {
    console.log('RECORDING');
    recordedChunks.push(e.data);
    
}

//saves when stop is clicked
async function handleStop(e) {
    const blob = new Blob(recordedChunks, {
        type: 'video/webm; codecs=vp9'
    });

    const buffer = await blob.arrayBuffer();
    window.electronAPI.writeFile(buffer);
}

strtBtn.onclick = e => {
    mediaRecorder.start();
    strtBtn.classList.add('is-danger');
    strtBtn.innerText = 'Recording';
};

stpBtn.onclick = e => {
    mediaRecorder.stop();
    strtBtn.classList.remove('is-danger');
    strtBtn.innerText = 'Start';
};