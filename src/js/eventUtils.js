import { cellCoordinates } from "./gameData.js";
import { modifyElementClass, showPlayerSelectionPopup, showHomePage, showLogInPopUp } from "./elementUtils.js";
import { makeMark, resetBoard } from "./gameLogic.js";
import { handleLogIn } from "./userLogin.js";

export function loadAllEvents() {
    addSingleplayerConfirmEvent();
    addMultiplayerConfirmEvent();
    addSingleplayerEvent();
    addMultiplayerEvent();
    addBackEvent();
    addModeButtonEvent();
    addChangeModeEvents();
    addCellClickEvents();
}

export function addRestartButtonEvent() {
    document.getElementById("btn-restart").addEventListener("click", resetBoard, { once: true })
}

function addSingleplayerConfirmEvent() {
    document.getElementById("btn-singleplayer-confirm").addEventListener("click", el => {
        handleLogIn(el, "singleplayer-input", "");
    });
}

function addMultiplayerConfirmEvent() {
    document.getElementById("btn-multiplayer-confirm").addEventListener("click", el => {
        handleLogIn(el, "player-X-input", "player-O-input");
    });
}

function addSingleplayerEvent() {
    document.getElementById("btn-singleplayer").addEventListener("click", () => {
        showLogInPopUp("singleplayer-window");
    });
}

function addMultiplayerEvent() {
    document.getElementById("btn-multiplayer").addEventListener("click", () => {
        showLogInPopUp("multiplayer-window");
    });
}

function addBackEvent() {
    const btnBack = document.getElementsByClassName("back");
    for (let i = 0; i < btnBack.length; i++) {
        btnBack[i].addEventListener("click", el => {
            const id = el.target.parentElement.parentElement.attributes.id.value;
            showHomePage(id);
        });
    }
}

function addModeButtonEvent() {
    document.getElementById("btn-select-mode").addEventListener("click", () => {
        modifyElementClass("div-select-mode", "toggle", "d-none");
    });
}

function addChangeModeEvents() {
    const btnSingleplayer = document.getElementById("div-select-mode").children[0];
    const btnMultiplayer = document.getElementById("div-select-mode").children[1];
    const inputs = document.getElementsByTagName("input");
    btnSingleplayer.addEventListener("click", () => {
        showPlayerSelectionPopup("singleplayer-window", inputs);
    });
    btnMultiplayer.addEventListener("click", () => {
        showPlayerSelectionPopup("multiplayer-window", inputs);
    });
}

function addCellClickEvents() {
    for (let i = 0; i < cellCoordinates.length; i++) {
        const row = cellCoordinates[i][`row`];
        const col = cellCoordinates[i][`col`];
        document.getElementsByClassName("cell")[i].addEventListener("click", () => { makeMark(row, col) })
    }
}