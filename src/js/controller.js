import { ToDoListPopUpCard } from "./views/pages/MainPage/components/ToDoListPopupCard/index.js";
import { MainPage } from "./views/pages/MainPage/index.js";

export const renderIndexPage = (document) => {
  const body = document.getElementById("body");
  body.innerHTML = MainPage() + ToDoListPopUpCard();
};
