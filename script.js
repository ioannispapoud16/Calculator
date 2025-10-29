// Calculator state
let currentOperand = '0';
let previousOperand = '';
let operation = null;
let resetScreen = false;

// DOM elements
const displayOperation = document.getElementById('operetion');
const displayResult = document.getElementById('result');
const numberButtons = document.querySelectorAll('.numberBtn');
const operatorButtons = document.querySelectorAll('.operatorBtn');
const clearButton = document.getElementById('clearBtn');
const backButton = document.getElementById('backBtn');
const decimalButton = document.getElementById('decBtn');

// Event listeners
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.textContent);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleOperator(button.textContent);
    });
});

clearButton.addEventListener('click', clear);
backButton.addEventListener('click', backspace);
decimalButton.addEventListener('click', appendDecimal);

// Keyboard support
document.addEventListener('keydown', handleKeyboardInput);

// Functions
function appendNumber(number) {
    if (currentOperand === '0' || resetScreen) {
        currentOperand = number;
        resetScreen = false;
    } else {
        currentOperand += number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (resetScreen) {
        currentOperand = '0.';
        resetScreen = false;
    } else if (!currentOperand.includes('.')) {
        currentOperand += '.';
    }
    updateDisplay();
}

function handleOperator(op) {
    if (op === '=') {
        calculate();
        return;
    }

    if (previousOperand !== '' && operation !== null && !resetScreen) {
        calculate();
    }

    operation = op;
    previousOperand = currentOperand;
    resetScreen = true;
    updateDisplay();
}

function calculate() {
    if (operation === null || resetScreen) return;

    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    let computation;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert("Cannot divide by zero!");
                clear();
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }

    currentOperand = computation.toString();
    operation = null;
    previousOperand = '';
    resetScreen = true;
    updateDisplay();
}

function clear() {
    currentOperand = '0';
    previousOperand = '';
    operation = null;
    resetScreen = false;
    updateDisplay();
}

function backspace() {
    if (currentOperand.length > 1) {
        currentOperand = currentOperand.slice(0, -1);
    } else {
        currentOperand = '0';
    }
    updateDisplay();
}

function updateDisplay() {
    displayResult.textContent = currentOperand;
    
    if (operation !== null) {
        displayOperation.textContent = `${previousOperand} ${operation}`;
    } else {
        displayOperation.textContent = previousOperand || '_';
    }
}

function handleKeyboardInput(e) {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendDecimal();
    if (e.key === '=' || e.key === 'Enter') handleOperator('=');
    if (e.key === '+') handleOperator('+');
    if (e.key === '-') handleOperator('-');
    if (e.key === '*') handleOperator('×');
    if (e.key === '/') {
        e.preventDefault();
        handleOperator('÷');
    }
    if (e.key === 'Escape') clear();
    if (e.key === 'Backspace') backspace();
}

// Initialize display
updateDisplay();



