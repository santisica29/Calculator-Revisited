let num1 = "";
let num2 = "";
let op = "";
let resultDisplay = "";
let currentNum = "";

let displayScreen = document.querySelector(".currentNum");
let displayResult = document.querySelector(".result");
let buttons = document.querySelectorAll(".btn");

document.addEventListener("keydown", (event) => {
  let key = event.key;

  let nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  let isNum = nums.includes(key);
  let operators = ["+", "-", "*", "/"];
  let isOp = operators.includes(key);

  switch (true) {
    case "c" === key:
      erase();
      break;
    case "Backspace" === key:
      backtrack();
      break;
    case "p" === key:
      plusMinus();
      break;
    case "." === key || "," === key:
      managePoint();
      break;
    case "Enter" === key:
      completeOperation();
      break;
    case isNum:
      manageNumber(key);
      break;
    case isOp:
      manageOperation(key);
      break;
  }
});

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let type = e.currentTarget.dataset.type;

    switch (type) {
      case "erase":
        erase();
        break;
      case "backspace":
        backtrack();
        break;
      case "plusminus":
        plusMinus();
        break;
      case "point":
        managePoint();
        break;
      case "equals":
        completeOperation();
        break;
      case "number":
        let numValue = e.currentTarget.dataset.value;
        manageNumber(numValue);
        break;
      case "operator":
        let opValue = e.currentTarget.dataset.value;
        manageOperation(opValue);
        break;
    }
  });
});

function manageNumber(numValue) {
  if (isValueEmpty(num1) || (!isValueEmpty(num1) && isValueEmpty(op))) {
    if (hasLeadingZero(num1) && num1.length === 1) {
      num1 = numValue;
      updateScreen(numValue);
      return;
    } else {
      num1 += numValue;
    }
  } else {
    if (displayScreen.textContent === "0") {
      num2 = numValue;
      updateScreen(numValue);
      return;
    } else {
      num2 += numValue;
    }
  }

  updateScreen(numValue, "append");
}

function updateScreen(digit, mode = "replace") {
  switch (mode) {
    case "replace":
      displayScreen.textContent = digit;
      break;
    case "append":
      displayScreen.textContent += digit;
      break;
    case "clear":
      displayScreen.textContent = "";
      break;
    case "error":
      displayScreen.textContent = "Error";
      break;
  }
}

function manageOperation(opValue) {
  let bothNumsHasValues = num1 != "" && num2 != "";

  if (bothNumsHasValues) {
    num1 = Number(num1);
    num2 = Number(num2);
    result = operate(op, num1, num2);

    updateResultScreen(`${num1} ${op} ${num2}`);
    num1 = result;
    num2 = "";
    op = "";

    updateScreen(num1);
  }

  op = opValue;
  updateResultScreen(`${num1} ${op} `);
  updateScreen("0");
}

function updateResultScreen(text) {
  displayResult.textContent = text;
}

function completeOperation() {
  if (num2 === "") {
    return;
  }

  num1 = Number(num1);
  num2 = Number(num2);
  result = operate(op, num1, num2);

  displayResult.textContent = `${num1} ${op} ${num2} = ${result}`;
  num1 = result;
  num2 = "";
  op = "";

  updateScreen(num1);
}

function managePoint() {
  if ((numberHasDecimal(num1) && isValueEmpty(op)) || numberHasDecimal(num2)) {
    alert("invalid option");
    return;
  }

  if (isValueEmpty(op)) num1 += ".";
  else num2 += ".";

  updateScreen(".", "append");
}

function erase() {
  num1 = "0";
  num2 = "";
  op = "";
  resultDisplay = "";
  displayResult.textContent = "";
  displayScreen.textContent = "0";
  previusOp = false;
}

function plusMinus() {
  let newValue = "";
  if (num1 !== "" && op === "") {
    num1 = Number(num1) * -1;
    newValue = num1;
  }
  if (num2 !== "") {
    num2 = Number(num2) * -1;
    newValue = num2;
  }
  displayScreen.textContent = newValue;
}

function backtrack() {
  let newNum = "";
  if (num1 !== "" && op === "") {
    num1 = num1.substring(0, num1.length - 1);
    newNum = num1;
  } else {
    num2 = num2.substring(0, num2.length - 1);
    newNum = num2;
  }

  if (newNum === "") {
    newNum = "0";
    num1 = "0";
  }
  displayScreen.textContent = newNum;
}

function add(n1, n2) {
  return n1 + n2;
}

function subtract(n1, n2) {
  return n1 - n2;
}

function multiply(n1, n2) {
  return n1 * n2;
}

function divide(n1, n2) {
  return n1 / n2;
}

function operate(operator, n1, n2) {
  let result = "";
  switch (operator) {
    case "+":
      result = add(n1, n2);
      break;
    case "-":
      result = subtract(n1, n2);
      break;
    case "*":
      result = multiply(n1, n2);
      break;
    case "÷":
      result = divide(n1, n2);
      break;
  }
  return result.toString();
}

function isValueEmpty(value) {
  return value === "";
}

function numberHasDecimal(number) {
  return number.toString().split("").includes(".");
}

function hasLeadingZero(number) {
  return number[0] === "0";
}
