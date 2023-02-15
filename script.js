








//array to store current number of pair
let currentNumber = [];
currentNumber[0] = '0';

//array to store total numbers to calculate
let calculateNumbers = [];
calculateNumbers[0] = 0;


//store operator and calculcation total for the current pair
let currentOperator = '';
let currentTotal;

//storing display value for continuous future use
let displayValue = document.getElementById("display-value");

//event listener for the digit buttons
let digitButtons = document.querySelector(".digits");
digitButtons.addEventListener('click', updateDisplay);

//event listener for the operator buttons
let operatorButtons = document.querySelector(".operators");
operatorButtons.addEventListener('click', chooseOperator);