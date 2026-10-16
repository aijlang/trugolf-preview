const heroVideo = document.querySelector('#hero-video');
const motionButton = document.querySelector('#video-toggle');

document.body.classList.add('hero-mode-autoplay');
heroVideo.defaultMuted = true;
heroVideo.muted = true;
heroVideo.playsInline = true;
heroVideo.autoplay = true;
heroVideo.playbackRate = 0.8;
let userPaused = false;
let playPending = false;
let playing = false;

function label() {
  const text = playing ? 'Pause motion' : userPaused || heroVideo.paused ? 'Play motion' : 'Loading motion…';
  motionButton.textContent = text;
  motionButton.setAttribute('aria-label', text);
}
function showPlayback() {
  // A cached video can already be playing before this script attaches listeners.
  if (!heroVideo.paused && heroVideo.readyState >= 2) {
    playing = true;
    heroVideo.classList.add('ready');
  }
  label();
}
async function startPlayback() {
  if (userPaused || playPending || heroVideo.error || document.hidden) return;
  if (!heroVideo.paused && heroVideo.readyState >= 3) {
    showPlayback();
    return;
  }
  playPending = true;
  try {
    await heroVideo.play();
    showPlayback();
  } catch {
    playing = false;
    label(); // Autoplay may be blocked; leave a working manual Play control.
  } finally {
    playPending = false;
  }
}
heroVideo.addEventListener('playing', showPlayback);
heroVideo.addEventListener('timeupdate', () => {
  showPlayback();
  if (heroVideo.currentTime >= 15) heroVideo.currentTime = 0;
});
for (const event of ['loadeddata', 'canplay']) {
  heroVideo.addEventListener(event, () => {
    showPlayback();
    startPlayback();
  });
}
heroVideo.addEventListener('pause', () => { playing = false; label(); });
heroVideo.addEventListener('waiting', () => { playing = false; label(); });
heroVideo.addEventListener('error', () => {
  playing = false;
  heroVideo.classList.remove('ready');
  motionButton.hidden = true;
});
motionButton.addEventListener('click', () => {
  if (heroVideo.paused || !playing) {
    userPaused = false;
    startPlayback();
  } else {
    userPaused = true;
    heroVideo.pause();
  }
});
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) startPlayback();
});
window.addEventListener('pageshow', () => { showPlayback(); startPlayback(); });
showPlayback();
startPlayback();
