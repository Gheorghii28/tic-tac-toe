import { value } from "./data.js";
import { changeDisplay } from "./display.behavior.js";
import { eventPlay, loadAllEvents } from "./events.js";

export let allUsers = [];
let currentPlayer = 'X';
let board = [['', '', ''], ['', '', ''], ['', '', '']];

init();

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        await fetchFile(element);
    }
    loadAllEvents();
}

async function fetchFile(element) {
    let file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
        element.innerHTML = await resp.text();
    } else {
        element.innerHTML = 'Page not found';
    }
}

function init() {
    window.addEventListener("DOMContentLoaded", includeHTML);
}

export function save() {
    let usersArr = JSON.stringify(allUsers);
    localStorage.setItem("allUsers", usersArr);
}

export function load() {
    let usersArr = localStorage.getItem("allUsers");
    if (usersArr) {
        allUsers = JSON.parse(usersArr);
    }
}



export function makeMove(row, col) {
    if (board[row][col] === '') {
        const cell = document.getElementsByClassName('cell')[row * 3 + col];
        board[row][col] = currentPlayer;
        cell.innerHTML = `<img src="../src/img/${currentPlayer}.png">`;

        if (checkWin(currentPlayer)) {
            cellNoneEvent("add");
        } else if (checkDraw()) {
            cellNoneEvent("add");
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
        if(checkWin(currentPlayer) || checkDraw()) {
            eventPlay();
            changeDisplay("div-with-btn-restart", "remove", "d-none");
        }
    }
}

function checkWin(player) {
    for (let i = 0; i < board.length; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
            return true; // Horizontal win
        }
        if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
            return true; // Vertical win
        }
    }
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
        return true; // Diagonal win
    }
    if (board[2][0] === player && board[1][1] === player && board[0][2] === player) {
        return true; // Diagonal win
    }
    return false;
}

function checkDraw() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === '') {
                return false; // The board is not full
            }
        }
    }
    return true;
}

export function resetBoard() {
    currentPlayer = 'X';
    board = [['', '', ''], ['', '', ''], ['', '', '']];

    let cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = '';
    }
    cellNoneEvent("remove");
    changeDisplay("div-with-btn-restart", "add", "d-none");
}

function cellNoneEvent(action) {
    for(let i = 0; i < value.length; i++) {
        document.getElementsByClassName("cell")[i].classList[action]("event-none")
    }
}