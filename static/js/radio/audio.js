//Initialise audio stuff
let audio = document.getElementById('stream');
let audioMp3 = document.getElementById('streamMP3');
let audioOpus = document.getElementById('streamOPUS');
let audioAAC = document.getElementById('streamAAC');
let isOn = false;
let bottomVis = false;

let curEp = 'Subcity Radio Live';
let curEpLink = '/live';
let curShow = 'fantasy snack channel';
let curShowLog = 'fantasysnack';


let footerPlayer = document.getElementById("footer_player");
let footerNowPlaying = document.getElementById("footer_nowPlaying");
let playButton = document.getElementById("play-button");
let footerForwardButton = document.getElementById("footer-forward");
let footerRewindButton = document.getElementById("footer-rewind");


let footerScrubContainer = document.getElementById("footer_scrubCont");
let footerVolContainer = document.getElementById("footer_volCont");
let footerVolIn = document.getElementById("footer_volIn");
let footerTimeIn = document.getElementById("footer_timeIn");
let footerTimeOut = document.getElementById("footer_timeOut");
let footerProgressBar = document.getElementById("footer_scrubIn");
let footerBufferBar = document.getElementById("footer_scrubBuffer");
let muteButton = document.getElementById("mute_toggle");

const playIcon = `<i class="fa fa-play"></i>`;
const pauseIcon = `<i class="fa fa-pause"></i>`;
const ellipsisIcon = `<i class="fa fa-ellipsis-h"></i>`;

let mouseDown = 0;
document.body.onmousedown = function () {mouseDown = 1;};
document.body.onmouseup = function () {mouseDown = 0;};


playButton.addEventListener("click", togglePlayer);

let playLive = function () {
    if (!audio.paused) pauseStream();
    // audioMp3.src = '//stream.subcity.org/subcity.mp3';
    // audioOpus.src = '//stream.subcity.org/subcity.ogg';
    // audioAAC.src = '//opus stream;
    //audioMp3.src = 'https://storage.googleapis.com/subcity-relisten-1718/selfimprovement/selfimprovement-201802232200-320k.mp3';
    // audioOgg.src = 'https://stream.subcity.org/subcity.ogg';
    audioMp3.title = audioOpus.title = audioAAC.title = 'Subcity Radio // Live';
    audio.load();
    isOn = true;

    playStream();
};

let playRelisten = function(){
    // audioMp3.src
    // audioOgg.src
    // audioOpus.src

    audio.load();
    isOn = true;

    playStream();

};

let playStream = function () {
    // add the now playing info to the player.
    let html_trackInfo = `<a href="${curEpLink}" l="${curEp}"
               class="epName slideWhite" style="color: #FFF!important;">
                          ${curEp}
                      </a> // <a href="/shows/${curShowLog}"
                                    l="${curShow}"
                                    style="color: #CCC!important;"
                                    class="showName slideGrey">${curShow}</a>`;
    footerNowPlaying.innerHTML = html_trackInfo;
    //console.log("now playing");
    audio.play();
    playButton.innerHTML = ellipsisIcon;
    if (curShow === 'BRB') return;
    ga('send', 'event', 'epplay', curEpLink);
    ga('send', 'event', 'showplay', curShow);
};

let pauseStream = function () {
    audio.pause();
    playButton.innerHTML = playIcon;
};

let playPauseStream = function () {
    if (!isOn) {
        audio.load();
        isOn = true;
        playButton.innerHTML = pauseIcon;
    }
    if (!audio.paused) {
        pauseStream();
    } else {
        playStream();
    }
};

/*
PLAYER CONTROLS
*/

function togglePlayer() {
    if (bottomVis === false) {
        footerPlayer.style.visibility = "visible";
        footerPlayer.classList.add('fadeInUp');
        footerPlayer.classList.remove('fadeOutDown');
        bottomVis = true;
        playLive();
    } else if (bottomVis === true) {
        footerPlayer.classList.remove('fadeInUp');
        footerPlayer.classList.add('fadeOutDown');
        // TODO : fix this so it fades out properly
        bottomVis = false;
    }
    //playLive();
}

