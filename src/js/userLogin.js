import { updateModeDependentButtons, modifyElementClass } from "./elementUtils.js";
import { allUsers, load, save } from "./userManagement.js";
import { resetBoard } from "./gameLogic.js";

export function handleLogIn(el, idX, idY) {
    const userNameX = getUserInputValue(idX);
    const userNameY = getUserInputValue(idY);
    const userCheckX = isExistingUser(userNameX);
    const userCheckY = isExistingUser(userNameY);
    const idPopUp = extractPopUpScreenId(el);
    if (userNameX !== "" && userNameY !== "") {
        openGameSession(userNameX, userCheckX, userNameY, userCheckY, idPopUp);
    }
    resetBoard();
}

function getUserInputValue(id) {
    const inputElement = document.getElementById(id);
    if (inputElement) {
        return inputElement.value;
    } else {
        return "error";
    }
}

function isExistingUser(userName) {
    let isExisting = false;
    for (let i = 0; i < allUsers.length; i++) {
        if (userName == allUsers[i][`name`]) {
            isExisting = true;
        }
    }
    return isExisting;
}

function extractPopUpScreenId(el) {
    const idPopUp = el.target.parentElement.parentElement.parentElement.attributes.id.value;
    return idPopUp;
}

function openGameSession(userNameX, userCheckX, userNameY, userCheckY, idPopUp) {
    handleUserCreation(userNameX, userCheckX);
    handleUserCreation(userNameY, userCheckY);
    updateName("name-player-X", userNameX);
    updateName("name-player-O", userNameY);
    modifyElementClass("game-page", "remove", "d-none");
    modifyElementClass(idPopUp, "add", "d-none");
    updateModeDependentButtons(idPopUp);
}

function handleUserCreation(name, check) {
    load();
    if (name !== "error") {
        if (allUsers.length == 0) {
            addUser(name); 
            console.log("length = 0")
        } else {
            if (check) {
                console.log("user existing");
            } else {
                addUser(name);
            }
        }
    }
}

function updateName(id, name) {
    if (name == "error") {
        name = "Computer";
    }
    document.getElementById(id).innerHTML = name;
}

function addUser(userName) {
    load();
    const newUser = {
        name: userName,
        allResults: []
    }
    allUsers.push(newUser);
    save();
}
