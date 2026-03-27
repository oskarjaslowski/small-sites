let runningTotal = 0;
let buffer = "0";
let show = buffer;
let prevOperator;

const screen = document.querySelector('.screen')

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = show;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            show = buffer;
            runningTotal=0;
            break;
        case '=':
            if(prevOperator === null){
                return;
            }
            flushOperation(parseFloat(buffer));
            prevOperator = null;
            buffer = runningTotal;
            if(isInteger(runningTotal)) show = buffer;
            else show = (Math.round(buffer * 100)/100).toFixed(2);
            runningTotal = 0;
            break;
        case '←':
            if(buffer.length===1){
                buffer = '0';
                show = buffer;
            }else{
                buffer=buffer.substring(0,buffer.length-1);
                show = buffer;
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if(buffer==='0'){
        return;
    }
    const intBuffer = parseFloat(buffer);

    if(runningTotal===0){
        runningTotal=intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    prevOperator=symbol;
    buffer='0';
    if (symbol==='−') {
        if(isInteger(runningTotal)) show = runningTotal+'-';
        else show = (Math.round(runningTotal * 100)/1000).toFixed(2)+'-';
    }
    else {
        if(isInteger(runningTotal)) show = runningTotal+symbol;
        else show = (Math.round(runningTotal * 100)/100).toFixed(2)+symbol;
    }
}

function isInteger(n) {
    return n % 1 === 0;
 }

function flushOperation(intBuffer){
    if(prevOperator==='+'){
        runningTotal += intBuffer;
    }else if(prevOperator==='−'){
        runningTotal -= intBuffer;
    }else if(prevOperator==='×'){
        runningTotal *= intBuffer;
    }else if(prevOperator==='÷'){
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString){
    if(buffer==='0' && show==='0' || show===0){
        buffer=numberString;
        show = buffer;
    }else if(buffer==='0'){
        buffer=numberString;
        show += String(buffer);
    }else{
        buffer+=numberString;
        show += String(buffer%10);
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click',function(event){
        buttonClick(event.target.innerText);
    })
}

init();