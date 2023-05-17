const calculator = document.querySelector('.calculator')
const display = calculator.querySelector('.calculator__display')
const keys = calculator.querySelector('.calculator__keys')

let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;

    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'))

    if (!action) {
      if (displayedNum === '0' || waitingForSecondValue) {
        display.textContent = keyContent;
        waitingForSecondValue = false;
      } else {
        display.textContent = displayedNum + keyContent;
      }
    }

    if (action === 'decimal') {
      if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.';
      }
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      key.classList.add('is-depressed');
      if (firstValue && operator && !waitingForSecondValue) {
        const result = calculate(firstValue, operator, displayedNum);
        display.textContent = result;
        firstValue = result;
      } else {
        firstValue = displayedNum;
      }
      operator = action;
      waitingForSecondValue = true;
    }

    if (action === 'clear') {
      display.textContent = '0';
      firstValue = null;
      operator = null;
      waitingForSecondValue = false;
    }
    if (action === 'calculate') {
      if (firstValue && operator && !waitingForSecondValue) {
        const result = calculate(firstValue, operator, displayedNum);
        display.textContent = result;
        firstValue = result;
        operator = null;
        waitingForSecondValue = false;
      }
    }
    if (action === 'percentage') {
      const currentValue = parseFloat(displayedNum);
      const percentage = currentValue / 100;
      display.textContent = percentage;
      calculator.dataset.previousKeyType = 'percentage';
    }
    if (action === 'square') {
      const currentValue = parseFloat(displayedNum);
      const squaredValue = currentValue ** 2;
      display.textContent = squaredValue;
      calculator.dataset.previousKeyType = 'square';
    }

    if (action === 'squareRoot') {
      const currentValue = parseFloat(displayedNum);
      const squareRootValue = Math.sqrt(currentValue);
      display.textContent = squareRootValue;
      calculator.dataset.previousKeyType = 'squareRoot';
    }

  }

})

const calculate = (n1, operator, n2) => {
  let result = ''
  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2)
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2)
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2)
  } else if (operator === 'divide') {
    result = parseFloat(n1) / parseFloat(n2)
  }

  return result
}
