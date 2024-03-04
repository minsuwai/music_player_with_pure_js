const musicContainer = document.getElementById( 'music-container' );
const playBtn = document.getElementById( 'play' );
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById( 'progress-container' );
const title = document.getElementById('title');
const cover = document.getElementById( 'cover' );

// Song Titles
const songs = ['littleidea', 'jazzyfrenchy', 'ukulele'];

// Keep track of song
let songIndex = 2;

// Load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    document.getElementById('music-cover').src = `img/${song}.jpg`; // Change cover image
}



// Play Song
function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector('i.fas').classList.remove("fa-play");
    playBtn.querySelector('i.fas').classList.add("fa-pause");

    audio.play();
}

// Pause song
function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector('i.fas').classList.add("fa-play");
    playBtn.querySelector('i.fas').classList.remove("fa-pause");

    audio.pause();
}

// Previous song
function prevSong() {
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);

    playSong();
}

// Next song
function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);

    playSong();
}

/// Update Progress bar
function updateProgress(e) {
    console.log("Update progress function called");
    const { duration, currentTime } = e.target;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Set Progress bar
function setProgress(e) {
    console.log("Set progress function called");
    const width = this.clientWidth;
    const clickX = e.offsetX;
    console.log("Width:", width);
    console.log("ClickX:", clickX);
    const duration = audio.duration;

    const newTime = (clickX / width) * duration;
    console.log("New Time:", newTime);

    audio.currentTime = newTime;
}


// Event Listener
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener( 'click' , nextSong ); 

//Time&song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);