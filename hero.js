const heroVideo=document.querySelector('#hero-video');
const motionButton=document.querySelector('#video-toggle');
document.body.classList.add('hero-mode-autoplay');
heroVideo.muted=true;
heroVideo.autoplay=true;
heroVideo.playbackRate=0.8;
function label(){motionButton.textContent=heroVideo.paused?'Play motion':'Pause motion';motionButton.setAttribute('aria-label',motionButton.textContent);}
heroVideo.addEventListener('loadeddata',()=>{heroVideo.classList.add('ready');heroVideo.play().catch(label);});
heroVideo.addEventListener('playing',label);
heroVideo.addEventListener('pause',label);
heroVideo.addEventListener('timeupdate',()=>{if(heroVideo.currentTime>=15)heroVideo.currentTime=0;});
heroVideo.addEventListener('error',()=>{heroVideo.classList.remove('ready');motionButton.hidden=true;});
motionButton.addEventListener('click',()=>{if(heroVideo.paused)heroVideo.play().catch(label);else heroVideo.pause();});
heroVideo.play().catch(label);
