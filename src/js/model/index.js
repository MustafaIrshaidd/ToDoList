import { renderIndexPage } from "../controller.js";

const body = document.getElementById("body");

window.onload = async () => {
    renderIndexPage(body);
};
