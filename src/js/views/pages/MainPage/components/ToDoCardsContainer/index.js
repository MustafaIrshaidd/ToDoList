import { AddToDoCardButton } from "../../../../common/forms/AddToDoCardButton/index.js";
import { ToDoCard } from "../ToDoCard/index.js";

export const ToDoCardsContainer = () => {
  let cardsHTML = ""; // Initialize an empty string to store the HTML for the cards

  for (let i = 0; i < 11; i++) {
    cardsHTML += ToDoCard(
      i + 1,
      "fsfsa",
      "fsaf",
      "HTML & CSS",
      1,
      "fsafsa",
      "Mustafa Irshaid"
    );
  }

  return `
    <div class="todo-cards--container">
      ${cardsHTML + AddToDoCardButton("New",true)}
    </div>`;
};
