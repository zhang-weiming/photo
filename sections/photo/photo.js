// 选择图片并显示
const { ipcRenderer } = require('electron');
const remote = require("electron").remote;
const dialog = remote.dialog;
const path = require('path')

// let btnSelectImg = document.getElementById('selectImg');
// let imgBox = document.getElementById('img-box');
// btnSelectImg.onclick = openDialog;
let imgSizeRadio = 1.0;
let originalSize = {
    width: 0,
    height: 0,
};

function openDialog() {
    let result = dialog.showOpenDialogSync(remote.getCurrentWindow(), {
        properties: ["openFile"],
        filters: [
            { name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif'] }
        ]
    })

    if (null == result || 0 == result.length)
        window.close();
    if (typeof result === "object") {
        const imgPath = result[0].replace(/\\/g,"/");
        document.body.style.backgroundImage = "url(" + imgPath + ")";

        // 根据图片大小，设置窗口大小
        setWindowSize(imgPath);
        window.onresize = resizeWindow;
        // imgBox.onload = function() {
        //     OnLoadFinish();
        // };
    }
}

openDialog();

function setWindowSize(imgPath) {

    let img = new Image();
    img.src = imgPath;
    img.onload = function() {
        // alert(img.width + ', ' + img.height);
        window.resizeTo(img.width, img.height); 
        let mainDiv = document.getElementById("main");
        mainDiv.style.width = img.width + 'px';
        mainDiv.style.height = img.height + 'px';

        imgSizeRadio = window.outerWidth / window.outerHeight;
        originalSize.width = window.outerWidth;
        originalSize.height = window.outerHeight;
    }
}

function resizeWindow() {
    let newWidth = 0, newHeight = 0;
    if (window.outerWidth == originalSize.width) {
        newWidth = window.outerWidth;
        newHeight = window.outerWidth / imgSizeRadio;
    }
    else {
        newWidth = window.outerHeight * imgSizeRadio;
        newHeight = window.outerHeight;
    }
    
    originalSize.width = newWidth;
    originalSize.height = newHeight;

    window.resizeTo(newWidth, newHeight);
    let mainDiv = document.getElementById("main");
    mainDiv.style.width = newWidth + 'px';
    mainDiv.style.height = newHeight + 'px';
}

let toolArea = document.getElementById('tools');
let deleteIcon = document.getElementById('delete');
toolArea.onmouseover = function() {
    deleteIcon.style.display = "inline";
};
toolArea.onmouseout = function() {
    deleteIcon.style.display = "none";
};
