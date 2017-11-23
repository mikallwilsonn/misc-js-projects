// --------- Weather App Scripts --------

// ---- Variable Declarations
const key = '84625411dd5fd7e0d473cb2e50d67847';

const findLocButton = document.querySelector( "#find-location" );

let latitude;
let longitude;
let API_URL;
let data;
let output;
let xhr;

// ---- Acquiring User Location
function getLocation() {
    output = document.querySelector( "#out" );

    if ( !navigator.geolocation ) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        console.error( "Geolocation is not supported by your browser" );
    }

    function success( position ) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        output.innerHTML = '<p>Latitude is ' + latitude + ' <br>Longitude is ' + longitude + '</p>';
        console.log( 'Latitude is ' + latitude + ', and the Longitude is ' + longitude );
    }

    function error() {
        output.innerHTML = "Unable to retrieve your location";
        console.error( "Unable to retrieve your location" );
    }

    output.innerHTML = "<p>Getting your location...</p>";
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
                    } else {
                        console.log( 'Error: ' + xhr.status );
                    }
                }
            }
        }          
    }, 2500);
}

findLocButton.addEventListener('click', function() {
    getWeather();
});