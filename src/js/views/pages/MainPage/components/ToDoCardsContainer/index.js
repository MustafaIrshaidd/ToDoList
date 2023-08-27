import { AddToDoCardButton } from "../../../../common/forms/AddToDoCardButton/index.js";
import { ToDoCard } from "../ToDoCard/index.js";
import { getLocalStorageItem } from "../../../../../../utils/localStorage.js";

export const ToDoCardsContainer = (dataObject={}) => {

if(Object.keys(dataObject).length === 0) dataObject=getLocalStorageItem("ToDoCards")

  let cardsHTML = ``;
  Object.entries(dataObject).forEach(([key, value]) => {
    console.log(value)
    cardsHTML += ToDoCard(
      key,
      value.cardImg,
      value.cardIcon,
      value.title,
      value.cardStatus,
      "fsafsa",
      "Mustafa Irshaid"
    );
  });

  return `
    <div class="todo-cards--container">
      ${cardsHTML}
      ${AddToDoCardButton("New", true, false)}
    </div>`;
};
