// ---- Variable Declarations

const display = document.querySelector("#display span");
const clearAll = document.querySelector("#clear-all");
const clearLast = document.querySelector("#clear-last");


// ---- Check if display has anything inputted, if not, then display a "blinking" underscore
const blinker = `<span id="waiting">_</span>`;
if ( display.textContent === "" ) {
    display.innerHTML = blinker;
}


// --- Clear All from display
clearAll.addEventListener('click', function() {
    display.textContent = "";
    display.innerHTML = blinker;
});

// --- Clear last character
clearLast.addEventListener('click', function() {
    var str = display.textContent;
    str = str.substring(0, str.length -1);
    display.textContent = str;
    if ( display.textContent === "" ) {
        display.innerHTML = blinker;
    }
});