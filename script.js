class Calculator {
    constructor(displayInputElement, outputElement) {
        this.displayInputElement = displayInputElement;
        this.outputElement = outputElement;
        this.operatorCheck = true;
        this.equalsCheck = false;
        this.clear();
    }

    appendNumber(number) {
        const currentNumber = this.getCurrentNumber();

        // Check if adding this number would exceed 1 billion (10억)
        if ((currentNumber.length === 9 && currentNumber[0] !== '-') ||
            (currentNumber.length === 10 && currentNumber[0] === '-')) {
            return; // Do not append number if it exceeds 1 billion
        }

        // Prevent consecutive zeros unless it's after a decimal point
        if (number === '0' && currentNumber === '0') {
            return;
        }

        if (this.equalsCheck) {
            this.displayContent = number;
            this.equalsCheck = false;
        } else {
            this.displayContent += number;
        }
        this.operatorCheck = false;
        this.updateResult();
    }


    appendOperator(operator) {
        if (this.operatorCheck) return false;
        if (this.equalsCheck) this.equalsCheck = false;

        this.displayContent += ` ${operator} `;

        return this.operatorCheck = true;
    }

    updateResult() {
        try {
            let evaluatedContent = this.displayContent
                .replace(/\u00D7/g, '*')  // Replace × with *
                .replace(/\u00F7/g, '/'); // Replace ÷ with /

            // Handle consecutive multiplications: "2x2x2" => "2*2*2"
            evaluatedContent = evaluatedContent.replace(/(\d)x/g, '$1*');

            // Handle consecutive divisions: "8÷2÷2" => "8/2/2"
            evaluatedContent = evaluatedContent.replace(/(\d)÷/g, '$1/');

            let result = eval(evaluatedContent);

            // Limit decimal places to 6
            result = parseFloat(result.toFixed(6));

            // Check if the result is greater than 1 billion (10억)
            if (Math.abs(result) >= 1e10) {
                result = result.toExponential(2); // Convert to exponential notation
            } else {
                // Split the number into integer and fractional parts
                let parts = result.toString().split('.');
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Format integer part with commas

                // Remove commas from decimal part
                if (parts[1]) {
                    parts[1] = parts[1].replace(/,/g, '');
                }

                result = parts.join('.');
            }

            this.outputElement.value = result;
        } catch (error) {
            this.outputElement.value = '';
        }
    }

    formatNumberForDisplay(number) {
        const parts = number.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Format integer part with commas

        // Remove commas from decimal part
        if (parts[1]) {
            parts[1] = parts[1].replace(/,/g, '');
        }

        return parts.join('.');
    }

    updateDisplay() {
        let formattedDisplayContent = this.formatNumberForDisplay(this.displayContent);
        this.displayInputElement.value = formattedDisplayContent;
        this.scrollTextArea();
    }

    scrollTextArea() {
        this.displayInputElement.scrollTop = this.displayInputElement.scrollHeight;
    }

    clear() {
        this.displayContent = '';
        this.displayInputElement.value = 0;
        this.outputElement.value = 0;
        this.operatorCheck = true;
    }

    backspace() {
        // Check if the last character is an operator with 3 characters (e.g., " * ", " / ", " + ", " - ")
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
}

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
    });
});