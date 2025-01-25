document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const result = document.getElementById('result');
    const resetBtn = document.getElementById('resetBtn');
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    function handleCellClick(index) {
        if (gameState[index] !== '' || !gameActive) return;
        gameState[index] = currentPlayer;
        renderBoard();
        checkWinner();
        togglePlayer();
    }

    function renderBoard() {
        board.innerHTML = '';
        gameState.forEach((cell, index) => {
            const cellDiv = document.createElement('div');
            cellDiv.textContent = cell;
            cellDiv.classList.add('cell');
            cellDiv.addEventListener('click', () => handleCellClick(index));
            board.appendChild(cellDiv);
        });
    }

    function togglePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Current player : ${currentPlayer}`;
    }

    function checkWinner() {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        let winner = null;
        winningConditions.forEach((condition) => {
            const [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                winner = gameState[a];
                gameActive = false;
            }
        });

        if (winner) {
            result.textContent = `${winner} Wins !`;
            gameActive = false;
        } else if (!gameState.includes('')) {
            result.textContent = 'Match Draw !';
            gameActive = false;
        }
    }

    function resetGame() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.textContent = `Current player : ${currentPlayer}`;
        renderBoard();
        result.textContent = ` `;
    }

    resetBtn.addEventListener('click', resetGame);

    renderBoard();
    status.textContent = `Current player : ${currentPlayer}`;
});
