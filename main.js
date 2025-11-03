// TODO:
// ver una forma segura de pasar de string a number
// usar data-value para los valores
// AL TERMINAR Logica
// ver manera de reusar algunas funciones
// hacer un event listener para todos los btn y dependiendo de su data- llamar a otro event listener, chequear con chat gpt si es correcto
// cambiar manera de mostrar el resultado, al apretar op o == pasar numero a result
// despues de finalizar una op no se puede backtrack el resultado

let num1 = "";
let num2 = "";
let op = "";
let resultDisplay = "";
let currentNum = '';

let displayScreen = document.querySelector(".currentNum");
let displayResult = document.querySelector('.result');
let numsBtn = document.querySelectorAll(".btn-num");
let opBtn = document.querySelectorAll(".btn-op");
let eraseBtn = document.querySelector(".btn-c");
let pointBtn = document.querySelector(".btn-point");
let equalBtn = document.querySelector(".btn-equal");
let plusMinusBtn = document.querySelector('.btn-plusminus');
let btnBack = document.querySelector('.btn-back');

eraseBtn.addEventListener("click", erase);
pointBtn.addEventListener("click", managePoint);
equalBtn.addEventListener("click", completeOperation);
plusMinusBtn.addEventListener('click', plusMinus);
btnBack.addEventListener('click', backtrack);

numsBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let value = e.currentTarget.textContent;

    if (num1 === "" || (num1 != "" && op === "")) {
      if (
        num1[0] === "0" &&
        value !== "." &&
        !num1.toString().split("").includes(".")
      ) {
        num1 = value;
        displayScreen.textContent = value;
        return;
      } else {
        num1 += value;
      }
    } else {
      if (
        num2[0] === "0" &&
        value !== "." &&
        !num2.toString().split("").includes(".")
      ) {
        num2 = value;
        displayScreen.textContent = value;
        return;
      } else {
        num2 += value;
      }
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

      displayResult.textContent = `${num1} ${op} ${num2}`;
      num1 = result;
      num2 = "";
      op = "";

      displayScreen.textContent = num1;
    }

    op = e.currentTarget.textContent;
    displayResult.textContent = `${num1} ${op} `;
    displayScreen.textContent = '0';


    console.log(num1);
    console.log(op);
    console.log(num2);
    console.log(displayResult)
  });
});

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

  displayScreen.textContent = result;
}

function managePoint() {
  if ((num1.toString().split("").includes(".") && op === '') || num2.toString().split("").includes(".")) {
    alert("invalid option");
    return;
  }

  if (op === "") num1 += ".";
  else num2 += ".";
  
  displayScreen.textContent += ".";
}

function erase() {
  num1 = "0";
  num2 = "";
  op = "";
  resultDisplay = '';
  displayResult.textContent = '';
  displayScreen.textContent = "0";
}

function plusMinus(){
  let newValue = '';
  if (num1 !== '' && op === '') {
    num1 = Number(num1) * -1;
    newValue = num1;
  }
  if (num2 !== '') {
    num2 = Number(num2) * -1;
    newValue = num2;
  }
  displayScreen.textContent = newValue;
}

function backtrack(){
  let newNum = '';
  if (num1 !== '' && op === ''){
    num1 = num1.substring(0, num1.length - 1);
    newNum = num1;
  } else {
    num2 = num2.substring(0, num2.length - 1);
    newNum = num2;
  }

  if (newNum === '') newNum = '0';
  
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
