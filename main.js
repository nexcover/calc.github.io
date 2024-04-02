let input = "";
let output = document.getElementById("outputArea");

function num1(num) {
    input += num;
    document.getElementById("inputArea").value = input;
    updateOutput();
}

function dot() {
    if (!input.includes('.')) {
        input += '.';
        document.getElementById("inputArea").value = input;
        updateOutput();
    }
}

function calculate(operator) {
    // '%' 연산자일 경우
    if (operator === '%') {
        if (!isNaN(input)) {
            // 숫자라면 100을 곱함
            input = parseFloat(input) * 100;
            document.getElementById("inputArea").value = input;
            updateOutput();
        } else {
            // 숫자가 아닐 경우 기존 로직을 수행
            input += operator;
            document.getElementById("inputArea").value = input;
            updateOutput();
        }
    } else {
        // 일반 연산자일 경우
        input += operator;
        document.getElementById("inputArea").value = input;
        updateOutput();
    }
}

function equal() {
    try {
        let result = eval(input);
        output.textContent = result;
        input = result.toString();
    } catch (error) {
        output.textContent = "Error";
    }
}

function allClear() {
    input = "";
    document.getElementById("inputArea").value = "";
    updateOutput();
}

function del() {
    input = input.slice(0, -1);
    document.getElementById("inputArea").value = input;
    updateOutput();
}

function updateOutput() {
    try {
        let result = eval(input);
        output.textContent = result;
    } catch (error) {
        output.textContent = "Error";
    }

    // input이 비어 있을 경우 0 출력
    if (input === "") {
        output.textContent = "0";
    }
}

// inputArea에 수식 입력 시 자동으로 updateOutput 함수 호출
document.getElementById("inputArea").addEventListener("input", function () {
    input = document.getElementById("inputArea").value;
    updateOutput();
});
