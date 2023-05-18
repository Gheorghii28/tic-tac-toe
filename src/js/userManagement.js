import { updateResultWithDraw } from "./elementUtils.js";

export let allUsers = [];

export function createWinResult(lostPlayer) {
    let res = "victory";
    return {
        result: updateResultWithDraw(res),
        opponent: lostPlayer
    };
}

export function createLostResult(winPlayer) {
    let res = "failure";
    return {
        result: updateResultWithDraw(res),
        opponent: winPlayer
    };
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