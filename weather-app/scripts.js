// --------- Weather App Scripts --------

// ---- Variable Declarations
const key = '84625411dd5fd7e0d473cb2e50d67847';

const findLocButton = document.querySelector( "#find-location" );
const loader = document.querySelector( "#loader" );
const cityName = document.querySelector( "#city-name" );
const timeChecked = document.querySelector( "#time-checked" );
const temperature = document.querySelector( "#temperature" );
const windSpeed = document.querySelector( "#wind" );
const cloudCoverage = document.querySelector( "#cloud-coverage" );
const rainfall = document.querySelector( "#rainfall" );
const snowfall = document.querySelector( "#snowfall" );
const weatherWidget = document.querySelector( "#weather" );


let latitude;
let longitude;
let API_URL;
let data;
let output;
let xhr;

// ---- Acquiring User Location
function getLocation() {
    output = document.querySelector( "#output" );

    if ( !navigator.geolocation ) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        console.error( "Geolocation is not supported by your browser" );
    }

    function success( position ) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log( 'Latitude is: ' + latitude );
        console.log( 'Longitude is: ' + longitude );
    }

    function error() {
        output.textContent = "Unable to retrieve your location";
        console.error( "Unable to retrieve your location" );
    }

    if ( output.style.display = "none" ) {
        output.style.display = "block";
    }

    output.textContent = "Getting your location...";
    navigator.geolocation.getCurrentPosition( success, error );
}

function getWeather() {
    getLocation();
    let checkCoords = window.setInterval(function() {
        if ( latitude !== undefined && longitude !== undefined ) {
            clearInterval( checkCoords );
            API_URL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=' + key;
            console.log( 'You are making an API request to ' + API_URL );
            xhr = new XMLHttpRequest(); 
            xhr.open( "GET", API_URL );
            xhr.responseType = 'json';
            xhr.send( null );
            xhr.onreadystatechange = function() {
                let DONE = 4;
                let OK = 200;
                if ( xhr.readyState === DONE ) {
                    if ( xhr.status === OK ) {
                        data = xhr.response;
                        output.style.display = "none";
                        findLocButton.textContent = "Recheck weather";
                        showWeather();
                    } else {
                        console.log( 'Error: ' + xhr.status );
                    }
                }
            }
        }          
    }, 2500); 
}

function showWeather() {
    loader.style.display = "none";
    weatherWidget.style.display ="block";
    cityName.textContent = data.name + ", " + data.sys.country;
    let dateTime = new Date();
    let timeHour = dateTime.getHours();
    let timeMinutes = dateTime.getMinutes();
    let timeSeconds = dateTime.getSeconds();
    timeChecked.textContent = timeHour + " :" + timeMinutes + " : " + timeSeconds;
    temperature.textContent = data.main.temp;
    windSpeed.textContent = "Wind speeds: " + data.wind.speed  + " m/sec. ";
    cloudCoverage.textContent = data.clouds.all + "% cloud coverage currently.";

    if ( data.rain !== undefined ) {
        rainfall.style.opacity = "1";
        rainfall.textContent = "There has been " +  data.rain + " rain in the last 3 hours.";
    } else {
        rainfall.style.opacity = "0";
    }

    if ( data.snow !== undefined ) {
        snowfall.style.opacity = "1";
        snowfalll.textContent = "There has been " +  data.snow + " snow in the last 3 hours.";
    } else {
        snowfall.style.opacity = "0";
    }

}

findLocButton.addEventListener('click', function() {
    if ( weatherWidget.style.display = "block" ) {
        weatherWidget.style.display ="none";
    }
    loader.style.display = "block";
    getWeather();
});