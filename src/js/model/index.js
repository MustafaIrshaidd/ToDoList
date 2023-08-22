import { MainPage } from "../views/pages/MainPage/index.js";
import { TaskCard } from "../views/pages/MainPage/components/TaskCard/index.js";
import { ToDoCard } from "../views/pages/MainPage/components/ToDoCard/index.js";
import {
  setLocalStorageItem,
  getLocalStorageItem,
  addNewObjectToLocalStorageArray,
} from "../../utils/localStorage.js";

const Status = {
  Empty: 0,
  "In Progress": 1,
  Done: 2,
};

const appendToDoCardToCardsContainer = (element, obj) => {
  const cardsContainerAddBtn = element
    .closest("body")
    .querySelector(".todo-cards--container button");

  const data = getLocalStorageItem("ToDoCards");
  console.log(data)

  const newElement = document.createElement("div");


  newElement.innerHTML = ToDoCard(
    data?.length,
    obj.cardImg,
    obj.cardIcon,
    obj.title,
    obj.cardStatus,
    "fsafsa",
    "Mustafa Irshaid"
  );

  const newCard = newElement.querySelector(".todo-card");

  console.log(newCard)
  

  // Insert the newCard before the cardsContainerAddBtn
  cardsContainerAddBtn.parentNode.insertBefore(newCard, cardsContainerAddBtn);
};

const collectPopUpCardData = (element) => {
  const ToDoCardObject = {
    title: "Untitled",
    cardImg: "",
    cardIcon: "",
    cardDate: "",
    tasks: {
      toDo: [],
      inProgress: [],
      done: [],
    },
    cardStatus: 0,
  };

  const imageElements = document.querySelectorAll(
    ".custom__image-container img"
  );
  const srcValues = Array.from(imageElements, (element) =>
    element.getAttribute("src")
  );

  ToDoCardObject.cardImg = srcValues[0] || "";
  ToDoCardObject.cardIcon = srcValues[1] || "";

  ToDoCardObject.title = element.querySelector(
    ".add-card-content--header--container h3"
  ).innerText;

  ToDoCardObject.cardDate = element.querySelector(
    ".add-card-info .date-created p"
  ).innerText;

  ToDoCardObject.cardStatus =
    Status[element.querySelector(".add-card-info .status span").innerText];

  const toDoTasks = element.querySelectorAll(
    ".todo .add-card--todo-cards--drag-drop-playground--cards p"
  );
  ToDoCardObject.tasks.toDo = Array.from(
    toDoTasks,
    (toDoTask) => toDoTask.innerText
  );

  const inProgressTasks = element.querySelectorAll(
    ".inprogress .add-card--todo-cards--drag-drop-playground--cards p"
  );
  ToDoCardObject.tasks.inProgress = Array.from(
    inProgressTasks,
    (inProgressTask) => inProgressTask.innerText
  );

  const doneTasks = element.querySelectorAll(
    ".done .add-card--todo-cards--drag-drop-playground--cards p"
  );
  ToDoCardObject.tasks.done = Array.from(
    doneTasks,
    (doneTask) => doneTask.innerText
  );

  addNewObjectToLocalStorageArray("ToDoCards", ToDoCardObject);
  appendToDoCardToCardsContainer(element, ToDoCardObject);
};

export const removePopUpCard = (element) => {
  collectPopUpCardData(element);
  element.parentNode.remove();
};

export const addTaskCard = (ev) => {
  const newElement = document.createElement("div");
  newElement.innerHTML = TaskCard("giticon.png", 2, "Untitled");
  ev.target.parentNode.insertBefore(newElement, ev.target);
};

export const renderIndexPage = (body) => {
  body.innerHTML = MainPage();
  setLocalStorageItem("ToDoCards", []);
};
