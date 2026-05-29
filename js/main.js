const header = document.querySelector('.site-header');
const burger = document.querySelector('.site-burger');
const navLinks = document.querySelectorAll('.site-nav a');
if (header && burger) {
  burger.addEventListener('click', () => {
    const isOpen = header.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.classList.toggle('is-locked', isOpen);
  });
  navLinks.forEach((link) => link.addEventListener('click', () => {
    header.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-locked');
  }));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      header.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('is-locked');
    }
  });
}

const albumsData = [
  {
    title: "Fall Of The Risen",
    year: "2026",
    cover: "https://f4.bcbits.com/img/a0369548261_2.jpg",
    songs: [
      { title: "Last Breath", duration: "04:45", lyricsKey: "lastBreath" },
      { title: "Fallen Dolls Home", duration: "03:32", lyricsKey: "fallenDollsHome" },
      { title: "Hope For Tomorrow", duration: "03:54", lyricsKey: "hopeForTomorrow" },
      { title: "Kingdom Of The Unfaced", duration: "04:00", lyricsKey: "kingdomOfTheUnfaced" },
      { title: "Asylumed", duration: "02:30", lyricsKey: "asylumed" },
      { title: "Inside Paranoia", duration: "05:14", lyricsKey: "insideParanoia" },
      { title: "Infeared", duration: "02:02", lyricsKey: "infeared" },
      { title: "Quet Calm", duration: "01:13", lyricsKey: "quetCalm" }
    ]
  },
  {
    title: "Asylumed feat. Max Space",
    year: "2026",
    cover: "https://f4.bcbits.com/img/a0151109470_2.jpg",
    songs: [
      { title: "Asylumed", duration: "02:31", lyricsKey: "asylumed" }
    ]
  },
  {
    title: "Extreme Invasion Live",
    year: "2025",
    cover: "https://f4.bcbits.com/img/a0854022618_2.jpg",
    songs: [
      { title: "Beyond", duration: "01:34", lyricsKey: "beyond" },
      { title: "Last Breath", duration: "05:02", lyricsKey: "lastBreath" },
      { title: "Hope For Tomorrow", duration: "04:04", lyricsKey: "hopeForTomorrow" },
      { title: "Fallen Dolls Home", duration: "04:23", lyricsKey: "fallenDollsHome" },
      { title: "Kingdom Of The Unfaced", duration: "04:25", lyricsKey: "kingdomOfTheUnfaced" },
      { title: "Inside Paranoia", duration: "05:35", lyricsKey: "insideParanoia" },
      { title: "Asylumed", duration: "02:21", lyricsKey: "asylumed" }
    ]
  },
  {
    title: "Hope For Tomorrow [Single]",
    year: "2025",
    cover: "https://f4.bcbits.com/img/a4225162547_2.jpg",
    songs: [
      { title: "Hope For Tomorrow", duration: "03:27", lyricsKey: "hopeForTomorrow" }
    ]
  },
  {
    title: "Last Breath [Single]",
    year: "2024",
    cover: "https://f4.bcbits.com/img/a2736365349_2.jpg",
    songs: [
      { title: "Last Breath", duration: "04:17", lyricsKey: "lastBreath" }
    ]
  },
  {
    title: "Dying Sun",
    year: "2017",
    cover: "https://f4.bcbits.com/img/a2995812742_2.jpg",
    songs: [
      { title: "Dying Sun", duration: "03:06", lyricsKey: "dyingSun" }
    ]
  },
  {
    title: "The Gates Of Babylon",
    year: "2017",
    cover: "https://f4.bcbits.com/img/a0431324215_2.jpg",
    songs: [
      { title: "The Gates Of Babylon", duration: "04:32", lyricsKey: "gatesOfBabylon" }
    ]
  }
];
const albumsGrid = document.querySelector('#albumsGrid');
const songsList = document.querySelector('#songsList');
const activeCover = document.querySelector('#activeCover');
const coverStage = document.querySelector('#coverStage');
const activeTitle = document.querySelector('#activeAlbumTitle');
const activeMeta = document.querySelector('#activeAlbumMeta');
const counter = document.querySelector('#albumCounter');
const prevButton = document.querySelector('#albumPrev');
const nextButton = document.querySelector('#albumNext');
let activeAlbumIndex = 0;
const padNumber = (num) => String(num).padStart(2, '0');
function getSongLyrics(song) {
  const lyricsDatabase = window.EGOCIDE_LYRICS || {};
  return lyricsDatabase[song.lyricsKey] || "Текст песни пока не добавлен.";
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function eyeIcon(){return `<svg class="song__eye" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 5C6.5 5 2.2 8.7 1 12c1.2 3.3 5.5 7 11 7s9.8-3.7 11-7c-1.2-3.3-5.5-7-11-7Zm0 11.5A4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 0 1 0 9Zm0-2A2.5 2.5 0 1 0 12 9.5a2.5 2.5 0 0 0 0 5Z"></path></svg>`}
function renderAlbumsGrid(){
  if(!albumsGrid) return;
  albumsGrid.innerHTML = albumsData.map((album,index)=>`<button class="albums__thumb ${index===activeAlbumIndex?'is-active':''}" type="button" data-index="${padNumber(index+1)}" data-album-index="${index}" aria-label="Open ${album.title}"><img src="${album.cover}" alt="${album.title}"></button>`).join('');
  albumsGrid.querySelectorAll('.albums__thumb').forEach((button)=>button.addEventListener('click',()=>setActiveAlbum(Number(button.dataset.albumIndex))));
}
function renderSongs(album){
  if(!songsList) return;
  songsList.innerHTML = album.songs.map((song,index)=>`<article class="song"><div class="song__top"><div class="song__num">${padNumber(index+1)}</div><div class="song__main"><h4 class="song__title">${song.title}</h4><p class="song__duration">${song.duration}</p></div><button class="song__btn" type="button">${eyeIcon()}<span>Текст</span></button></div><div class="song__lyrics"><div class="song__lyrics-inner"><p class="song__lyrics-text">${escapeHtml(getSongLyrics(song))}</p></div></div></article>`).join('');
  songsList.querySelectorAll('.song__btn').forEach((button)=>button.addEventListener('click',()=>{const song=button.closest('.song');song.classList.toggle('is-open');button.querySelector('span').textContent=song.classList.contains('is-open')?'Скрыть':'Текст';}));
}
function setActiveAlbum(index){
  if(!albumsGrid||!songsList||!activeCover||!activeTitle||!activeMeta||!counter||!coverStage) return;
  activeAlbumIndex = index < 0 ? albumsData.length - 1 : index >= albumsData.length ? 0 : index;
  const album = albumsData[activeAlbumIndex];
  coverStage.classList.remove('is-switching'); void coverStage.offsetWidth; coverStage.classList.add('is-switching');
  activeCover.style.backgroundImage = `url("${album.cover}")`;
  activeTitle.textContent = album.title;
  activeMeta.textContent = `${album.year} / ${album.songs.length} ${album.songs.length === 1 ? 'track' : 'tracks'}`;
  counter.textContent = `${padNumber(activeAlbumIndex+1)} / ${padNumber(albumsData.length)}`;
  renderAlbumsGrid(); renderSongs(album);
}
if(prevButton) prevButton.addEventListener('click',()=>setActiveAlbum(activeAlbumIndex-1));
if(nextButton) nextButton.addEventListener('click',()=>setActiveAlbum(activeAlbumIndex+1));
setActiveAlbum(0);

const galleryPhotos = [
  'assets/images/gallery/1.jpg',
  'assets/images/gallery/2.jpg',
  'assets/images/gallery/3.jpg',
  'assets/images/gallery/4.jpg',
  'assets/images/gallery/5.jpg',
  'assets/images/gallery/6.jpg',
  'assets/images/gallery/7.jpg',
  'assets/images/gallery/8.jpg',
  'assets/images/gallery/9.jpg',
  'assets/images/gallery/10.jpg',
  'assets/images/gallery/11.jpg',
  'assets/images/gallery/12.jpg',
  'assets/images/gallery/13.jpg',
  'assets/images/gallery/14.jpg',
  'assets/images/gallery/15.jpg',
  'assets/images/gallery/16.jpg',
  'assets/images/gallery/17.jpg',
  'assets/images/gallery/18.jpg',
  'assets/images/gallery/19.jpg',
  'assets/images/gallery/20.jpg',
  'assets/images/gallery/21.jpg',
  'assets/images/gallery/22.jpg',
  'assets/images/gallery/23.jpg',
  'assets/images/gallery/24.jpg',
  'assets/images/gallery/25.jpg',
  'assets/images/gallery/26.jpg'
];
const galleryGrid = document.querySelector('#galleryGrid');
const galleryButton = document.querySelector('#galleryLoadMore');
let visibleGalleryCount = 0;
function renderGallery(){
  if(!galleryGrid||!galleryButton) return;
  galleryGrid.innerHTML = galleryPhotos.slice(0,visibleGalleryCount).map((src,index)=>`<a class="gallery__item" href="${src}" target="_blank" rel="noopener" style="animation-delay:${Math.min(index*45,500)}ms"><img src="${src}" alt="Egocide concert photo ${index+1}" loading="lazy"></a>`).join('');
  galleryButton.classList.toggle('is-hidden',visibleGalleryCount>=galleryPhotos.length);
}
function loadMoreGallery(){visibleGalleryCount = visibleGalleryCount===0 ? 4 : Math.min(visibleGalleryCount+8,galleryPhotos.length);renderGallery();}
if(galleryButton){galleryButton.addEventListener('click',loadMoreGallery);loadMoreGallery();}

/* Hero flashlight */

const hero = document.querySelector('.hero');
const flashlight = document.querySelector('.hero__flashlight');

if (hero && flashlight) {
  hero.addEventListener('mousemove', (event) => {
    flashlight.style.left = `${event.clientX}px`;
    flashlight.style.top = `${event.clientY}px`;
  });

  hero.addEventListener('mouseenter', () => {
    flashlight.style.opacity = '0.92';
  });

  hero.addEventListener('mouseleave', () => {
    flashlight.style.opacity = '0';
  });
}
/* About read more */

const aboutHistory = document.querySelector('#aboutHistory');
const aboutHistoryButton = document.querySelector('.about-history__button');

if (aboutHistory && aboutHistoryButton) {
  aboutHistoryButton.addEventListener('click', () => {
    const isExpanded = aboutHistory.classList.toggle('is-expanded');

    aboutHistoryButton.textContent = isExpanded ? 'Свернуть' : 'Читать полностью';
    aboutHistoryButton.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
  });
}