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
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calculate() {
    let result = document.getElementById('result').value;
    if (result !== '' && !isNaN(result[result.length - 1])) {
        try {
            let calculatedResult = eval(result);
            document.getElementById('result').value = numberWithCommas(calculatedResult);
        } catch (error) {
            document.getElementById('result').value = 'Error';
        }
    }
}