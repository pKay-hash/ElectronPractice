const form = document.querySelector("#img-form");
const img = document.querySelector("#img");
const outputPath = document.querySelector("#output-path");
const filename = document.querySelector("#filename");
const heightInput = document.querySelector('#height');
const widthInput = document.querySelector('#width');

//loads the inputted image and its details (dimensions and actual image data)
function loadImage(e) {
    const file = e.target.files[0];
    if(!isFileImage(file)){
        alertError('Please Choose an Image');
        return;
    }
    //get dimensions of inputted picture
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = function () {
        widthInput.value = this.width;
        heightInput.value = this.height;
    }

    //display the form for resizing process
    form.style.display = 'block';
    filename.innerText = file.name; //shows the name of the original file
    outputPath.innerText = path.join(os.homedir(), 'imageresizer'); //shows where the resized picture will output
}

//sends image data to main
function sendImage(e) {
    e.preventDefault();

    const width = widthInput.value;
    const height = heightInput.value;
    const imgPath = img.files[0].path;

    //makes sure image is uploaded
    if(!img.files[0]){
        alertError('Please upload an image');
        return;
    }

    //checks if form inputs (width and height) are inputted
    if(width === '' || height === ''){
        alertError('Width and Height inputs are required');
        return;
    }

    //send to main (ipcRenderer)
    ipcRenderer.send('image:resize', {
        imgPath,
        width,
        height,
    });


}

// Executed when image is done resizing (image:done event)
ipcRenderer.on('image:done', () => {
    alertSuccess(`Image resized to ${widthInput.value} x ${heightInput.value}`);
})

// Make sure file provided is an image
function isFileImage(file) {
    const acceptedImageTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/jpg'];
    return file && acceptedImageTypes.includes(file['type']);
} 

function alertError(message) {
    Toastify.toast({
        text: message,
        duration: 5000,
        close: false,
        style: {
            background: 'red',
            color: 'white',
            textAlign: 'center',
        }
    });
}

function alertSuccess(message) {
    Toastify.toast({
        text: message,
        duration: 5000,
        close: false,
        style: {
            background: 'green',
            color: 'white',
            textAlign: 'center',
        }
    });
}

img.addEventListener('change', loadImage);
form.addEventListener('submit', sendImage);