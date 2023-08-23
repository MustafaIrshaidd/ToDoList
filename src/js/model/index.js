import { MainPage } from "../views/pages/MainPage/index.js";
import { TaskCard } from "../views/pages/MainPage/components/TaskCard/index.js";
import { ToDoCard } from "../views/pages/MainPage/components/ToDoCard/index.js";
import { ToDoListPopUpCard } from "../views/pages/MainPage/components/ToDoListPopupCard/index.js";
import {
  setLocalStorageItem,
  getLocalStorageItem,
  addOrUpdateObjectToLocalStorageArray,
} from "../../utils/localStorage.js";
import { Status, statusTypes } from "../views/common/forms/Status/index.js";

export const renderPlaygroundTasks = (data) => {
  console.log(data);
  const toDoCardsData = getLocalStorageItem("ToDoCards");
  ev.remove();

  console.log(reciverContainerSelector);
};
const ToDoCardObjSchema = {
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
  console.log(data);

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

  // Insert the newCard before the cardsContainerAddBtn
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

    addOrUpdateObjectToLocalStorageArray("ToDoCards", ToDoCardObject, id);
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

export const showPopUpCard = (body, id = -1) => {
  const popUpCard = document.createElement("div");

  if (id >= 0) {
    const data = getLocalStorageItem("ToDoCards")[id - 1];

    popUpCard.innerHTML = ToDoListPopUpCard(
      id,
      data.cardImg,
      data.cardIcon,
      data.title,
      data.cardStatus,
      data.cardDate,
      data.tasks
    );
  } else {
    popUpCard.innerHTML = ToDoListPopUpCard();
  }
  body.appendChild(popUpCard);
};

const collectPopUpCardData = (element, id) => {
  const ToDoCardObject = { ...ToDoCardObjSchema };

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

  addOrUpdateObjectToLocalStorageArray(
    "ToDoCards",
    ToDoCardObject,
    id >= 0 ? id : -1
  );
  id >= 0
    ? updateToDoCardInCardsContainer(id, ToDoCardObject)
    : appendToDoCardToCardsContainer(element, ToDoCardObject);
};

export const removePopUpCard = (element, id) => {
  collectPopUpCardData(element, id);
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
  newElement = newElement.querySelector("li");

  ev.target.parentNode.insertBefore(newElement, ev.target);
};

export const renderIndexPage = (body) => {
  body.innerHTML = MainPage();
  setLocalStorageItem("ToDoCards", []);
};
