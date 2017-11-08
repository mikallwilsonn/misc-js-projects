// ---- Variable Declarations
const time = document.querySelector( "#time" );
const setAlarmHour = document.querySelector( "#select-hour" );
const setAlarmMinute = document.querySelector( "#select-minute" );
const setAlarmTime = document.querySelector( "#submitAlarm" );
const upcomingAlarm = document.querySelector( "#upcoming-alarm span" );
const alarmSound = document.querySelector('#alarm-sound audio');

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

    let day = date.getDate(); // -- Day of month 1-31

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
        // alert( "Your alarm for "+ hour + " : " + minute + " has just gone off!." );
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

    alarmHour = addZero( alarmHour );
    alarmMinute = addZero( alarmMinute );
    upcomingAlarm.innerHTML = "You've set an alarm for <strong>" + alarmHour + " : " + alarmMinute + "</strong>.";
    console.log( upcomingAlarm.textContent );
    setAlarmHour.value = 0;
    setAlarmMinute.value = 0;
});