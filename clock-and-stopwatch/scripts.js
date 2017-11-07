// ---- Variable Declarations
const time = document.querySelector("#time");


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
    hour = addZero(hour)
    minute = addZero(minute);
    second = addZero(second);
    document.getElementById('time').textContent = hour + ":" + minute + ":" + second;
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
    let month = months[getThisMonth];

    let day = date.getDate(); // -- Day of month 1-31

    let getThisDay = date.getDay();
    let dayOfWeek = days[getThisDay];

    document.getElementById('date').textContent = "(" + dayOfWeek + ") " + month + " the " + day + ", " + year;
}
showDate();