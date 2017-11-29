/* -------- Paint App scripts -------- */

const canvas = document.querySelector( '#draw' );
const ctx = canvas.getContext( '2d' );
const color = document.querySelector('#stroke-color');
const BGcolor = document.querySelector('#background-color');
const line_width = document.querySelector('#line-width');
const canvasContainer = document.querySelector('#canvas-container');
const clearCanvas = document.querySelector('#clearCanvas');
const saveCanvas = document.querySelector('#saveCanvas #downloadLink');

clearCanvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = color.value;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
//ctx.lineWidth = 50;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;
//ctx.globalCompositeOperation = 'multiply';

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

BGcolor.addEventListener( 'change', function() {
    canvas.style.backgroundColor = BGcolor.value;
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

clearCanvas.addEventListener('click', function() {
    let confirmClear = confirm('Are you sure you want to clear the canvas?');
    if ( confirmClear == true ) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
        return;
    }
});

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