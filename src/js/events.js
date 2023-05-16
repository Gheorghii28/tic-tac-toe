import { value } from "./data.js";
import { changeDisplay, openChoisePlayerWindow, openHomePage, openLogInPopUp } from "./display.behavior.js";
import { makeMove, resetBoard } from "./script.js";
import { logIn } from "./user.js";

export function loadAllEvents() {
    eventBtnSingleplayerConfirm();
    eventBtnMultiplayerConfirm();
    eventBtnSingleplayer();
    eventBtnMultiplayer();
    eventBack();
    eventBtnMode();
    eventsChangeMode();
    eventCell();
}

export function eventPlay() {
    document.getElementById("btn-restart").addEventListener("click", resetBoard, { once: true })
}

function eventBtnSingleplayerConfirm() {
    document.getElementById("btn-singleplayer-confirm").addEventListener("click", el => {
        logIn(el, "singleplayer-input", "");
    });
}

function eventBtnMultiplayerConfirm() {
    document.getElementById("btn-multiplayer-confirm").addEventListener("click", el => {
        logIn(el, "player-1-input", "player-2-input");
    });
}

function eventBtnSingleplayer() {
    document.getElementById("btn-singleplayer").addEventListener("click", () => {
        openLogInPopUp("singleplayer-window");
    });
}

function eventBtnMultiplayer() {
    document.getElementById("btn-multiplayer").addEventListener("click", () => {
        openLogInPopUp("multiplayer-window");
    });
}

function eventBack() {
    const btnBack = document.getElementsByClassName("back");
    for (let i = 0; i < btnBack.length; i++) {
        btnBack[i].addEventListener("click", el => {
            const id = el.target.parentElement.parentElement.attributes.id.value;
            openHomePage(id);
        });
    }
}

function eventBtnMode() {
    document.getElementById("btn-select-mode").addEventListener("click", () => {
        changeDisplay("div-select-mode", "toggle", "d-none");
    });
}

function eventsChangeMode() {
    const btnSingleplayer = document.getElementById("div-select-mode").children[0];
    const btnMultiplayer = document.getElementById("div-select-mode").children[1];
    const inputs = document.getElementsByTagName("input");
    btnSingleplayer.addEventListener("click", () => {
        openChoisePlayerWindow("singleplayer-window", inputs);
    });
    btnMultiplayer.addEventListener("click", () => {
        openChoisePlayerWindow("multiplayer-window", inputs);
    });
}

function eventCell() {
    for (let i = 0; i < value.length; i++) {
        const row = value[i][`row`];
        const col = value[i][`col`];
        document.getElementsByClassName("cell")[i].addEventListener("click", () => { makeMove(row, col) })
    }
}