import { AddToDoCardButton } from "../../../../common/forms/AddToDoCardButton/index.js";
import { ToDoCard } from "../ToDoCard/index.js";
import { getLocalStorageItem } from "../../../../../../utils/localStorage.js";

export const ToDoCardsContainer = () => {
  let cardsData = getLocalStorageItem("ToDoCards"); // Initialize an empty string to store the HTML for the cards

  let cardsHTML = ``;

  cardsData?.forEach((element,index) => {
    cardsHTML += ToDoCard(
      index + 1,
      element.cardImage,
      element.cardIcon,
      element.cardTitle,
      element.cardStatus,
      "fsafsa",
      "Mustafa Irshaid"
    );
  });

  return `
    <div class="todo-cards--container">
      ${cardsHTML + AddToDoCardButton("New", true, false)}
    </div>`;
};
