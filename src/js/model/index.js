import { MainPage } from "../views/pages/MainPage/index.js";
import { TaskCard } from "../views/pages/MainPage/components/TaskCard/index.js";
import { ToDoCard } from "../views/pages/MainPage/components/ToDoCard/index.js";
import { ToDoCardsContainer } from "../views/pages/MainPage/components/ToDoCardsContainer/index.js";
import { ToDoListPopUpCard } from "../views/pages/MainPage/components/ToDoListPopupCard/index.js";
import {
  ListTypes,
  TasksList,
} from "../views/pages/MainPage/components/TasksList/index.js";
import {
  setLocalStorageItem,
  getLocalStorageItem,
  addOrUpdateKeyInLocalStorage,
} from "../../utils/localStorage.js";
import { Status, statusTypes } from "../views/common/forms/Status/index.js";
import { onClickToDoCardHandler } from "../controller/index.js";
import { EditList } from "../views/common/EditList/index.js";

let generatedID = 1;

const incrementGeneratedID = ()=>{
  generatedID+=1;
  setLocalStorageItem("ToDoCardsID",generatedID);
}
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

const statusIndeces = {
  Empty: 0,
  "In Progress": 1,
  Done: 2,
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

  id = id ?? generatedID;

  toDoCards[id].tasks[senderClassName[1]].splice(data.senderTaskIndex - 1, 1);
  if (data.recieverTaskIndex) {
    toDoCards[id].tasks[recieverClassName[1]].splice(
      data.recieverTaskIndex - 1,
      0,
      data.taskTitle
    );
  } else {
    toDoCards[id].tasks[recieverClassName[1]].push(data.taskTitle);
  }

  const newObj = structuredClone(toDoCards[id]);

  addOrUpdateKeyInLocalStorage("ToDoCards", id, newObj);

  renderTasksList(data.senderContainerIndex, senderClassName[1], id);
  renderTasksList(data.recieverContainerIndex, recieverClassName[1], id);
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

const appendToDoCardToCardsContainer = (element, obj, id) => {
  const cardsContainerAddBtn = element
    .closest("body")
    .querySelector(".todo-cards--container button");

  const data = getLocalStorageItem("ToDoCards");

  const newElement = document.createElement("div");

  newElement.innerHTML = ToDoCard(
    generatedID,
    obj.cardImg,
    obj.cardIcon,
    obj.title,
    obj.cardStatus,
    "fsafsa",
    "Mustafa Irshaid"
  );

  const newCard = newElement.querySelector(".todo-card");

  cardsContainerAddBtn.parentNode.insertBefore(newCard, cardsContainerAddBtn);

  incrementGeneratedID();
};

export const updateStatus = (statusPopup, statusTitle, id, isPopup) => {
  const statusHeader = statusPopup.closest(".status--before");

  const statusIndex = statusIndeces[statusTitle.innerText];

  if (!isPopup) {
    const todoCards = getLocalStorageItem("ToDoCards");
    let ToDoCardObject = todoCards?.[id - 1] || {};

    ToDoCardObject = {
      ...ToDoCardObject,
      ["cardStatus"]: statusIndex,
    };

    addOrUpdateKeyInLocalStorage("ToDoCards", id, ToDoCardObject);
  }

  const statusNew = document.createElement("div");

  statusNew.innerHTML = Status(statusIndex, true);

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

  const oldCard = Array.from(
    cardContainer.querySelectorAll(".todo-card")
  ).filter((card) => {
    if (
      card.querySelector(".todo-card--card-body--header span").innerText == id
    ) {
      return card;
    }
  });

  cardContainer.replaceChild(newCard, oldCard[0]);
};

export const deleteToDoCardInCardsContainer = (id) => {
  const cardContainer = document.querySelector(".todo-cards--container");

  const deletedCard = Array.from(
    cardContainer.querySelectorAll(".todo-card")
  ).filter((card) => {
    if (
      card.querySelector(".todo-card--card-body--header span").innerText == id
    ) {
      return card;
    }
  });

  deletedCard?.[0].remove();

  // cardContainer.removeChild(deletedCard);
};

export const showPopUpCard = (body, id, isNewCard) => {
  let cardObj;
  isNewCard
    ? (cardObj = structuredClone(ToDoCardObjSchema))
    : (cardObj = getLocalStorageItem("ToDoCards")[id]);

  addOrUpdateKeyInLocalStorage(
    "ToDoCards",
    isNewCard ? generatedID : id,
    cardObj
  );

  const popUpCard = document.createElement("div");

  popUpCard.innerHTML = ToDoListPopUpCard(
    isNewCard ? generatedID : id,
    cardObj.cardImg,
    cardObj.cardIcon,
    cardObj.title,
    cardObj.cardStatus,
    cardObj.tasks
  );

  body.appendChild(popUpCard);
};

export const showPopupEdit = (id, editBtn) => {
  const editPopup = document.createElement("div");
  editPopup.classList.add("edit-popup");

  let editPopupInnerHTML = EditList() || "";

  editPopup.innerHTML = editPopupInnerHTML;

  editBtn.appendChild(editPopup);
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
  id && addOrUpdateKeyInLocalStorage("ToDoCards", id, ToDoCardObject);

  isNewCard
    ? appendToDoCardToCardsContainer(element, ToDoCardObject, id)
    : updateToDoCardInCardsContainer(id, ToDoCardObject);
};

export const removePopUpCard = (element, id, isNewCard) => {
  collectPopUpCardData(element, id, isNewCard);
  element.parentNode.remove();
};

export const addTaskCard = (ev, id) => {
  let newElement = document.createElement("div");

  let section = ev.target.parentNode.parentNode.closest("li");

  const countLabel = section.querySelector(".tasks-count");

  countLabel.innerText = parseInt(countLabel.innerText, 10) + 1;

  newElement.innerHTML = TaskCard(
    "",
    parseInt(countLabel.innerText, 10),
    "Untitled"
  );

  const categoryClassName = section.className;

  const toDoCards = getLocalStorageItem("ToDoCards");

  id = id ?? Object.keys(toDoCards).length;

  toDoCards[id].tasks[categoryClassName].push("Untitled");

  addOrUpdateKeyInLocalStorage("ToDoCards", id, toDoCards[id]);

  newElement = newElement.querySelector("li");

  ev.target.parentNode.parentNode.insertBefore(
    newElement,
    ev.target.parentNode
  );
};

const searchByTitleWithKeys = (obj, searchQuery) => {
  const matchingItems = Object.keys(obj).filter((key) =>
    obj[key].title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resultObject = {};
  matchingItems.forEach((key) => {
    resultObject[key] = obj[key];
  });

  return resultObject;
};

export const renderToDoCardsContainer = (searchQuery) => {
  const toDoCards = getLocalStorageItem("ToDoCards");

  const matchingItems = searchByTitleWithKeys(toDoCards, searchQuery);

  const existingContainer = document.querySelector(".todo-cards--container");

  const newContainer = document.createElement("div");

  newContainer.innerHTML = ToDoCardsContainer(matchingItems);

  existingContainer.outerHTML = newContainer.innerHTML;

  onClickToDoCardHandler(document.body);
};

export const renderIndexPage = (body) => {
  if (getLocalStorageItem("ToDoCards") == null) {
    setLocalStorageItem("ToDoCards", {});
  }

  if (getLocalStorageItem("ToDoCardsID") === null) {
    setLocalStorageItem("ToDoCardsID", 1);
  } 
  generatedID = getLocalStorageItem("ToDoCardsID")

  body.innerHTML = MainPage();
};
