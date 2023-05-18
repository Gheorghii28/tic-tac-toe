import { AUDIO_DRAW, AUDIO_SUCCES } from "./gameData.js";
import { checkDraw } from "./gameLogic.js";
import { allUsers } from "./userManagement.js";

export function modifyElementClass(id, action, className) {
    document.getElementById(id).classList[action](className);
}

export function hideResults() {
    modifyElementClass("results-X", "add", "d-none");
    modifyElementClass("results-O", "add", "d-none");
}

export function showLogInPopUp(id) {
    modifyElementClass(id, "remove", "d-none");
    modifyElementClass("select-mode-screen", "add", "d-none");
    modifyElementClass("game-page", "add", "d-none");
    modifyElementClass("div-select-mode", "add", "d-none");
}

export function showHomePage(id) {
    modifyElementClass(id, "add", "d-none");
    modifyElementClass("select-mode-screen", "remove", "d-none");
}

export function showPlayerSelectionPopup(id, inputs) {
    showLogInPopUp(id);
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

export function showWinScreen() {
    setTimeout(() => {
        AUDIO_SUCCES.play();
        modifyElementClass("win-screen", "remove", "d-none");
    }, 1000);

}

export function showDrawScreen() {
    setTimeout(() => {
        AUDIO_DRAW.play();
        modifyElementClass("draw-screen", "remove", "d-none");
    }, 1000);
}

export function updateResultWithDraw(res) {
    if (checkDraw()) {
        res = "draw";
    }
    return res;
}

export function displayPlayerResults(player) {
    let userObj;
    let userAllResults;
    const id = `results-${player}`;
    const resContainer = document.getElementById(id);
    const namePlayer = document.getElementById(`name-player-${player}`).textContent;
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i][`name`] === namePlayer) {
            userObj = allUsers[i];
            userAllResults = userObj[`allResults`];
        }
    }
    modifyElementClass(id, "toggle", "d-none");
    updateResultsContainer(resContainer, userAllResults);
}

function generateResTemplate(res, opponent) {
    return `<li><span class="color-${res}">${res}</span><span>(${opponent})</span></li>`;
}

function updateResultsContainer(resContainer, userAllResults) {
    if (userAllResults) {
        const ul = document.createElement("ul");
        resContainer.innerHTML = ``;
        resContainer.appendChild(ul);
        displayUserResults(userAllResults, ul);
    } else {
        resContainer.innerHTML = ``;
    }
}

function displayUserResults(userAllResults, ul) {
    if(userAllResults.length === 0) {
        ul.innerHTML = `<li>no results</li>`;
    } else {
        for (let i = 0; i < userAllResults.length; i++) {
            const res = userAllResults[i][`result`];
            const opponent = userAllResults[i][`opponent`];
            ul.innerHTML += generateResTemplate(res, opponent);
        }
    }
}