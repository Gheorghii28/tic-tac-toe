export let allUsers = [];

export function createWinResult(lostPlayer) {
    return {
        result: "victory",
        opponent: lostPlayer
    };
}

export function createLostResult(winPlayer) {
    return {
        result: "failure",
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