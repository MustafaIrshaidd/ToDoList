import { AddToDoCardButton } from "../../../../common/forms/AddToDoCardButton/index.js";
import { ToDoCard } from "../ToDoCard/index.js";
import { getToDoLists } from "../../../../../../api/todolistServices.js";

export const ToDoCardsContainer = async (dataArray = []) => {
  if (dataArray.length === 0) dataArray = await getToDoLists();

  let cardsHTML = ``;
  dataArray.forEach((obj,index) => {
    cardsHTML += ToDoCard(
      obj._id,
      obj.cardImg,
      obj.cardIcon,
      obj.title,
      obj.cardStatus,
      "fsafsa",
      "Mustafa Irshaid",
      index
    );
  });

  return `
    <div class="todo-cards--container">
      ${cardsHTML}
      ${AddToDoCardButton("New", true, false)}
    </div>`;
};
