const passlength = document.querySelector("[data-lengthNumber]");
const inputSlider = document.querySelector("[data-lengthSlider]");
const indicator = document.querySelector(".strength-indicator");
let uppercaseCheck = document.querySelector("[uppercaseCheck]");
let lowercaseCheck = document.querySelector("[lowercaseCheck]");
let numbersCheck = document.querySelector("[numbersCheck]");
let symbolsCheck = document.querySelector("[symbolsCheck]");

// let passwordLength = 10;

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
  const symbols = "!@#$%^&*()";
  return symbols[generateRandomInteger(0, symbols.length)];
}

function calcStrength() {
  // Initialize variables to track the presence of character types
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;

  // Check if the checkboxes for character types are checked
  if (uppercaseCheck.checked) {
    hasUpper = true; // If the uppercase checkbox is checked, set hasUpper to true
  }

  if (lowercaseCheck.checked) {
    hasLower = true; // If the lowercase checkbox is checked, set hasLower to true
  }

  if (numbersCheck.checked) {
    hasNum = true; // If the numbers checkbox is checked, set hasNum to true
  }

  if (symbolsCheck.checked) {
    hasSym = true; // If the symbols checkbox is checked, set hasSym to true
  }

  // Evaluate password strength based on character types and length
  if (hasLower && hasNum && hasSym && hasUpper && passlength >= 8) {
    setIndicator("#0f0"); // Strong password (green indicator)
  } else if ((hasLower || hasUpper) && (hasNum || hasSym) && passlength >= 6) {
    setIndicator("#ff0"); // Medium strength password (yellow indicator)
  } else {
    setIndicator("#f00"); // Weak password (red indicator)
  }
}
