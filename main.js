let expression = "";
let resultDiv = document.getElementById("result");
let expressionTextarea = document.getElementById("expression");

function num(num) {
    expression += num;
    expressionTextarea.value = expression;
    scrollToBottom();
}

function calc(operator) {
    expression += operator;
    expressionTextarea.value = expression;
    scrollToBottom();
}

function clearResult() {
    expression = "";
    expressionTextarea.value = expression;
    scrollToBottom();
    resultDiv.innerText = "";
}

function deleteLast() {
    expression = expression.slice(0, -1);
    expressionTextarea.value = expression;
    scrollToBottom();
}

function calculate() {
    try {
        let result = eval(expression);
        if (typeof result !== "number" || isNaN(result) || !isFinite(result) || result >= 1e9) {
            resultDiv.innerText = "Invalid expression or too large number";
        } else {
            resultDiv.innerText = result.toLocaleString();
        }
    } catch (error) {
        resultDiv.innerText = "Error";
    }
}

function scrollToBottom() {
    expressionTextarea.scrollTop = expressionTextarea.scrollHeight;
}
