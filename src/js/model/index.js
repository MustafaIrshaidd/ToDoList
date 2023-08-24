import { MainPage } from "../views/pages/MainPage/index.js";
import { TaskCard } from "../views/pages/MainPage/components/TaskCard/index.js";
import { ToDoCard } from "../views/pages/MainPage/components/ToDoCard/index.js";
import { ToDoListPopUpCard } from "../views/pages/MainPage/components/ToDoListPopupCard/index.js";
import {
  ListTypes,
  TasksList,
} from "../views/pages/MainPage/TasksList/index.js";
import {
  setLocalStorageItem,
  getLocalStorageItem,
  addOrUpdateObjectToLocalStorageArray,
} from "../../utils/localStorage.js";
import { Status, statusTypes } from "../views/common/forms/Status/index.js";

const ToDoCardObjSchema = {
  title: "Untitled",
  cardImg: "",
  cardIcon: "",
  cardDate: "",
  tasks: {
    todo: [],
    inprogress: [],
    done: [],
  },
  cardStatus: 0,
};

const renderTasksList = (type, className, id) => {
  const toDoCards = getLocalStorageItem("ToDoCards");
  const selector = `.${className}`;

  const tasksListContainer = document.createElement("div");
  tasksListContainer.innerHTML = TasksList(
    type,
    toDoCards[id].tasks[className],
    toDoCards[id].cardIcon
  );

  const newElement = tasksListContainer.querySelector(selector);

  const existingElement = document.querySelector(selector);
  existingElement.innerHTML = newElement.innerHTML;
};

export const renderPlaygroundTasks = (data, id) => {
  const senderClassName = ListTypes[data.senderContainerIndex];
  const recieverClassName = ListTypes[data.recieverContainerIndex];

  const toDoCards = getLocalStorageItem("ToDoCards");

  id ? (id = id - 1) : (id = toDoCards.length - 1);

  toDoCards[id].tasks[senderClassName[1]].splice(data.senderTaskIndex - 1, 1);
  toDoCards[id].tasks[recieverClassName[1]].splice(
    data.recieverTaskIndex - 1,
    0,
    data.taskTitle
  );

  addOrUpdateObjectToLocalStorageArray(
    "ToDoCards",
    toDoCards[id],
    false,
    id + 1
  );
  renderTasksList(data.senderContainerIndex, senderClassName[1], id);
  renderTasksList(data.recieverContainerIndex, recieverClassName[1], id);
};

const statusIndeces = {
  Empty: 0,
  "In Progress": 1,
  Done: 2,
};

export const showPopupStatus = (statusContainer) => {
  const statusList = document.createElement("div");
  statusList.classList.add("status-list-popup");

  let statusListInnerHTML = "";

  Object.entries(statusTypes).forEach((status, index) => {
    statusListInnerHTML += Status(index, false);
  });

  statusList.innerHTML = statusListInnerHTML;

  statusContainer.appendChild(statusList);
};

const appendToDoCardToCardsContainer = (element, obj) => {
  const cardsContainerAddBtn = element
    .closest("body")
    .querySelector(".todo-cards--container button");

  const data = getLocalStorageItem("ToDoCards");

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

  cardsContainerAddBtn.parentNode.insertBefore(newCard, cardsContainerAddBtn);
};

export const updateStatus = async (statusPopup, statusTitle, id, isPopup) => {
  const statusHeader = statusPopup.closest(".status--before");

  //not in pop card ,, on home

  const statusIndex = statusIndeces[statusTitle.innerText];

  if (!isPopup) {
    const todoCards = await getLocalStorageItem("ToDoCards");
    let ToDoCardObject = todoCards?.[id - 1] || {};

    ToDoCardObject = {
      ...ToDoCardObject,
      ["cardStatus"]: statusIndex,
    };

    addOrUpdateObjectToLocalStorageArray(
      "ToDoCards",
      ToDoCardObject,
      false,
      id
    );
  }

  const statusNew = document.createElement("div");

  statusNew.innerHTML = Status(statusIndex, true);
  console.log(statusHeader, statusNew);

  statusHeader.parentNode.replaceChild(
    statusNew.firstElementChild,
    statusHeader
  );
};

