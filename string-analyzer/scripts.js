// -------- String Analyzer
// -----------------------------

// ---- Variable Declarations
const theString = document.querySelector( "#input" );
const analyze = document.querySelector( "#init" );
const utilities = document.querySelector( "#utilities" );
const clear = document.querySelector( "#clear" );

const reverseString = document.querySelector( "#reverse-button" );
const randomizeString = document.querySelector("#randomize-button");
const uppercaseString = document.querySelector( "#uppercase-button" );
const capitalizeString = document.querySelector( "#capitalize-button" );
const lowercaseString = document.querySelector( "#lowercase-button" );
const restoreString = document.querySelector( "#restore-button" );

const statCharacters = document.querySelector( "#num-of-chars" );
const statLetters = document.querySelector( "#num-of-letters" );
const statVowels = document.querySelector( "#num-of-vowels" );
const statNumbers = document.querySelector( "#num-of-numbers" );
const statPuncuation = document.querySelector("#num-of-punc");


// ---- Initial Stat Display when Analyze is clicked.
let str;
let stringInitialValue;
analyze.addEventListener('click', function() {
    if ( theString.value === "" ) {
        alert( "You need to enter the string before you can analyze it!" );
        utilities.style.display= "none";
        clear.style.display = "none";
    } else {
        stringInitialValue = theString.value;
        str = theString.value.toLowerCase();
        str = str.replace(/\s/g, "");
        utilities.style.display= "block";
        clear.style.display = "inline-block";

        let chars = str.length;
        statCharacters.textContent = chars;

        lettersCount();
        vowelsCount();
        numbersCount();
        puncCount();
    }
});

function lettersCount() {
    let letters = str.replace(/\w/g, "");
    letters = letters.length;
    statLetters.textContent = letters;
};

function vowelsCount() {
    let vowels = str.replace(/[^aeiou]/g, "");
    vowels = vowels.length;
    statVowels.textContent = vowels;
};

function numbersCount() {
    let numbers = str.replace(/\D/g, "");
    numbers = numbers.length;
    statNumbers.textContent = numbers;
};

function puncCount() {
    let punc = str.replace(/[^.,?!@#$%^&*()"' ]/g, "");
    punc = punc.length;
    statPuncuation.textContent = punc;
}

// ---- Clearing the textarea
clear.addEventListener('click', function() {
    theString.value = "";
    utilities.style.display= "none";
    clear.style.display = "none";
    removeClasses();
    statCharacters.textContent = "";
    statLetters.textContent = "";
    statVowels.textContent = "";
    statNumbers.textContent = "";
    statPuncuation.textContent = "";
});

// ---- Utility buttons to apply styles to string.
// ----
function removeClasses() {
    theString.removeAttribute("class");
}

function applyClass( c ) {
    if ( theString.classList.contains( c ) ) {
        theString.classList.remove( c );
    } else {
        removeClasses();
        theString.classList.add( c );
    }
}


reverseString.addEventListener('click', function(){
    let s = theString.value;
    s = s.split("").reverse().join("");
    theString.value = s;
});


randomizeString.addEventListener('click', function() {
    let s = theString.value;
    restoreString.style.display = "inline-block";
    s = s.split("");
    s = randomizer( s );
    s = s.join("");
    theString.value = s;
});

function randomizer( array ) {
    let currentIndex = array.length, tempValue, randomIndex;

    while ( 0 !== currentIndex ) {
        randomIndex = Math.floor( Math.random() * currentIndex );
        currentIndex -= 1;
        tempValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempValue;
    }
    return array;
}

uppercaseString.addEventListener('click', function(){
    applyClass( "uppercase-string" );
});
capitalizeString.addEventListener('click', function(){
    applyClass( "capitalize-string" );
});
lowercaseString.addEventListener('click', function(){
    applyClass( "lowercase-string" );
});

restoreString.addEventListener('click', function() {
    theString.value = stringInitialValue;
    removeClasses();
    restoreString.style.display = "none";
});