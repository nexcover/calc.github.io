let input = "";
        let output = document.getElementById("outputArea");

        function num1(num) {
            // 맨 처음 0을 입력할 때 0이 한 번만 입력되도록 처리
            if (input.length === 0 && num === '0') {
                return;
            }
            if (input.length < 8) { // 10,000,000 = 8자리
                input += num;
                document.getElementById("inputArea").value = input;
                updateOutput();
            }
        }

        function dot() {
            if (!input.includes('.') && input.length < 100000000) {
                input += '.';
                document.getElementById("inputArea").value = input;
                updateOutput();
            }
        }

        function calculate(operator) {
            // 맨 앞에 수식 기호가 나오지 않도록 검사
            if (input.length === 0 && ['+', '-', '*', '/', ')'].includes(operator)) {
                return;
            }

            // 마지막 입력이 수식 기호이거나 ')'일 때 '%'는 적용하지 않음
            const lastChar = input[input.length - 1];
            if (['+', '-', '*', '/', ')'].includes(lastChar) && operator === '%') {
                return;
            }

            if (operator === '%') {
                // input이 비어있을 때 '%' 연산자를 적용하지 않음
                if (!isNaN(input) && input !== "") {
                    input = parseFloat(input) * 100;
                    document.getElementById("inputArea").value = input;
                    updateOutput();
                }
            } else {
                input += operator;
                document.getElementById("inputArea").value = input;
                updateOutput();
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
                output.textContent = formatResult(result);
            } catch (error) {
                output.textContent = "잘못된 연산입니다.";
            }

            if (input === "") {
                output.textContent = "0";
            }
        }

        function formatResult(x) {
            // Format the result to display up to 4 decimal places without commas
            return parseFloat(x.toFixed(4)).toString();
        }

        document.getElementById("inputArea").addEventListener("input", function () {
            input = document.getElementById("inputArea").value;
            updateOutput();
        })