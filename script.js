class Calculator {
    constructor(displayInputElement, outputElement) {
        this.displayInputElement = displayInputElement;
        this.outputElement = outputElement;
        this.operatorCheck = true;
        this.clear();
    }

    appendNumber(number) {
        const currentNumber = this.getCurrentNumber();

        if ((currentNumber.length === 10 && currentNumber[0] !== '-') ||
            (currentNumber.length === 11 && currentNumber[0] === '-')) {
            return;
        }

        if (number === '0' && currentNumber === '0') {
            return;
        }

        this.displayContent += number;
        this.operatorCheck = false;
        this.updateResult();
    }

    appendOperator(operator) {
        if (this.operatorCheck) return false;

        this.displayContent += ` ${operator} `;
        return this.operatorCheck = true;
    }

    updateResult() {
        try {
            let evaluatedContent = this.displayContent
                .replace(/\u00D7/g, '*')
                .replace(/\u00F7/g, '/');

            evaluatedContent = evaluatedContent.replace(/(\d)x/g, '$1*');
            evaluatedContent = evaluatedContent.replace(/(\d)÷/g, '$1/');

            let result = eval(evaluatedContent);

            result = parseFloat(result.toFixed(6));

            if (Math.abs(result) >= 1e10) {
                result = result.toExponential(2);
            } else {
                let parts = result.toString().split('.');
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                if (parts[1]) {
                    parts[1] = parts[1].replace(/,/g, '');
                }
                result = parts.join('.');
            }

            this.outputElement.innerText = result;
        } catch (error) {
            this.outputElement.innerText = '';
        }
    }

    formatNumberForDisplay(number) {
        const parts = number.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (parts[1]) {
            parts[1] = parts[1].replace(/,/g, '');
        }
        return parts.join('.');
    }

    updateDisplay() {
        let formattedDisplayContent = this.formatNumberForDisplay(this.displayContent);
        this.displayInputElement.innerText = formattedDisplayContent;
        this.scrollTextArea();
    }

    scrollTextArea() {
        this.displayInputElement.scrollTop = this.displayInputElement.scrollHeight;
    }

    clear() {
        this.displayContent = '';
        this.displayInputElement.innerText = 0;
        this.outputElement.innerText = 0;
        this.operatorCheck = true;
    }

    backspace() {
        const lastThreeChars = this.displayContent.slice(-1);
        if (lastThreeChars.trim().length >= 1) {
            this.displayContent = this.displayContent.slice(0, -1);
        } else {
            this.displayContent = this.displayContent.slice(0, -3);
        }
        this.updateResult();
        this.updateDisplay();
    }

    getCurrentNumber() {
        const numbers = this.displayContent.split(/[-+\u00D7\u00F7]/);
        return numbers[numbers.length - 1];
    }

    changeButtonStyle(button, color) {
        button.style.transition = 'background-color 0.5s ease';
        button.style.backgroundColor = color;
        setTimeout(() => {
            button.style.transition = 'background-color 0.5s ease';
            if (button.classList.contains('sign')) {
                button.style.backgroundColor = 'orange';
            } else if (button.classList.contains('ac')) {
                button.style.backgroundColor = '#636267';
            } else {
                button.style.backgroundColor = '#828284';
            }
        }, 250);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    const displayInputElement = document.querySelector('#inputArea');
    const outputElement = document.querySelector('#outputArea');
    const calculator = new Calculator(displayInputElement, outputElement);

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            switch (button.dataset.type) {
                case 'operator':
                    if (calculator.appendOperator(button.innerText)) {
                        calculator.updateDisplay();
                    }
                    break;
                case 'ac':
                    calculator.clear();
                    break;
                case 'backspace':
                    calculator.backspace();
                    break;
                default:
                    calculator.appendNumber(button.innerText);
                    calculator.updateDisplay();
                    break;
            }

            calculator.changeButtonStyle(button, button.classList.contains('sign') ? '#ffcc80' :
                button.classList.contains('ac') ? '#a0a0a2' : '#c0c0c2');
        });
    });
});