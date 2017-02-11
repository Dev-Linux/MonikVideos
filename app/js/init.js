"use strict"

const remote = require('remote');
const utils = require('./js/utils');
const canvas = require('./js/canvas');
const save = require('./js/saveto');
const elements = require('./js/elements');
const math = require('./js/math');
const saveto = require('./js/saveto');

// default
var opacity = '.35';
var width = window.innerWidth;
var height = window.innerHeight;

var body = document.body;
var video = utils('.video-play');
var btn = utils('.btn-player');
var title = utils('.video-title');
var progress = utils('.video-progress');
var videoStart = utils('.video-start');
var videoDuration = utils('.video-duration');
var progressBar = utils('.progress-bar');
var thumbs = utils('#thumbs');
var areaThumbs = utils('.area-thumbs');
var btnVolume = utils('.btn-volume');
var appTitle = utils("title");

var videoURL = remote.getCurrentWindow().rendererSide.media;

var videoURL_ = videoURL.replaceAll('#', '%23');
var duration_ = 0;
video.src = videoURL_;
video.style.width = width + "px";
video.style.height = height + "px";

// content
var content = new elements('.content');
content.content_custom(width, height);
// buttons play/pause
var icone = new elements('.btn-player');
icone.icone_custom(width, height, '0.0');
// area of controls
var areacontrol = new elements('.area-control');
areacontrol.area_custom(width, height);


// title player
try {
    var barCount = videoURL.split('/').length;
    var nameFile = videoURL.split('/')[barCount - 1];

} catch(exception) {
    var nameFile = videoURL;
}

appTitle.innerHTML += " - " + utils.shortTitle(nameFile);
title.innerHTML = utils.shortTitle(nameFile);

// debug
//remote.getCurrentWindow().toggleDevTools();

utils.shortcuteClick(video, video, icone);
utils.shortcutedbClick(video, icone);
utils.shortcuteClick(video, btn, icone);
utils.shortcutedbClick(btn, icone);

areacontrol.element.addEventListener('mouseover', function() {
    var area_ = areacontrol.element.style;
    area_.transition = "0.3s";
    icone.element.style.transition = "0.3s";
    video.style.transition = "0.3s";

    area_.opacity = "100.0";
    icone.element.style.opacity = opacity;
    video.style.opacity = "0.25";
});

areacontrol.element.addEventListener('mouseleave', function() {
    var area_ = areacontrol.element.style;
    area_.transition = "1.0s";
    icone.element.style.transition = "1.0s";
    video.style.transition = "1.0s";

    area_.opacity = "0.0";
    icone.element.style.opacity = "0.0";
    video.style.opacity = "100.0";
});


video.addEventListener('ended', function() {
    video.click();
});

video.addEventListener('loadeddata', function() {

    video.volume = 0.5;
    duration_ = video.duration;
    videoDuration.innerHTML = math.gettime(duration_);

    setInterval(function() {
        videoStart.innerHTML = math.gettime(video.currentTime);
        progressBar.style.width = math.getPorcentage(video.currentTime, video.duration) + "%";

        if (parseInt(math.getPorcentage(video.currentTime, video.duration)) >= 99) {
            progressBar.style.borderRadius = "3px 3px 3px 3px";
        }
    }, 1000 / 60);

});

btnVolume.addEventListener('change', function() {

    video.volume = btnVolume.value;
    btnVolume.style.background = "#fff";

    if (btnVolume.value == 1.0) {
        btnVolume.style.background = "#0f0";
    }

    if (btnVolume.value == 0.0) {
        btnVolume.style.background = "#333";
    }
});

progress.addEventListener('click', function(e) {

    progressBar.style.borderRadius = "3px 0 0 3px";
    var ponto = math.getPointerX(progress, e);
    var porcent = math.getPorcentage(ponto, progress.offsetWidth);
    var atualTime = math.setPorcentage(porcent, video.duration);
    video.currentTime = atualTime;

});

var preview = true;

if (preview) {

    var temp_video = document.createElement('video');

    var dataCache = [];

    progress.addEventListener('mousemove', function(e) {

        var ponto = math.getPointerX(progress, e);

        if (dataCache[ponto] === undefined) {

            var porcent = math.getPorcentage(ponto, progress.offsetWidth);
            var atualTime = math.setPorcentage(porcent, duration_);
            temp_video.src = videoURL_ + "#t=" + atualTime.toString();

            areaThumbs.style.opacity = "100.0";

            temp_video.addEventListener('loadeddata', function() {
                dataCache[ponto] = canvas.dataURL(temp_video, 0, 0, 195, 130, 'jpeg', 0.5);
                thumbs.src = dataCache[ponto];
            });

        } else {
            thumbs.src = dataCache[ponto];
        }

        areaThumbs.style.left = ponto - (areaThumbs.offsetWidth / 2) + "px";
    });

    progress.addEventListener('mouseleave', function(e) {

        areaThumbs.style.opacity = "0.0";
        areaThumbs.style.left = "-999px";

    });

     areaThumbs.addEventListener('mouseover', function() {

        areaThumbs.style.opacity = "0.0";
        areaThumbs.style.left = "-999px";

     });
}

window.onresize = function() {

    video.style.transition = "0.0s";
    video.style.width = window.innerWidth + "px";
    video.style.height = window.innerHeight + "px";

    content.content_custom(window.innerWidth, window.innerHeight);
    areacontrol.area_custom(window.innerWidth, window.innerHeight);

    icone.element.style.transition = "1.5s";
    icone.icone_custom(window.innerWidth, window.innerHeight, opacity);

    setTimeout(function() {
        icone.element.style.opacity = "0.0";
    }, 1000);

}


document.addEventListener('dragenter', function(e) {
    e.preventDefault();
});

document.addEventListener('dragover', function(e) {
    e.preventDefault();
});

document.addEventListener('drop', function(e) {
    e.preventDefault();

    var file = e.dataTransfer.files[0];
    videoURL_ = file.path;
    video.src = videoURL_;

    // title player
    try {
        var barCount = videoURL_.split('/').length;
        var nameFile = videoURL_.split('/')[barCount - 1];

    } catch(exception) {
        var nameFile = videoURL_;
    }

    appTitle.innerHTML += " - " + utils.shortTitle(nameFile);
    title.innerHTML = utils.shortTitle(nameFile);
});