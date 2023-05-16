export function changeDisplay(id, action, className) {
    document.getElementById(id).classList[action](className);
}

export function openLogInPopUp(id) {
    changeDisplay(id, "remove", "d-none");
    changeDisplay("select-mode-window", "add", "d-none");
    changeDisplay("game-page", "add", "d-none");
    changeDisplay("div-select-mode", "add", "d-none");
}

export function openHomePage(id) {
    changeDisplay(id, "add", "d-none");
    changeDisplay("select-mode-window", "remove", "d-none");
}

export function changeBtnDependentMode(idPopUp) {
    if(idPopUp == "singleplayer-window") {
        changeDisplayBtn("div-res2", "add", "div-dificulties", "remove");
    } else if(idPopUp == "multiplayer-window") {
        changeDisplayBtn("div-res2", "remove", "div-dificulties", "add");
    }
}

export function openChoisePlayerWindow(id, inputs) {
    openLogInPopUp(id);
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

function changeDisplayBtn(idBtnResult2, x, idBtnDificulties, y) {
    changeDisplay(idBtnResult2, x, "d-none");
    changeDisplay(idBtnDificulties, y, "d-none");
}