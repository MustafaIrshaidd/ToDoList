import { MainPage } from "./views/pages/MainPage/index.js";

export const renderIndexPage = (root) => {
  root.innerHTML = MainPage();
};
