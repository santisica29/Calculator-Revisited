// TODO:
// ver una forma segura de pasar de string a number
// usar data-value para los valores
// AL TERMINAR Logica
// mejorar el layout y hacerlo todo negro con grises y celestes
// ver manera de reusar algunas funciones

let num1 = "";
let num2 = "";
let op = "";
let result = "";

let displayScreen = document.querySelector(".display p");
let numsBtn = document.querySelectorAll(".btn-num");
let opBtn = document.querySelectorAll(".btn-op");
let eraseBtn = document.querySelector(".btn-c");
let pointBtn = document.querySelector(".btn-point");
let equalBtn = document.querySelector(".btn-equal");

eraseBtn.addEventListener("click", erase);
pointBtn.addEventListener("click", managePoint);
equalBtn.addEventListener("click", completeOperation);

numsBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let value = e.currentTarget.textContent;

    if (num1 === "" || (num1 != "" && op === "")) {
      num1 += value;
    } else {
      num2 += value;
    }

    displayScreen.textContent += value;

    console.log(num1);
    console.log(op);
    console.log(num2);
  });
});

opBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (num1 != "" && num2 != "") {
      num1 = Number(num1);
      num2 = Number(num2);
      result = operate(op, num1, num2);

      num1 = result;
      num2 = "";
      op = "";

      displayScreen.textContent = result;
    }

    let value = e.currentTarget.textContent;
    displayScreen.textContent += " " + value + " ";

    op = value;

    console.log(num1);
    console.log(op);
    console.log(num2);
    console.log(result);
  });
});

function completeOperation() {
  if (num2 === "") {
    return;
  }

  num1 = Number(num1);
  num2 = Number(num2);
  result = operate(op, num1, num2);

  num1 = result;
  num2 = "";
  op = "";

  displayScreen.textContent = result;
}

function managePoint() {
  if (
    (num1.toString().split("").includes(".") && num1 !== result) ||
    num2.split("").includes(".")
  ) {
    console.log(num1 === result);
    alert("invalid option");
    return;
  }

  if (op === "") {
    num1 += ".";
  } else {
    num2 += ".";
  }

  displayScreen.textContent += ".";
}

function erase() {
  num1 = "0";
  num2 = "";
  op = "";
  result = "";
  displayScreen.textContent = "0";
}
function populateDisplay(e) {
  let value = e.currentTarget.textContent;

  displayScreen.textContent += value;
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
    case "/":
      result = divide(n1, n2);
      break;
  }
  return result;
}
