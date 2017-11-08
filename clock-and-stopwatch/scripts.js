// ---- Variable Declarations
// Clock variables
const time = document.querySelector( "#time" );
const setAlarmHour = document.querySelector( "#select-hour" );
const setAlarmMinute = document.querySelector( "#select-minute" );
const setAlarmTime = document.querySelector( "#submitAlarm" );
const cancelAlarm = document.querySelector("#cancelAlarm");
const upcomingAlarm = document.querySelector( "#upcoming-alarm span" );
const alarmSound = document.querySelector('#alarm-sound audio');

// Stopwatch variables
const timer = document.querySelector( '#timer' );
const timerMinutes = document.querySelector( '#timer-minutes' );
const timerSeconds = document.querySelector( '#timer-seconds' );
const startTimer = document.querySelector( '#start-timer' );
const stopTimer = document.querySelector( '#stop-timer' );
const resetTimer = document.querySelector('#reset-timer');


// ------------------------------------------
// ---- Clock Scripts
function addZero( i ) {
    if ( i < 10 ) {
        i = "0" + i;
    }
    return i;
}

function showTime() {
    let today = new Date();
    let hour = today.getHours();
    let minute = today.getMinutes();
    let second = today.getSeconds();
    hour = addZero( hour )
    minute = addZero( minute );
    second = addZero( second );
    document.getElementById( 'time' ).textContent = hour + ":" + minute + ":" + second;
    t = setTimeout(function() {
        showTime();
    }, 500);
}
showTime();

const months = ["January", "February", "March", "April",
                            "May", "June", "July", "August",
                            "September", "October", "November", "December"];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function showDate() {
    let date = new Date();
    let year = date.getFullYear();

    let getThisMonth = date.getMonth();
    let month = months[ getThisMonth ];

    let day = date.getDate(); 

    let getThisDay = date.getDay();
    let dayOfWeek = days[ getThisDay ];

    document.getElementById( 'date' ).textContent = "(" + dayOfWeek + ") " + month + " the " + day + ", " + year;
}
showDate();


// ---- Set Alarm
// setAlarmHour
function createHours() {
    elemFragment = document.createDocumentFragment();
    for ( let i = 0; i < 24; i++ ) {
        let option = document.createElement( 'option' );
        option.value = i;
        option.appendChild( document.createTextNode( i ) );
        elemFragment.appendChild( option );
    }
    setAlarmHour.appendChild( elemFragment );
}
createHours();

// setAlarmMinute
function createMinutes() {
    elemFragment = document.createDocumentFragment();
    for ( let i = 0; i < 60; i++ ) {
        let option = document.createElement( 'option' );
        option.value = i;
        option.appendChild( document.createTextNode( i ) );
        elemFragment.appendChild( option );
    }
    setAlarmMinute.appendChild( elemFragment );
}
createMinutes();

// setAlarmTime
function alarmInit(hour, minute) {
    console.log( "alarmInit() is checking the time for " + hour + " : " + minute );
    let alarmDate = new Date();
    if ( hour == alarmDate.getHours() && minute == alarmDate.getMinutes() && alarmDate.getSeconds() == "0" ) {
        alarmSound.play();
        var timeContainer = document.getElementById("clock");
        timeContainer.classList.add("alarm-flash");
        clearInterval(int);
        console.log("The alarm is executing...");
        upcomingAlarm.textContent = "";
        setTimeout(function() {
            timeContainer.classList.remove('alarm-flash');
        }, 10000);
        
    } else {
        console.log("But, it is not yet time to set off your alarm... it is only " 
                                + alarmDate.getHours() + " : " + alarmDate.getMinutes() + " : " + alarmDate.getSeconds() );
    }
}
var int;
function startInterval(h, m) {
    window.int = window.setInterval( alarmInit.bind( null, h, m ), 1000);
    console.log( "Started an interval checking for " + h + " : " + m );
}

function stopInterval() {
    clearInterval(startInterval);
}

setAlarmTime.addEventListener('click', function() {
    let alarmHour = setAlarmHour.value;
    let alarmMinute = setAlarmMinute.value;
    startInterval( alarmHour, alarmMinute );
    cancelAlarm.style.display = "inline-block";

    alarmHour = addZero( alarmHour );
    alarmMinute = addZero( alarmMinute );
    upcomingAlarm.innerHTML = "You've set an alarm for <strong>" + alarmHour + " : " + alarmMinute + "</strong>.";
    console.log( upcomingAlarm.textContent );
    setAlarmHour.value = 0;
    setAlarmMinute.value = 0;
});

cancelAlarm.addEventListener('click', function() {
    clearInterval(int);
    upcomingAlarm.textContent = "";
    cancelAlarm.style.display = "none";   
});

// --------------------------------------------------------
// ---- Stopwatch Scripts

var timeInt;
function stopwatch_interval_start() {
    window.timeInt = window.setInterval( startCounting, 1000 );
    console.log( "Counting interval has begun..." );
}

let totalSeconds = 0;
function startCounting() {
    totalSeconds += 1;
    console.log( "Count: " + totalSeconds );
    timerSeconds.innerHTML = addZero( totalSeconds%60 );
    timerMinutes.innerHTML = addZero( parseInt( totalSeconds/60 ) );
}

startTimer.addEventListener( 'click', function() {
    stopwatch_interval_start();
});

stopTimer.addEventListener( 'click', function() {
    console.log( "Counting interval has been stopped..." );
    clearInterval( timeInt );
});

resetTimer.addEventListener( 'click', function() {
    clearInterval( stopwatch_interval_start );
    timerSeconds.innerHTML = "00";
    timerMinutes.innerHTML = "00";
    totalSeconds = 0;
    console.log( "The stopwatch has been reset..." );
});