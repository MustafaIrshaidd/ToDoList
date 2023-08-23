import { TaskCard } from "../components/TaskCard/index.js";
import { AddToDoCardButton } from "../../../common/forms/AddToDoCardButton/index.js";


const ListTypes = {
  0: ["To Do", "todo"],
  1: ["In Progress", "inprogress"],
  2: ["Done", "done"],
};

export const TasksList = (type, tasks, cardIcon) => {
  return `<li class="${ListTypes[type][1]}" aria-label="done">
    <div class="add-card--todo-cards--drag-drop-playground--header">
      <i class="fa-regular fa-circle-check"></i> <span>${ListTypes[type][0]}</span><span class="tasks-count">${
        tasks ? tasks.length : 0
      }</span>
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
      ${AddToDoCardButton("New", true, true)}
    </ul>
  </li>`;
};
