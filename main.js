// TODO:
// ver una forma segura de pasar de string a number
// AL TERMINAR Logica
// ver manera de reusar algunas funciones
// hacer un event listener para todos los btn y dependiendo de su data- llamar a otro event listener, chequear con chat gpt si es correcto
// cambiar manera de mostrar el resultado, al apretar op o == pasar numero a result
// despues de finalizar una op no se puede backtrack el resultado

let num1 = "";
let num2 = "";
let op = "";
let resultDisplay = "";
let currentNum = "";

let displayScreen = document.querySelector(".currentNum");
let displayResult = document.querySelector(".result");

let buttons = document.querySelectorAll(".btn");

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
    
    if ((hasLeadingZero(num1) &&  num1.length === 1 )) {
      num1 = numValue;
      updateScreen(numValue);
      return;
    } else {
      num1 += numValue;
    }

  } else {
    if (
      hasLeadingZero(num2) &&
      numberHasDecimal(numValue) &&
      !numberHasDecimal(num2)
    ) {
      num2 = numValue;
      updateScreen(numValue, "append");
      return;
    } else {
      num2 += numValue;
    }
  }

  updateScreen(numValue, "append");
}

function isValueEmpty(value) {
  return value === "";
}

function isValueADecimal(value) {
  return value === ".";
}

function numberHasDecimal(number) {
  return number.split("").includes(".");
}

function hasLeadingZero(number) {
  return number[0] === "0";
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

// TODO fix this function
function manageOperation(opValue) {
  
  let bothNumsHasValues = num1 != "" && num2 != "";

  if (bothNumsHasValues) {
    num1 = Number(num1);
    num2 = Number(num2);
    result = operate(op, num1, num2);

    displayResult.textContent = `${num1} ${op} ${num2}`;
    num1 = result;
    num2 = "";
    op = "";

    updateScreen(num1);
  }

  op = opValue;
  updateScreen(`${num1} ${op} `);
}

function completeOperation() {
  if (num2 === "") {
    return;
  }

  num1 = Number(num1);
  num2 = Number(num2);
  result = operate(op, num1, num2);

  displayResult.textContent = `${num1} ${op} ${num2}`;
  num1 = result;
  num2 = "";
  op = "";

  updateScreen(result)
}

function managePoint() {
  if (
    (numberHasDecimal(num1) && isValueEmpty(op)) ||
    numberHasDecimal(num2)
  ) {
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
  return result;
}
