function num(num) {
    let result = document.getElementById('result').value;
    if (result !== '0') {  // 0이 제일 앞에 나오지 않도록
        document.getElementById('result').value += num;
    } else {
        document.getElementById('result').value = num;
    }
}

function calc(operator) {
    let result = document.getElementById('result').value;
    if (result !== '' && !isNaN(result[result.length - 1])) {
        document.getElementById('result').value += operator;
    }
}

function clearResult() {
    document.getElementById('result').value = '';
}

function deleteLast() {
    let result = document.getElementById('result').value;
    document.getElementById('result').value = result.slice(0, -1);
}

function numberWithCommas(x) {
    // 정수 부분과 소수점 부분을 분리
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function calculate() {
    let result = document.getElementById('result').value;
    if (result !== '' && !isNaN(result[result.length - 1])) {
        try {
            let calculatedResult = eval(result);
            // 나누기 계산의 경우 소수점 이하에서는 1000단위 구분 적용하지 않도록
            if (result.includes('/')) {
                document.getElementById('result').value = calculatedResult;
            } else {
                document.getElementById('result').value = numberWithCommas(calculatedResult);
            }
        } catch (error) {
            document.getElementById('result').value = 'Error';
        }
    }
}
