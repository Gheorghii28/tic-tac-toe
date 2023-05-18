import { load } from "./userManagement.js";
import { loadAllEvents } from "./eventUtils.js";

init();

function init() {
    window.addEventListener("DOMContentLoaded", includeHTML);
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        await fetchFile(element);
    }
    load();
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