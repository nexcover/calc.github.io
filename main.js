let inputArea = document.getElementById('inputArea');
let outputArea = document.getElementById('outputArea');

function updateOutput() {
    let expression = inputArea.value;

    // 암시적인 곱셈을 위한 정규식 패턴
    let pattern = /(\d+)([\(a-zA-Z])(\d+)/g;
    expression = expression.replace(pattern, '$1*$2');

    try {
        let result = eval(expression);
        outputArea.value = result;
    } catch (error) {
        outputArea.value = 'Error';
    }
}

function num1(value) {
    if (value === '00' && inputArea.value.length === 0) {
        return; // 입력 올바르기 전에 '00' 입력 방지
    }
    inputArea.value += value;
    checkAndAdjustScroll();  // 숫자를 입력할 때 스크롤을 확인 및 조절합니다.
    updateOutput();
}

function calculate(operator) {
    let lastChar = inputArea.value.slice(-1); // 마지막 문자 가져오기

    if (inputArea.value === "" && ['*', '/', ')'].includes(operator)) {
        return; // 입력 올바르기 전에 '*' 또는 '/' 입력 방지
    }

    // 마지막 문자가 연산자인 경우
    if (['+', '-', '*', '/'].includes(lastChar)) {
        // 마지막 문자를 삭제하고 새로운 연산자로 대체
        inputArea.value = inputArea.value.slice(0, -1) + operator;
    } else {
        inputArea.value += operator;
    }

    checkAndAdjustScroll();  // 연산자를 입력할 때 스크롤을 확인 및 조절합니다.
    updateOutput();
}

function del() {
    inputArea.value = inputArea.value.slice(0, -1);
    checkAndAdjustScroll();  // 삭제할 때 스크롤을 확인 및 조절합니다.
    updateOutput();
}

function dot() {
    if (inputArea.value === "") {
        return; // 입력 올바르기 전에 '.' 입력 방지
    }

    inputArea.value += '.';
    updateOutput();
}

function allClear() {
    inputArea.value = '';
    outputArea.value = '0';
}

function checkAndAdjustScroll() {
    if (inputArea.scrollHeight > 100) {  // 예를 들어, 100px을 기준으로 스크롤을 조절합니다.
        inputArea.scrollTop = inputArea.scrollHeight;  // 스크롤 위치를 마지막으로 조절합니다.
    }
}

// 수식 입력시 자동으로 결과 업데이트
inputArea.addEventListener('input', updateOutput);