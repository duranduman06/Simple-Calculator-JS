const input = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");
var displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

function updateDisplay(){
    input.value = displayValue;
    input.textContent = displayValue;
}

keys.addEventListener("click",(e)=>{
    const element = e.target;

    if(!element.matches('button')){
        return;
    }
    if(element.classList.contains("operator")){
        console.log("operator");
        ifInputOperator(element.value);
        updateDisplay();
        return;
    }
    if(element.classList.contains("decimal")){
        console.log("decimal");
        ifInputDecimal();
        updateDisplay();
        return;
    }
    if(element.classList.contains("clear")){
        console.log("clear");
        ifInputClear();
        updateDisplay();
        return;
    }
    ifInputNum(element.value);
    updateDisplay();
});

const ifInputOperator = (nextoperator)=>{
    const value = parseFloat(displayValue);
    
    if(firstValue === null){
        firstValue = value;
    }
    else if(operator){
        const result = calculateAllInput(firstValue, value,operator);
        displayValue = String(result);
        firstValue = result;
    }
    waitingForSecondValue = true;
    operator = nextoperator;
}

const calculateAllInput = (first,second,op) =>{
    switch(op) {
        case "+":
        return displayValue = first + second;
        case "-":
            return displayValue = first - second;
        case "x":
            return displayValue = first * second;
        case "/":
            return displayValue = first / second;
        default:
            return second;
    }
}

const ifInputNum = (num) =>{
    if (waitingForSecondValue){
        displayValue = num;
        waitingForSecondValue = false;
    }
    else{
        displayValue = displayValue === "0" ? num : displayValue + num;
    }
    console.log(displayValue,firstValue,operator,waitingForSecondValue);
}

const ifInputDecimal = () =>{
    if(!displayValue.includes(".")){
        displayValue += ".";
    }    
    console.log(displayValue);
}

const ifInputClear = () =>{
    displayValue = "0";
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
    console.log("clear",displayValue);
}