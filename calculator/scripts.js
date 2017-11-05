// ---- Variable Declarations

const display = document.querySelector("#display span");


// ---- Check if display has anything inputted, if not, then display a "blinking" underscore
const blinker = `<span id="waiting">_</span>`;
if ( display.textContent === "" ) {
    display.innerHTML = blinker;
}
