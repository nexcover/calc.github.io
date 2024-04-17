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
    // 스크롤을 가장 아래로 이동
    document.getElementById("display").scrollTop = document.getElementById("display").scrollHeight;
}

// 숫자 추가 함수
function appendNumber(number) {
    // displayValue가 비어있거나, displayValue가 "0"인 경우
    if (displayValue === "" || displayValue === "0") {
        displayValue = number.toString();
    } else {
        displayValue += number;
    }
    updateDisplay();
}


// 연산자 추가 함수
function appendOperator(operator) {
    // 입력된 값이 비어있으면 함수를 종료합니다.
    if (displayValue === "") return;

    // 마지막으로 입력된 문자를 가져옵니다.
    let lastChar = displayValue.slice(-1);

    // 마지막으로 입력된 문자가 공백인 경우, 3칸을 지웁니다.
    if (lastChar === ' ') {
        displayValue = displayValue.slice(0, -3);
    }
    // 마지막으로 입력된 문자가 연산자인 경우, 기존 연산자를 삭제합니다.
    else if (operators.includes(lastChar)) {
        displayValue = displayValue.slice(0, -1);
    }

    // displayValue가 비어있고, 입력된 연산자가 -인 경우
    if (displayValue === "" && operator === '−') {
        displayValue += operator;
    } else {
        // 새로운 연산자를 추가합니다.
        displayValue += ' ' + operator + ' ';
    }

    // 화면을 업데이트합니다.
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
        // 연산자를 실제 연산에 사용하기 위해 replace를 활용하여 변환
        expression = expression.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-');
        result = eval(expression);
        result = parseFloat(result.toFixed(8)); // 결과를 소수점 8자리까지 표시
    } catch (error) {
        result = "잘못된 표현식입니다.";
    }

    // 결과를 화면에 표시합니다.
    document.getElementById("result").innerText = formatNumber(result);
}