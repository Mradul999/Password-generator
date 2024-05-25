const passlength = document.querySelector("[data-lengthNumber]");
const inputSlider = document.querySelector("[data-lengthSlider]");
const indicator = document.querySelector(".strength-indicator");

let passwordLength = 10;

// handleSlider();

// function handleSlider(){
//     inputSlider.value=passwordLength;
//     passlength.innerText=passwordLength;

// }

inputSlider.addEventListener("input", function () {
  passlength.innerText = inputSlider.value;
});

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.boxShadow = `0px 0px 10px 2px ${color}`;
}

function generateRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomeNumber() {
  return generateRandomInteger(0, 9);
}

function generateLowerCase() {
  return String.fromCharCode(generateRandomInteger(97, 123));
}

function generateUpperCase() {
  return String.fromCharCode(generateRandomInteger(65, 91));
}

function generateSymbol() {
  const symbols = "!@#$%^&*()_+";
  return symbols[generateRandomInteger(0, symbols.length)];
}


