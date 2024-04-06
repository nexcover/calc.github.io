class Calculator {
    constructor(displayInputElement, outputElement) {
        this.displayInputElement = displayInputElement;
        this.outputElement = outputElement;
        this.operatorCheck = true;
        this.equalsCheck = false;
        this.clear();
    }

    appendNumber(number) {
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
            let formattedResult = this.formatNumberWithCommas(result);
            this.outputElement.value = formattedResult;
        } catch (error) {
            this.outputElement.value = 'Error';
        }
    }


    formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    updateDisplay() {
        let formattedDisplayContent = this.formatNumberWithCommas(this.displayContent);
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
