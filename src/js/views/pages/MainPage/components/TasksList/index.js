import { AddToDoCardButton } from "../../../../common/forms/AddToDoCardButton/index.js";
import { TaskCard } from "../TaskCard/index.js";

export const ListTypes = {
  0: ["To Do", "todo","fa-regular fa-circle-check"],
  1: ["In Progress", "inprogress","fa-regular fa-circle-play"],
  2: ["Done", "done","fa-regular fa-circle-check"],
};

export const TasksList = (type, tasks, cardIcon) => {
  return `<li class="${ListTypes[type][1]}">
    <div class="add-card--todo-cards--drag-drop-playground--header">
      <i class="${ListTypes[type][2]}"></i> <span>${
        ListTypes[type][0]
      }</span><span class="tasks-count">${tasks ? tasks.length : 0}</span>
    </div>
    <ul class="add-card--todo-cards--drag-drop-playground--cards">
    
    ${
      tasks
        ? tasks
            .map((task, index) => {
              return TaskCard(cardIcon, index + 1, task);
            })
            .join("")
        : ``
    }
    <li>
    ${AddToDoCardButton("New", true, true)}
    </li>
    </ul>
  </li>`;
};
