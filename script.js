// 초기 값 및 연산자 설정
let displayValue = "";
let operators = ['+', '−', '×', '÷'];

// 숫자 형식 변환 함수
function formatNumber(number) {
    let parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

// 화면 업데이트 함수
function updateDisplay() {
    document.getElementById("display").innerText = formatNumber(displayValue);
    document.getElementById("display").scrollTop = document.getElementById("display").scrollHeight;
}

// 숫자 추가 함수
function appendNumber(number) {
    if (displayValue === "0") {
        displayValue = number.toString();
    } else {
        displayValue += number;
    }
    updateDisplay();
}

// 연산자 추가 함수
function appendOperator(operator) {
    if (displayValue === "") return;

    let lastChar = displayValue.slice(-1);

    if (lastChar === ' ') {
        displayValue = displayValue.slice(0, -3);
    } else if (operators.includes(lastChar)) {
        displayValue = displayValue.slice(0, -1);
    }

    if (displayValue === "" && operator === '−') {
        displayValue += operator;
    } else {
        displayValue += ' ' + operator + ' ';
    }

    updateDisplay();
}

// 소수점 추가 함수
function appendDot() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
}

// 화면 초기화 함수
function clearDisplay() {
    displayValue = "0";
    updateDisplay();
    document.getElementById("result").innerText = "0";
}

// 마지막 문자 삭제 함수
function deleteLast() {
    if (displayValue.endsWith(' ')) {
        displayValue = displayValue.slice(0, -3);
    } else {
        displayValue = displayValue.slice(0, -1);
    }
    updateDisplay();
}

// 계산 함수
function calculate() {
    let expression = displayValue;
    let result;

    try {
        expression = expression.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-');
        result = eval(expression);

        if (result > 1000000000 || result < -1000000000) {
            result = result.toExponential(1);
        } else {
            result = parseFloat(result.toFixed(8));
        }
    } catch (error) {
        result = "잘못된 표현식입니다.";
    }

    document.getElementById("result").innerText = formatNumber(result);
}