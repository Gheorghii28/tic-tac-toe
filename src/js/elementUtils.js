export function modifyElementClass(id, action, className) {
    document.getElementById(id).classList[action](className);
}

export function showLogInPopUp(id) {
    modifyElementClass(id, "remove", "d-none");
    modifyElementClass("select-mode-window", "add", "d-none");
    modifyElementClass("game-page", "add", "d-none");
    modifyElementClass("div-select-mode", "add", "d-none");
}

export function showHomePage(id) {
    modifyElementClass(id, "add", "d-none");
    modifyElementClass("select-mode-window", "remove", "d-none");
}

export function updateModeDependentButtons(idPopUp) {
    if(idPopUp == "singleplayer-window") {
        modifyButtonDisplay("div-res2", "add", "div-dificulties", "remove");
    } else if(idPopUp == "multiplayer-window") {
        modifyButtonDisplay("div-res2", "remove", "div-dificulties", "add");
    }
}

export function showPlayerSelectionPopup(id, inputs) {
    showLogInPopUp(id);
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

function modifyButtonDisplay(idBtnResult2, x, idBtnDificulties, y) {
    modifyElementClass(idBtnResult2, x, "d-none");
    modifyElementClass(idBtnDificulties, y, "d-none");
}