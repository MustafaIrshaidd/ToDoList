import { AddToDoCardButton } from "../../../../common/forms/AddToDoCardButton/index.js";
import { ToDoCard } from "../ToDoCard/index.js";
import { getLocalStorageItem } from "../../../../../../utils/localStorage.js";

export const ToDoCardsContainer = (data={}) => {
  
  const cardsData = data.length > 0 ? data : getLocalStorageItem("ToDoCards");

  console.log(data);

  let cardsHTML = ``;


  Object.entries(data).forEach(([key, value]) => {
    console.log(key)
    cardsHTML += ToDoCard(
      key,
      value.cardImage,
      value.cardIcon,
      value.cardTitle,
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
