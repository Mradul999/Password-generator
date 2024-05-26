const passlength = document.querySelector("[data-lengthNumber]");
const inputSlider = document.querySelector("[data-lengthSlider]");
const indicator = document.querySelector("[data-indicator]");
const uppercaseCheck = document.querySelector("[uppercaseCheck]");
const lowercaseCheck = document.querySelector("[lowercaseCheck]");
const numbersCheck = document.querySelector("[numbersCheck]");
const symbolsCheck = document.querySelector("[symbolsCheck]");
const copyMsg = document.querySelector("[data-copyMsg]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copyBtn]");
const allCheckBox = document.querySelectorAll("[checkbox]");
const generateBtn = document.querySelector("[generate-button]");

let passwordLength = 10;
let password = "";
let checkCount = 0;

handleSlider();

function handleSlider() {
  inputSlider.value = passwordLength;
  passlength.innerText = passwordLength;
}

inputSlider.addEventListener("input", function () {
  passwordLength = inputSlider.value;
  passlength.innerText = passwordLength;
  calcStrength();
});

setIndicator("#ccc");

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.boxShadow = `0px 0px 10px 2px ${color}`;
}

function generateRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomNumber() {
  return generateRandomInteger(0, 10).toString();
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
  let hasUpper = uppercaseCheck.checked;
  let hasLower = lowercaseCheck.checked;
  let hasNum = numbersCheck.checked;
  let hasSym = symbolsCheck.checked;

  if (hasLower && hasNum && hasSym && hasUpper && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "Copied";
  } catch (e) {
    copyMsg.innerText = "Failed";
  }
  copyMsg.classList.add("active");
  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

copyBtn.addEventListener("click", function () {
  if (passwordDisplay.value) {
    copyContent();
  }
});

function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) {
      checkCount++;
    }
  });

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
  calcStrength();
}

allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});

function shufflePassword(password) {
  let array = password.split("");
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join("");
}

generateBtn.addEventListener("click", function () {
  if (checkCount <= 0) {
    return;
  }

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }

  password = "";
  let funcArr = [];

  if (uppercaseCheck.checked) funcArr.push(generateUpperCase);
  if (lowercaseCheck.checked) funcArr.push(generateLowerCase);
  if (numbersCheck.checked) funcArr.push(generateRandomNumber);
  if (symbolsCheck.checked) funcArr.push(generateSymbol);

  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }

  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let randomIndex = generateRandomInteger(0, funcArr.length);
    password += funcArr[randomIndex]();
  }

  // Shuffle the generated password
  password = shufflePassword(password);

  passwordDisplay.value = password;
  calcStrength();
});
