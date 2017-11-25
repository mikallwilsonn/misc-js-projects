// -------- Scripts for Photo Fun

const inputs = document.querySelectorAll( '.controls .control input' );
const image = document.querySelector( 'img' );
const seeOriginal = document.querySelector( "#see-original" );
const darkTextureSet = document.querySelector( "#dark-texture" );
const lightTextureSet = document.querySelector( "#light-texture" );
const background = document.querySelector( 'body' );

function handleUpdate() {
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach( input => input.addEventListener( 'change', handleUpdate ) );
inputs.forEach( input => input.addEventListener( 'mousedown', function() {
    inputs.forEach( input => input.addEventListener( 'mousemove', handleUpdate ) );
} ) );
inputs.forEach( input => input.addEventListener( 'mouseup', function() {
    return;
} ) );


seeOriginal.addEventListener('mousedown', function() {
    image.classList.remove( 'styled' );
    image.classList.add( 'default' );
    seeOriginal.addEventListener('mouseup', function() {
        image.classList.remove( 'default' );
        image.classList.add( 'styled' );
    });
});

darkTextureSet.addEventListener('click', function() {
    background.style.background = 'var(--dark-texture)';
    background.style.color = "#FFF";
    if ( seeOriginal.classList.contains('so-light') ) {
        seeOriginal.classList.remove("so-light");
        seeOriginal.classList.add("so-dark");
    } else {
        return;
    }
});

lightTextureSet.addEventListener('click', function() {
    background.style.background = 'var(--light-texture)';
    background.style.color = "#000";;
    if ( seeOriginal.classList.contains('so-dark') ) {
        seeOriginal.classList.remove("so-dark");
        seeOriginal.classList.add("so-light");
    } else {
        return;
    }
});

