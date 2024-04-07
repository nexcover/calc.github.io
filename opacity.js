document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // 연하게 변경
            button.style.transition = 'background-color 0.5s ease';
            if (button.classList.contains('sign')) {
                button.style.backgroundColor = '#ffcc80'; // 연한 오렌지색으로 변경
            } else if (button.classList.contains('ac')) {
                button.style.backgroundColor = '#a0a0a2'; // 연한 색상으로 변경
            } else {
                button.style.backgroundColor = '#c0c0c2'; // 연한 색상으로 변경
            }

            // 원래 색상으로 다시 변경
            setTimeout(() => {
                button.style.transition = 'background-color 0.5s ease';
                if (button.classList.contains('sign')) {
                    button.style.backgroundColor = 'orange'; // 원래의 오렌지색으로 변경
                } else if (button.classList.contains('ac')) {
                    button.style.backgroundColor = '#636267'; // AC 버튼의 원래 색상으로 변경
                } else {
                    button.style.backgroundColor = '#828284'; // 그 외 버튼의 원래 색상으로 변경
                }
            }, 300);
        });
    });
});

