/* -------- Paint App scripts -------- */

const canvas = document.querySelector( '#draw' );
const ctx = canvas.getContext( '2d' );
const color = document.querySelector('#stroke-color');
const BGcolor = document.querySelector('#background-color');
const line_width = document.querySelector('#line-width');
const canvasContainer = document.querySelector('#canvas-container');
const clearCanvas = document.querySelector('#clearCanvas');
const saveCanvas = document.querySelector('#saveCanvas #downloadLink');
const blendType = document.querySelector('#blend-type'); 
const question = document.querySelector('span#question')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = color.value;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw( e ) {
    if( !isDrawing ) return;
    ctx.strokeStyle = color.value;
    ctx.lineWidth= line_width.value;
    ctx.beginPath();
    ctx.moveTo( lastX, lastY );
    ctx.lineTo( e.offsetX, e.offsetY );
    ctx.stroke();
    [ lastX, lastY ] = [ e.offsetX, e.offsetY ];
}

canvas.addEventListener( 'mousemove', draw );
canvas.addEventListener( 'mousedown', ( e ) => {
    isDrawing = true;
    [ lastX, lastY ] = [ e.offsetX, e.offsetY ];
});


canvas.addEventListener( 'mouseup', () => isDrawing = false  );
canvas.addEventListener( 'mouseout', () => isDrawing = false  );

function createBG( w, h ) {
    ctx.beginPath();
    ctx.rect( 0, 0, w, h );
    ctx.fillStyle = BGcolor.value;
    ctx.fill();
}

BGcolor.addEventListener( 'change', function() {
    createBG( canvas.width, canvas.height );
});

document.addEventListener('keydown', function( e ) {
    if( e.keyCode == 219 ) {
        line_width.value = parseInt(line_width.value) - 10;
    } else if ( e.keyCode == 221 ) {
        line_width.value = parseInt(line_width.value) + 10;
    } else {
        return;
    }
});

function emptyCanvas() {
    let confirmClear = confirm('Are you sure you want to clear the canvas?');
    if ( confirmClear == true ) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
        return;
    }
}

clearCanvas.addEventListener('click', emptyCanvas );
document.addEventListener('keydown', function( e ) {
    if( e.keyCode == 67 ) {
        emptyCanvas();
    } else {
        return;
    }
});

document.addEventListener('keydown', function( e ) {
    if ( e.keyCode == 82 ) {
        randomColor();
    } 
} );

function randomColor() {
    color.value = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
    ctx.strokeStyle = color.value;
}

function download() {
    let confirmClear = confirm('Are you sure you want to save a copy?');
    if ( confirmClear == true ) {
        var dt = canvas.toDataURL('image/jpeg');
        this.href = dt;
    } else {
        return;
    }
};

saveCanvas.addEventListener('click', download, false);

blendType.addEventListener( 'change', function() {
    ctx.globalCompositeOperation = blendType.value;
});

question.addEventListener( 'click', function() {
    alert('You can press the letter "c" at any time to clear the canvas. \n The " [ " key to decrease brush size, and the " ] " key will increase brush size as you go. \n The "r" key will pick a random color.');
});