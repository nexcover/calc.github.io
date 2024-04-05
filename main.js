let input = "";
let output = document.getElementById("outputArea");
let inputArea = document.getElementById("inputArea");

function num1(num) {
    if (input.length === 0 && (num === '0' || num === '00')) {
        return;
    }
    if (input.length < Infinity) {
        input += num;
        inputArea.value = input;
        updateOutput();
        updateScroll();
    }
}

function dot() {
    if (input === "") {
        input = "0.";
    } else if (!input.includes('.')) {
        if (input === "0") {
            input = "0.";
        } else if (input.length < 100000000) {
            input += '.';
        }
    }
    inputArea.value = input;
    updateOutput();
    updateScroll();
}

function calculate(operator) {
    if (input === "" && operator !== '-' && operator !== '(') {
        return;
    }

    const lastChar = input[input.length - 1];
    if (['+', '-', '*', '/','(' ,')'].includes(lastChar) && operator !== '-') {
        return;
    }

    if (['+', '-', '*', '/','(' ,')'].includes(operator)) {
        if (['+', '-', '*', '/','(' ,')'].includes(lastChar)) {
            input = input.slice(0, -1);  // 마지막 연산자를 제거
        }
        input += operator;
        inputArea.value = input;
        updateOutput();
        updateScroll();
    }
}

function equal() {
    try {
        let result = eval(input);
        output.textContent = formatResult(result);
        input = result.toString();
    } catch (error) {
        output.textContent = "Error";
    }
}

function allClear() {
    input = "";
    inputArea.value = "0";
    updateOutput();
    updateScroll();
}

function del() {
    if (input.length > 0) {
        input = input.slice(0, -1);
        inputArea.value = input;
        updateOutput();
        updateScroll();
    }
}

function updateOutput() {
    try {
        let result = eval(input);
        output.textContent = formatResult(result);
    } catch (error) {
        output.textContent = "수식 입력중";
    }

    if (input === "") {
        output.textContent = "0";
    }
}

function formatResult(x) {
    return parseFloat(x.toFixed(4)).toLocaleString('en-US');
}

function updateScroll() {
    inputArea.scrollTop = inputArea.scrollHeight;
}

inputArea.addEventListener("input", function () {
    input = inputArea.value;
    updateOutput();
    updateScroll();
});