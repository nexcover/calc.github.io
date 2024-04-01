let expression = "";
        let resultDiv = document.getElementById("result");

        function num(num) {
            expression += num;
            document.getElementById("expression").value = expression;
        }

        function calc(operator) {
            expression += operator;
            document.getElementById("expression").value = expression;
        }

        function clearResult() {
            expression = "";
            document.getElementById("expression").value = expression;
            resultDiv.innerText = "";
        }

        function deleteLast() {
            expression = expression.slice(0, -1);
            document.getElementById("expression").value = expression;
        }

        function calculate() {
            try {
                let result = eval(expression);
                if (typeof result !== "number" || isNaN(result) || !isFinite(result)) {
                    resultDiv.innerText = "Invalid expression";
                } else {
                    resultDiv.innerText = result.toLocaleString(); // 천 단위 구분 콤마 추가
                }
            } catch (error) {
                resultDiv.innerText = "Error";
            }
        }