const updateToDoCardInCardsContainer = (id, data) => {
  const cardContainer = document.querySelector(".todo-cards--container");

  const newElement = document.createElement("div");

  newElement.innerHTML = ToDoCard(
    id,
    data.cardImg,
    data.cardIcon,
    data.title,
    data.cardStatus,
    "fsafsa",
    "Mustafa Irshaid"
  );
  const newCard = newElement.querySelector(".todo-card");

  const oldCard = cardContainer.querySelectorAll(".todo-card")[id - 1];

  cardContainer.replaceChild(newCard, oldCard);
};

export const showPopUpCard = (body, id, isNewCard) => {
  const toDoCardTemp = structuredClone(ToDoCardObjSchema);

  isNewCard &&
    addOrUpdateObjectToLocalStorageArray("ToDoCards", toDoCardTemp, true);

  const popUpCard = document.createElement("div");

  const data = getLocalStorageItem("ToDoCards");
  let cardObj;

  if (isNewCard) {
    cardObj = data[data.length - 1];
  } else {
    cardObj = data[id - 1];
  }

  popUpCard.innerHTML = ToDoListPopUpCard(
    id,
    cardObj.cardImg,
    cardObj.cardIcon,
    cardObj.title,
    cardObj.cardStatus,
    cardObj.cardDate,
    cardObj.tasks
  );

  body.appendChild(popUpCard);
};

const collectPopUpCardData = (element, id, isNewCard = false) => {
  let ToDoCardObject = structuredClone(ToDoCardObjSchema);

  const imageCover = document
    .querySelector(".cover-image img")
    ?.getAttribute("src");

  const imageIcon = document
    .querySelector(".icon-image img")
    ?.getAttribute("src");

  ToDoCardObject.cardImg = imageCover || "";
  ToDoCardObject.cardIcon = imageIcon || "";

  ToDoCardObject.title = element.querySelector(
    ".add-card-content--header--container h3"
  ).innerText;

  ToDoCardObject.cardDate = element.querySelector(
    ".add-card-info .date-created p"
  ).innerText;

  ToDoCardObject.cardStatus =
    statusIndeces[
      element.querySelector(".add-card-info .status span").innerText
    ];

  const toDoTasks = element.querySelectorAll(
    ".todo .add-card--todo-cards--drag-drop-playground--cards p"
  );
  ToDoCardObject.tasks.todo = Array.from(
    toDoTasks,
    (toDoTask) => toDoTask.innerText
  );

  const inProgressTasks = element.querySelectorAll(
    ".inprogress .add-card--todo-cards--drag-drop-playground--cards p"
  );
  ToDoCardObject.tasks.inprogress = Array.from(
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
  const toDoCards = getLocalStorageItem("ToDoCards");
  id ? id : (id = toDoCards.length);
  addOrUpdateObjectToLocalStorageArray("ToDoCards", ToDoCardObject, false, id);
  isNewCard
    ? appendToDoCardToCardsContainer(element, ToDoCardObject)
    : updateToDoCardInCardsContainer(id, ToDoCardObject);
};

export const removePopUpCard = (element, id, isNewCard) => {
  collectPopUpCardData(element, id, isNewCard);
  element.parentNode.remove();
};

export const addTaskCard = (ev, id) => {
  let newElement = document.createElement("div");

  const section = ev.target.closest("li");

  const countLabel = section.querySelector(".tasks-count");
  countLabel.innerText = parseInt(countLabel.innerText, 10) + 1;

  newElement.innerHTML = TaskCard(
    "",
    parseInt(countLabel.innerText, 10),
    "Untitled"
  );

  const categoryClassName = ev.target.closest("li").className;

  const toDoCards = getLocalStorageItem("ToDoCards");
  id ? id : (id = toDoCards.length);

  const toDoCard = toDoCards[id - 1];

  toDoCard.tasks[categoryClassName].push("Untitled");

  addOrUpdateObjectToLocalStorageArray("ToDoCards", toDoCard, false, id);

  newElement = newElement.querySelector("li");

  ev.target.parentNode.insertBefore(newElement, ev.target);
};

export const renderIndexPage = (body) => {
  body.innerHTML = MainPage();
  setLocalStorageItem("ToDoCards", []);
};
