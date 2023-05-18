import { cellCoordinates } from "./gameData.js";
import { modifyElementClass, showDrawScreen, showWinScreen } from "./elementUtils.js";
import { addRestartButtonEvent } from "./eventUtils.js";
import { allUsers, createLostResult, createWinResult, load, save } from "./userManagement.js";

let currentPlayer = 'X';
let lostPlayer = "";
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

function makeMark(row, col) {
    if (board[row][col] === '') {
        updateCell(row, col, currentPlayer);
        togglePlayerOpacity(currentPlayer, "remove", "opacity-1");
        updateGameStatus(row, col);
        togglePlayerOpacity(currentPlayer, "add", "opacity-1");
        console.log(row, col)
    }
}

export function resetBoard() {
    currentPlayer = 'X';
    clearBoard();
    toggleCellEvent("remove", "event-none");
    modifyElementClass("div-with-btn-restart", "add", "d-none");
    modifyElementClass("win-screen", "add", "d-none");
    modifyElementClass("draw-screen", "add", "d-none");
    togglePlayerOpacity("X", "add", "opacity-1");
    togglePlayerOpacity("O", "remove", "opacity-1");
}

function clearBoard() {
    const line = document.getElementById("line");
    let cells = document.getElementsByClassName('cell');
    board = [['', '', ''], ['', '', ''], ['', '', '']];
    line.className = "";
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = '';
    }
}

function addGameResult(win, lost) {
    lost = (win === "X") ? "O" : "X";
    const winPlayer = document.getElementById(`name-player-${win}`).textContent;
    const lostPlayer = document.getElementById(`name-player-${lost}`).textContent;
    updateUserResults(winPlayer, lostPlayer);
    updateWinPlayer(winPlayer);
    save();
    load();
}

function updateUserResults(winPlayer, lostPlayer) {
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i][`name`] === winPlayer) {
            allUsers[i][`allResults`].push(createWinResult(lostPlayer));
        } else if (allUsers[i][`name`] === lostPlayer) {
            allUsers[i][`allResults`].push(createLostResult(winPlayer));
        }
    }
}

function updateWinPlayer(winPlayer) {
    document.getElementById("win-player").textContent = winPlayer;
}

function updateGameStatus(row, col) {
    handleMove(row, col);
    handleGameEnd();
}

function handleMove(row, col) {
    if (checkWin(currentPlayer)) {
        showWinningLine(row, col, currentPlayer);
        setLostPlayer(currentPlayer);
        showWinScreen();
    } else if (checkDraw()) {
        showDrawScreen();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function handleGameEnd() {
    if (checkWin(currentPlayer) || checkDraw()) {
        modifyElementClass("div-with-btn-restart", "remove", "d-none");
        addRestartButtonEvent();
        toggleCellEvent("add", "event-none");
        addGameResult(currentPlayer, lostPlayer);
    }
}

function updateCell(row, col, currentPlayer) {
    const cell = document.getElementsByClassName('cell')[row * 3 + col];
    board[row][col] = currentPlayer;
    cell.innerHTML = `<img src="../src/img/${currentPlayer}.png">`;
}

function showWinningLine(row, col, winPlayer) {
    const line = document.getElementById("line");
    checkWinningLine(row, col, line);
    finalizeWinningLine(line, winPlayer)
}

function checkWin(player) {
    const diagonal1 = [board[0][0], board[1][1], board[2][2]];
    const diagonal2 = [board[2][0], board[1][1], board[0][2]];
    const allRowsColumnsDiagonals = [...board, ...board.map((_, i) => [board[0][i], board[1][i], board[2][i]]), diagonal1, diagonal2];
    return allRowsColumnsDiagonals.some(rowColDiagonal =>
        rowColDiagonal.every(cell => cell === player)
    );
}

export function checkDraw() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === '') {
                return false;
            }
        }
    }
    return true;
}

function checkWinningLine(row, col, line) {
    if (board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
        setHorizontalLinePosition(line, row);
    } else if (board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
        setVerticalLinePosition(line, col);
    } else if (row === col && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        setDiagonalLine(line, "rotate-45");
    } else if (row + col === 2 && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        setDiagonalLine(line, "rotate--45");
    }
}

function finalizeWinningLine(line, winPlayer) {
    line.classList.add("opacity-1");
    line.classList.add("z-index-100");
}

function setHorizontalLinePosition(line, row) {
    if (row === 0) {
        line.style.top = `15%`;
    } else if (row === 1) {
        line.style.top = `50%`;
    } else if (row === 2) {
        line.style.top = `83%`;
    }
    line.style.left = `0`;
}

function setVerticalLinePosition(line, col) {
    line.classList.add("rotate-90");
    if (col === 0) {
        line.style.left = `-34%`;
    } else if (col === 1) {
        line.style.left = `0`;
    } else if (col === 2) {
        line.style.left = `33%`;
    }
}

function setDiagonalLine(line, rotation) {
    line.classList.add(rotation);
}

function togglePlayerOpacity(player, action, className) {
    document.getElementById(`btn-player-${player}`).classList[action](className);
}


function toggleCellEvent(action, className) {
    for (let i = 0; i < cellCoordinates.length; i++) {
        document.getElementsByClassName("cell")[i].classList[action](className);
    }
}

function toggleBoardEvent(action, className) {
    document.getElementById("board").classList[action](className);
}

function computerMakeMove() {
    const emptyCells = getEmptyCells();
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomCell = emptyCells[randomIndex];
    const row = randomCell.row;
    const col = randomCell.col;
    makeMark(row, col);
    toggleBoardEvent("remove", "event-none");
}

function getEmptyCells() {
    const emptyCells = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === '') {
                emptyCells.push({ row: i, col: j });
            }
        }
    }
    return emptyCells;
}

function handleCellClick(row, col) {
    makeMark(row, col);
    if (!checkWin(currentPlayer) && !checkDraw()) {
        toggleBoardEvent("add", "event-none");
        setTimeout(computerMakeMove, 1000);
    }
}

export function handlePlayerMove(row, col) {
    const playerO = document.getElementById("name-player-O").textContent;
    if (playerO === "Computer") {
        handleCellClick(row, col);
    } else {
        makeMark(row, col);
    }
}

function setLostPlayer(winPlayer) {
    lostPlayer = (winPlayer === "X") ? "O" : "X";
}