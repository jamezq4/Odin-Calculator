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


function updateDisplay(e)
{
    if (e.target.id === 'decimal')
    {
        //if we dont currently have a decimal
        if (!displayValue.textContent.includes(e.target.textContent) && currentNumber.length > 0)
        {
            if (currentNumber[0] === '')
            {
                currentNumber[0] = '0';
            }
            currentNumber.push(e.target.textContent);
            displayValue.textContent = currentNumber.join("");
        }
        else
        {
            if (currentNumber.length === 0)
            {
                currentNumber[0] = '0';
            }

            currentNumber.push(e.target.textContent);
            displayValue.textContent = currentNumber.join("");
        }
    }


    if (e.target.id === 'digit')
    {
        if (currentNumber[0] === '0' && !displayValue.textContent.includes('.'))
        {
            currentNumber.length = 0;
        }
        currentNumber.push(e.target.textContent);
        displayValue.textContent = currentNumber.join("");
    }
}

function chooseOperator(e)
{
    //will combine all elements of current number into 1 number
    if (currentNumber.length != 0)
    {
        let wholeNumber = '';

        //we typed in an operator and dont currently have one so we want to combine everything in currentNumber
        for (let i = 0; i < currentNumber.length; i++)
        {
            wholeNumber += currentNumber[i];
        }

        if (wholeNumber.includes("."))
        {
            wholeNumber = parseFloat(wholeNumber);
        }
        else
        {
            wholeNumber = Number(wholeNumber);
        }

        //this will overwrite the calculateNumbs array when we have a total and press an operator after it
        if (calculateNumbers.length > 0 && currentOperator === '')
        {
            calculateNumbers.length = 0;
        }
        calculateNumbers.push(wholeNumber);

        //should clear all the currentNumber items in the array to make space for a new number
        currentNumber.length = 0;
    }


    if (currentOperator === '')
    {
        currentOperator = e.target.textContent;
    }
    else
    {
        if (calculateNumbers.length === 2)
        {
            operate(currentOperator, calculateNumbers[0], calculateNumbers[1]);
        }
        else
        {
            operate(currentOperator, calculateNumbers[0], calculateNumbers[0]);
        }

        if (isFinite(currentTotal))
        {
            displayValue.textContent = currentTotal;
        }
        else
        {
            if (e.target.textContent === '=')
            {
                displayValue.textContent = 'Uhh...';
            }
            else
            {
                displayValue.textContent = currentTotal;
            }
        }
    }

    if (e.target.textContent === '=')
    {
        currentOperator = '';
    }
    else
    {
        currentOperator = e.target.textContent;
    }

}

function clearAll()
{
    displayValue.textContent = '0';
    currentNumber.length = 0;
    calculateNumbers.length = 0;
    currentOperator = '';
    currentTotal = 0;
}

function changeNumSign()
{
    let numb;
    if (currentNumber.length > 0)
    {
        numb = currentNumber.join("");
        if (numb.includes('.'))
        {
            numb = parseFloat(numb);
        }
        else
        {
            numb = Number(numb);
        }

        if (numb != 0)
        {
            numb = -numb;
        }

        numb = numb.toString();

        currentNumber.length = 0;
        currentNumber = Array.from(numb);

        displayValue.textContent = currentNumber.join("");
    }
    else
    {
        if (calculateNumbers.includes(Number(displayValue.textContent)))
        {
            numb = calculateNumbers[calculateNumbers.indexOf(Number(displayValue.textContent))];
        }
        else if(calculateNumbers.includes(parseFloat(displayValue.textContent)))
        {
            numb = calculateNumbers[calculateNumbers.indexOf(parseFloat(displayValue.textContent))];
        }

        if (numb != 0)
        {
            numb = -numb;
        }

        
        calculateNumbers.length = 0;
        calculateNumbers.push(numb)
       
        displayValue.textContent = numb.toString();
    }
}


function executeExtraFunc(e)
{
    if (e.target.id === 'clear')
    {
        clearAll();
    }
    else if(e.target.id === 'pos-neg')
    {
        changeNumSign();
    }
    else if (e.target.id === 'percentage')
    {
        takePercent();
    }
    else
    {
        deleteLast();
    }
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