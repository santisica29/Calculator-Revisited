let num1 = '';
let num2 = '';
let op = '';
let result = '';
let operators = ["+", "-", "*", "/"];

let displayScreen = document.querySelector(".display p");
let buttons = document.querySelectorAll(".btn");
let numsBtn = document.querySelectorAll(".btn-num");
let opBtn = document.querySelectorAll(".btn-op");

numsBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let value = e.currentTarget.textContent;
    displayScreen.textContent += value;

    if (num1 === '' || (num1 != '' && op === '')) {
      num1 += value;
    } else {
      num2 += value;
    }

    console.log(num1);
    console.log(op);
    console.log(num2);

  });
});

opBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (num1 != '' && num2 != ''){
        result = operate(op, num1, num2);

        displayScreen.textContent = result;
    }

    let value = e.currentTarget.textContent;
    displayScreen.textContent += ' ' + value + ' ';

    op = value;

    console.log(num1);
    console.log(op);
    console.log(num2);
    console.log(result)
  });
});

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
    let result = '';
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
