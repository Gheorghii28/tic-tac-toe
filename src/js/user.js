import { changeBtnDependentMode, changeDisplay } from "./display.behavior.js";
import { allUsers, load, save } from "./script.js";

export function logIn(el, idX, idY) {
    const userNameX = userInput(idX);
    const userNameY = userInput(idY);
    const userCheckX = checkExistingUser(userNameX);
    const userCheckY = checkExistingUser(userNameY);
    const idPopUp = idPopUpWindow(el);
    if (userNameX !== "" && userNameY !== "") {
        openGameForUser(userNameX, userCheckX, userNameY, userCheckY, idPopUp);
    }
}

function userInput(id) {
    const userName = document.getElementById(id);
    if (userName) {
        return userName.value;
    } else {
        return "error";
    }
}

function checkExistingUser(userName) {
    let boolen = false;
    for (let i = 0; i < allUsers.length; i++) {
        if (userName == allUsers[i][`name`]) {
            boolen = true;
        }
    }
    return boolen;
}

function idPopUpWindow(el) {
    const idPopUp = el.target.parentElement.parentElement.parentElement.attributes.id.value;
    return idPopUp;
}

function openGameForUser(userNameX, userCheckX, userNameY, userCheckY, idPopUp) {
    create(userNameX, userCheckX);
    create(userNameY, userCheckY);
    showName("name-player-1", userNameX);
    showName("name-player-2", userNameY);
    changeDisplay("game-page", "remove", "d-none");
    changeDisplay(idPopUp, "add", "d-none");
    changeBtnDependentMode(idPopUp);
}

function create(name, check) {
    load();
    if (name !== "error") {
        if (allUsers.length == 0) {
            pushUser(name); 
            console.log("length = 0")
        } else {
            if (check) {
                console.log("user existing");
            } else {
                pushUser(name);
            }
        }
    }
}

function showName(id, name) {
    if (name == "error") {
        name = "Computer";
    }
    document.getElementById(id).innerHTML = name;
}

function pushUser(userName) {
    load();
    const newUser = {
        name: userName
    }
    allUsers.push(newUser);
    save();
}
