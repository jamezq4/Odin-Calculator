function operate(operator, num1, num2)
{
    let currentCalcTotal;
    switch(operator)
    {
        case '+':
            currentCalcTotal = num1 + num2;
            break;
            
        case '-':
            currentCalcTotal = num1 -  num2;
            break;
        case '*':
            currentCalcTotal = num1 * num2;
            break;
        case '/':
            currentCalcTotal = num1 / num2;
            if (!isFinite(currentCalcTotal))
            {
                currentCalcTotal = NaN;
            }
            break;
    }
    currentTotal = +currentCalcTotal.toFixed(6);
    calculateNumbers.length = 0;
    calculateNumbers.push(currentTotal);
}





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

//event listener for extra function buttons
let extraFuncs = document.querySelector(".extra-funcs");
extraFuncs.addEventListener('click', executeExtraFunc);