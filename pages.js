const pageMenu=document.querySelector('.menu');pageMenu.addEventListener('click',()=>{const open=document.querySelector('.nav').classList.toggle('open');pageMenu.setAttribute('aria-expanded',String(open));pageMenu.textContent=open?'Close':'Menu';});
const rangeFilm=document.querySelector('#range-film');if(rangeFilm){const control=document.querySelector('#range-motion');let pausedByUser=false;rangeFilm.addEventListener('playing',()=>{rangeFilm.classList.add('ready');control.textContent='Pause motion';control.setAttribute('aria-label','Pause RANGE video');});rangeFilm.addEventListener('pause',()=>{control.textContent='Play motion';control.setAttribute('aria-label','Play RANGE video');});control.addEventListener('click',()=>{pausedByUser=!rangeFilm.paused;if(rangeFilm.paused)rangeFilm.play().catch(()=>{});else rangeFilm.pause();});rangeFilm.addEventListener('error',()=>{control.hidden=true;rangeFilm.classList.remove('ready');});new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting&&!pausedByUser)rangeFilm.play().catch(()=>{});else rangeFilm.pause();});},{threshold:.1}).observe(document.querySelector('#range'));}
document.querySelectorAll('.arcade-live-film').forEach(video=>{
 const control=video.parentElement.querySelector('.arcade-film-toggle');let manuallyPaused=false;let pending=false;
 video.defaultMuted=true;video.muted=true;video.playsInline=true;
 const sync=()=>{const active=!video.paused&&video.readyState>=3;control.textContent=active?'Pause motion':'Play motion';control.setAttribute('aria-label',(active?'Pause':'Play')+' '+(video.dataset.videoName||'MultiSport ARCADE')+' video');};
 const play=async()=>{if(manuallyPaused||pending||document.hidden)return;pending=true;try{await video.play();}catch{}finally{pending=false;sync();}};
 for(const event of ['playing','pause','waiting','error'])video.addEventListener(event,sync);
 video.addEventListener('canplay',()=>{sync();play();});
 control.addEventListener('click',()=>{if(video.paused){manuallyPaused=false;play();}else{manuallyPaused=true;video.pause();}});
 new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting)play();else video.pause();}},{threshold:.1}).observe(video);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&video.getBoundingClientRect().bottom>0&&video.getBoundingClientRect().top<innerHeight)play();});
 sync();
});
const connectFilm=document.querySelector("#connect-film");if(connectFilm){new IntersectionObserver(entries=>{if(entries[0].isIntersecting)connectFilm.play().catch(()=>{});else connectFilm.pause();},{threshold:.1}).observe(document.querySelector("#e6-connect"));}
