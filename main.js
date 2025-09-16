let num1 = 0;
let num2 = 0;
let op = "";

let displayScreen = document.querySelector('.display p');
let buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        let value = e.currentTarget.textContent;

        populateDisplay(e);
        num1 = value.textContent;
    })
    
})

function populateDisplay(e){
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
    switch (operator){
        case '+':
            add(n1, n2);
            break;
        case '-':
            subtract(n1, n2);
            break;
        case '*':
            multiply(n1, n2);
            break;
        case '/':
            divide(n1, n2);
            break;
        default:
            break;
    }
}