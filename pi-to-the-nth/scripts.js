"use strict";

// ---- Variable Declarations
const input = document.getElementsByTagName("INPUT")[0];
const button = document.getElementsByTagName("BUTTON")[0];
const piDisplay = document.getElementById("pi");
const error = document.getElementById("error");
const suggestion = document.getElementById("suggestion");

// ---- Calculate PI
const calcPI = function (n) {
    if (n === undefined || n > 20) {
        n = 20;
    }
    return (16 * Math.atan(1 / 5) - 4 * Math.atan(1 / 239)).toFixed(n);
};

// ---- Process Input
button.addEventListener( 'click', function() {
    let x = parseInt( input.value );
    if ( isNaN( x ) ) {
        error.style.display = "block";
        error.textContent =  input.value + " is not a number literal. Please enter an integer.";
        window.setTimeout(function() {
            error.style.display = "none";
            input.value = ""; 
        }, 5000);
    } else {
        error.style.display = "none";
        piDisplay.textContent = calcPI(x);
    } 
} );


