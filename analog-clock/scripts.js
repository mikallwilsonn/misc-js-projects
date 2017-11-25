// --------- Analog Clock Scripts

// ---- Variable Declarations
const secondHand = document.querySelector( '.second-hand' );
const minuteHand = document.querySelector( '.min-hand' );
const hourHand = document.querySelector( '.hour-hand' );
const checkbox = document.querySelector('input[type=checkbox]');
const tick = document.querySelector( "#tick" );
tick.volume = 0.1;

// ---- Finding the time and setting the clock hand
function setDate() {
    const now = new Date();
    let seconds = now.getSeconds();
    let secondsDegrees = (( seconds / 60 ) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    let minutes = now.getMinutes();
    let minutesDegrees = (( minutes / 60 ) * 360) + 90;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

    let hours = now.getHours();
    let hoursDegrees = (( hours / 12 ) * 360) + 90;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`; 
    if ( checkbox.checked === true ) {
        tick.play();
    } else {
        return;
    }
    
}

setInterval(setDate, 1000);