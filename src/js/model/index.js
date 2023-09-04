import { MainPage } from "../views/pages/MainPage/index.js";
import { TaskCard } from "../views/pages/MainPage/components/TaskCard/index.js";
import { ToDoCard } from "../views/pages/MainPage/components/ToDoCard/index.js";
import { ToDoCardsContainer } from "../views/pages/MainPage/components/ToDoCardsContainer/index.js";
import { ToDoListPopUpCard } from "../views/pages/MainPage/components/ToDoListPopupCard/index.js";
import {
  ListTypes,
  TasksList,
} from "../views/pages/MainPage/components/TasksList/index.js";
import { Status, statusTypes } from "../views/common/forms/Status/index.js";
import { onClickToDoCardHandler } from "../controller/index.js";
import { EditList } from "../views/common/EditList/index.js";
import {
  addToDoList,
  getToDoListByID,
  getToDoLists,
  searchToDoLists,
  updateToDoListByID,
} from "../../api/todolistServices.js";

let generatedID = 1;

const incrementGeneratedID = () => {
  generatedID += 1;
};

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

const collectTasksListData = (ToDoCardObject) => {
  const element = document.body.querySelector(".add-card--overlay");

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

  return ToDoCardObject;
};

const renderTasksList = (type, className, newObj) => {
  const selector = `.${className}`;

  const tasksListContainer = document.createElement("div");

  tasksListContainer.innerHTML = TasksList(
    type,
    newObj.tasks[className],
    newObj.cardIcon
  );

  const newElement = tasksListContainer.querySelector(selector);

  const existingElement = document.querySelector(selector);
  existingElement.innerHTML = newElement.innerHTML;
};

export const renderPlaygroundTasks = async (data, id) => {
  const senderClassName = ListTypes[data.senderContainerIndex];
  const recieverClassName = ListTypes[data.recieverContainerIndex];

  id = id ?? generatedID;

  let obj = await getToDoListByID(id);

  obj = collectTasksListData(obj);

  obj.tasks[senderClassName[1]].splice(data.senderTaskIndex - 1, 1);
  if (data.recieverTaskIndex) {
    obj.tasks[recieverClassName[1]].splice(
      data.recieverTaskIndex - 1,
      0,
      data.taskTitle
    );
  } else {
    obj.tasks[recieverClassName[1]].push(data.taskTitle);
  }

  const newObj = structuredClone(obj);

  await updateToDoListByID(id, newObj);

  renderTasksList(data.senderContainerIndex, senderClassName[1], newObj);
  renderTasksList(data.recieverContainerIndex, recieverClassName[1], newObj);
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

const appendToDoCardToCardsContainer = (id, element, obj, index) => {
  const cardsContainerAddBtn = element
    .closest("body")
    .querySelector(".todo-cards--container button");

  const newElement = document.createElement("div");

  newElement.innerHTML = ToDoCard(
    id,
    obj.cardImg,
    obj.cardIcon,
    obj.title,
    obj.cardStatus,
    "fsafsa",
    "Mustafa Irshaid",
    index
  );

  const newCard = newElement.querySelector(".todo-card");

  cardsContainerAddBtn.parentNode.insertBefore(newCard, cardsContainerAddBtn);

  incrementGeneratedID();
};

export const updateStatus = async (statusPopup, statusTitle, id, isPopup) => {
  const statusHeader = statusPopup.closest(".status--before");

  const statusIndex = statusIndeces[statusTitle.innerText];

  if (!isPopup) {
    const obj = getToDoListByID(id);
    let ToDoCardObject = obj || {};

    ToDoCardObject = {
      ...ToDoCardObject,
      ["cardStatus"]: statusIndex,
    };

    await updateToDoListByID(id, ToDoCardObject);
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
    "Mustafa Irshaid",
    data.index
  );

  const newCard = newElement.querySelector(".todo-card");

  const oldCard = Array.from(
    cardContainer.querySelectorAll(".todo-card")
  ).filter((card) => {
    if (
      card.querySelector(".todo-card--card-body--header .id").innerText == id
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
      card.querySelector(".todo-card--card-body--header .id").innerText == id
    ) {
      return card;
    }
  });

  deletedCard?.[0].remove();
};

export const showPopUpCard = async (body, id, isNewCard, index) => {
  let cardObj;

  if (isNewCard) {
    cardObj = structuredClone(ToDoCardObjSchema);
    cardObj = (await addToDoList(cardObj)).data;
    index = (await getToDoLists()).length;
  } else {
    cardObj = await getToDoListByID(id);
  }

  const popUpCard = document.createElement("div");

  popUpCard.innerHTML = ToDoListPopUpCard(
    cardObj._id,
    cardObj.cardImg,
    cardObj.cardIcon,
    cardObj.title,
    cardObj.cardStatus,
    cardObj.tasks,
    cardObj.createdAt,
    index
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

const collectPopUpCardData = async (element, id, isNewCard = false) => {
  let ToDoCardObject = structuredClone(ToDoCardObjSchema);

  !id &&
    (id = document.querySelector(".add-card-content--header .id").innerText);

  ToDoCardObject.index = document.querySelector(
    ".add-card-content--header .index"
  ).innerText;

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

  ToDoCardObject = collectTasksListData(ToDoCardObject);

  await updateToDoListByID(id, ToDoCardObject);

  isNewCard
    ? appendToDoCardToCardsContainer(
        id,
        element,
        ToDoCardObject,
        ToDoCardObject.index
      )
    : updateToDoCardInCardsContainer(id, ToDoCardObject);
};

export const removePopUpCard = async (element, id, isNewCard) => {
  await collectPopUpCardData(element, id, isNewCard);
  element.parentNode.remove();
};

export const addTaskCard = async (ev, id) => {
  let newElement = document.createElement("div");

  let section = ev.target.parentNode.parentNode.closest("li");

  const countLabel = section.querySelector(".tasks-count");

  newElement.innerHTML = TaskCard(
    "",
    parseInt(countLabel.innerText, 10),
    "Untitled"
  );

  const categoryClassName = section.className;

  id = id ?? generatedID;

  const obj = await getToDoListByID(id);

  obj.tasks[categoryClassName].push("Untitled");

  countLabel.innerText = parseInt(countLabel.innerText, 10) + 1;

  await updateToDoListByID(id, obj);

  newElement = newElement.querySelector("li");

  ev.target.parentNode.parentNode.insertBefore(
    newElement,
    ev.target.parentNode
  );
};

export const renderToDoCardsContainer = async (searchQuery) => {
  const matchingItems = await searchToDoLists(searchQuery);
  const existingContainer = document.querySelector(".todo-cards--container");

  if (matchingItems.length === 0) {
    existingContainer.innerHTML = `Not Found`;
    return;
  }

  const newContainer = document.createElement("div");

  newContainer.innerHTML = await ToDoCardsContainer(matchingItems);

  existingContainer.outerHTML = newContainer.innerHTML;

  onClickToDoCardHandler(document.body);
};

export const renderIndexPage = async (body) => {
  generatedID = (await getToDoLists()).length;

  body.innerHTML = await MainPage();
};
