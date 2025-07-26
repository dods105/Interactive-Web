const screen = document.querySelector('.screen');
const buttons = document.querySelectorAll('button');

let calculation = [];
let accumulativeCalculation;

function calculate (button){
    const value = button.textContent;

    if(value === 'AC'){
        calculation = [];
        screen.textContent = '';
    }else if(value === '='){
        screen.textContent = eval(accumulativeCalculation);
    }else{
        calculation.push(value);
        accumulativeCalculation = calculation.join('');
        screen.textContent = accumulativeCalculation
    }
};

buttons.forEach(button => button.addEventListener('click', () => calculate(button)));