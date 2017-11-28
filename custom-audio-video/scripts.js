// Get the elements
const player = document.querySelector( '.player');
const video = player.querySelector( '.viewer' );
const progress = player.querySelector( '.progress' );
const progressBar = player.querySelector( '.progress__filled' );
const toggle = player.querySelector( '.toggle' );
const skipButtons = player.querySelectorAll( '[data-skip]' );
const ranges = player.querySelectorAll( '.player__slider' );
const toFullScreen = player.querySelector( '.player__fullscreenButton' );
const playButtonIcon = document.querySelector( '.playButtonIcon' );


// ----
// Setting up Functions
function togglePlay() {
    if ( video.paused ) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    if ( video.paused  ) {
        playButtonIcon.setAttribute('src', 'media-icons/play.svg');
    } else {
        playButtonIcon.setAttribute('src', 'media-icons/pause.svg')
    }
}

function skip() {
    video.currentTime += parseFloat( this.dataset.skip );
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = ( video.currentTime / video.duration ) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub( e ) {
    const scrubTime = ( e.offsetX / progress.offsetWidth ) * video.duration;
    video.currentTime = scrubTime;
}

let isFullScreen = false;
function toggleFullScreen() {
    if ( isFullScreen === false ) {
        console.log( 'Entering full screen mode... ' );
        player.classList.add('player__fullscreen');
        document.body.style.overflow = 'hidden';
        isFullScreen = true;
    } else {
        console.log( 'Now exiting full screen mode... ' );
        player.classList.remove('player__fullscreen');
        document.body.style.overflow = 'visible';
        isFullScreen = false;
    }
}

// ----
// Hook up event listeners
video.addEventListener( 'click', togglePlay );
video.addEventListener( 'play', updateButton );
video.addEventListener( 'pause', updateButton );
video.addEventListener( 'timeupdate', handleProgress );

toggle.addEventListener( 'click', togglePlay );

skipButtons.forEach( button => button.addEventListener( 'click', skip ));

ranges.forEach( range => range.addEventListener('change', handleRangeUpdate) );
ranges.forEach( range => range.addEventListener('mousemove', handleRangeUpdate) );


let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

toFullScreen.addEventListener( 'click', () => {
    toggleFullScreen(); 
});

player.addEventListener('keyup', function( e ) {
    if( e.keyCode == 27 ) {
        console.log( 'Now exiting full screen mode... ' );
        player.classList.remove('player__fullscreen');
        document.body.style.overflow = 'visible';
        isFullScreen = false;        
    } else {
        return;
    }
})
