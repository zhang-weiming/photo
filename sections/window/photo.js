// 选择图片并显示
const { ipcRenderer } = require('electron');
const remote = require("electron").remote;
const dialog = remote.dialog;

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
    if (typeof result === "object") {
        // console.log("Selected file paths:")
        // console.log(result)
        // imgBox.src = result[0];
        document.body.style.backgroundImage = "url(" + result[0] + ")";
    }

    // 根据图片大小，设置窗口大小
    setWindowSize(result[0]);
    window.onresize = resizeWindow;
    // imgBox.onload = function() {
    //     OnLoadFinish();
    // };
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

document.body.onclick = function() {
    let toolIcon = document.getElementById('tool');
    if (toolIcon.style.display == "none") {
        toolIcon.style.display = "inline";
    }
    else {
        toolIcon.style.display = "none";
    }
}

// window.addEventListener("DOMContentLoaded", OnLoadFinish);
// function OnLoadFinish(path) {
//     let realSize = GetRealSize(path);
//     // alert(realSize);
//     console.log("realSize", realSize);
//     // window.resizeTo(realSize.width, realSize.height); 
// }
// function GetRealSize(path) {
//     //获取 DOM，之后便可以获取其宽高
//     //注意，如果宽高是 100px 这种字符串，需要手动将其搞成 Number。
//     let img = new Image();
//     img.src = path;
//     let w = img.width;
//     let h = img.height;
//     if (typeof (w) == "string") {
//         w = parseInt(w.split("px")[0]);
//         h = parseInt(h.split("px")[0]);
//     }
//     return {
//         width: w,
//         height: h
//     }
// }