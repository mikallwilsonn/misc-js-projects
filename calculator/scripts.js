// ---- Variable Declarations

const display = document.querySelector("#display span");
const clearAll = document.querySelector("#clear-all");
const clearLast = document.querySelector("#clear-last");
const number = document.querySelectorAll('.number');
const operator = document.querySelectorAll('.operator');

// ---- Check if display has anything inputted, if not, then display a "blinking" underscore

const blinker = `<span id="waiting">_</span>`;
if ( display.textContent === "" ) {
    display.innerHTML = blinker;
} else {
    document.getElementById('waiting').remove();
}


// ---- Clear All from display
clearAll.addEventListener('click', function() {
    display.textContent = "";
    display.innerHTML = blinker;
    console.log('You cleared the entire display.');
});

// ---- Clear last character
clearLast.addEventListener('click', function() {
    var str = display.textContent;
    str = str.substring(0, str.length -1);
    display.textContent = str;
    console.log('You cleared the last number or operator entered.');
    if ( display.textContent === "" ) {
        display.innerHTML = blinker;
    }
});

// ---- User input

function removeWaiting() {
    newDisplay = display.textContent.replace('_', '');
    display.textContent = newDisplay;   
}

// Numbers
for( let i = 0; i < number.length; i++ ) {
    number[ i ].addEventListener('click', function() {
        removeWaiting();
        let num = this.getAttribute( 'data-value' );
        display.textContent += num;
        console.log('You entered the number ' + num );
    });
}

// Operators
for( let i = 0; i < operator.length; i++ ) {
    operator[ i ].addEventListener('click', function() {
        removeWaiting();
        if ( this.getAttribute( 'data-value' ) === '=' ) {
            if ( display.textContent === "" ) {
                display.innerHTML = blinker;
            } else {
                let equasion = display.textContent.toString();
                let evaluate = eval(equasion);
                display.textContent = evaluate;
            }
        } else if ( display.textContent === "" ) {
            display.innerHTML = blinker;
        } else {
            let op = this.getAttribute('data-value');
            display.textContent += op;
        }
    });
}