audio.addEventListener('playing', function () {
    playButton.innerHTML = pauseIcon;
    footerTimeOut.innerHTML = formatTime(audio.duration)
});

audio.addEventListener("timeupdate", function () {
    if (curEpLink === "/schedule") {
        footerTimeIn.innerHTML = "LIVE";
        footerTimeOut.innerHTML = "LIVE";
    }
    // var progress = $("#footer_scrubIn");
    // var buffer = $("#footer_scrubBuffer");
    let value = 0;

    if (audio.duration === 'Infinity') {
        value = 1;
        buffered = 1
    } else if (audio.currentTime > 0) {
        value = audio.currentTime / audio.duration;
        buffered = audio.buffered.end(audio.buffered.length - 1) / audio.duration;
    }

    //set the width of the progress bar

    footerProgressBar.style.width = Math.floor(footerScrubContainer.offsetWidth * (value)) + 'px';
    footerBufferBar.style.width = Math.floor(footerScrubContainer.offsetWidth * (buffered)) + 'px';

    if (audio.duration === 'Infinity') {
        footerTimeIn.innerHTML = "LIVE";
        footerRewindButton.style.visibility = "hidden";
        footerForwardButton.style.visibility = "hidden";
        // $('#footer_rewind').hide();
        // $('#footer_forward').hide();
    } else {
        footerTimeIn.innerHTML = formatTime(audio.currentTime);
        footerTimeOut.innerHTML = formatTime(audio.duration);
        footerRewindButton.style.visibility = "visible";
        footerForwardButton.style.visibility = "visible";
        // $('#footer_timeIn').html(formatTime(audio.currentTime));
        // $('#footer_rewind').show();
        // $('#footer_forward').show();
    }
}, false);

function formatTime(seconds) {
    minutes = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
}

// handle track scrubbing
footerScrubContainer.onmousemove = footerScrubContainer.onmouseup = function (e) {
    if (curEpLink == "/schedule") return;
    if (mouseDown) {
        parentOffsetLeft = footerScrubContainer.parentElement.offsetLeft;
        relX = e.pageX - parentOffsetLeft - 10;
        audio.currentTime =  Math.floor(audio.duration * (relX / footerScrubContainer.offsetWidth));;
    }
};

// handle adjusting volume ui
footerVolContainer.onmousemove = footerVolContainer.onmouseup = function (e) {
    if (mouseDown) {
        relX = e.pageX - footerVolContainer.parentElement.offsetLeft - 10;
        value = relX / footerVolContainer.offsetWidth;
        audio.volume = value;
        footerVolIn.style.width = `${value * 100}%`;
    }
};

// handle the muting hint when mouse is over the volume control speaker icon*/
muteButton.onmouseenter = function (ev) { muteButton.className = "fa fa-volume-off"; };
muteButton.onmouseleave = function (ev) { muteButton.className = "fa fa-volume-down"; };

// handle the muting functionality

// to return the volume bar size to the original state after unmuting
let previousVolumeBarSize = 5;
muteButton.onclick = function (ev) {
    if (audio.muted === false) {
        audio.muted = true;
        previousVolumeBarSize = footerVolIn.offsetWidth;
        footerVolIn.style.width = 0;
        muteButton.className = "fa fa-volume-off";
    } else if (audio.muted === true) {
        audio.muted = false;
        restoreSize = ((previousVolumeBarSize / 80) * 100).toString() + "%";
        footerVolIn.style.width = restoreSize;
        muteButton.className = "fa fa-volume-down";
        previousVolumeBarSize = 0;
    }};

//handle rewind and fast-forward
let rewindStream = function () { audio.currentTime -= 15; };
let forwardStream = function () {audio.currentTime += 15; };



