const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("play");
const pauseIcon = document.getElementById("pause");
const progressBar = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume-slider");

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
    } else {
        audio.pause();
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
    }
}

function audioStop() {
    audio.pause();
    audio.currentTime = 0;
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
}

audio.addEventListener("timeupdate", () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.value = progressPercent;

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds < 10 ? "0" : ""}${currentSeconds}`;
    durationEl.textContent = `${durationMinutes}:${durationSeconds < 10 ? "0" : ""}${durationSeconds}`;
});

progressBar.addEventListener("input", () => {
    const duration = audio.duration;
    audio.currentTime = (progressBar.value / 100) * duration;
});

volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});

window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
    }
    if (e.code === "ArrowUp") {
        e.preventDefault();
        audio.volume = Math.min(1, audio.volume + 0.1);
        volumeSlider.value = audio.volume;
    }
    if (e.code === "ArrowDown") {
        e.preventDefault();
        audio.volume = Math.max(0, audio.volume - 0.1);
        volumeSlider.value = audio.volume;
    }
});