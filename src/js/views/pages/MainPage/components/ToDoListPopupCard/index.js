import { AddToDoCardButton } from "../../../../common/forms/AddToDoCardButton/index.js";
import { Status } from "../../../../common/forms/Status/index.js";
import { TaskCard } from "../TaskCard/index.js";
import { formatDate } from "../../../../../../utils/formatters.js";


export const ToDoListPopUpCard = (
  id = 0,
  cardImage = "",
  cardIcon = "",
  cardTitle = "Untitled",
  cardStatus = 0,
  cardDateCreated = formatDate("en-US")
) => {
  return `<div class="add-card--overlay">
    <div class="add-card--popup">
      <div class="add-card-content">
        
        <div class="custom__image-container cover-image">
            <label class="image-label cover-image--scale" id="add-img-label" for="add-single-img">${
              cardImage
                ? `<img src="${cardImage}" class="add-card-cover-image">`
                : `+`
            }</label>
            <input class="image-input" type="file" id="add-single-img" accept="image/jpeg" />
        </div>
        

        <div class="add-card-content--header centralized-container">
          <div class="add-card-content--header--container">
              <div class="custom__image-container icon-image">
              <label class="image-label icon-image--scale" id="add-img-label" for="add-icon-img">${
                cardIcon
                  ? `<img src="${cardIcon}" class="add-card-image--icon">`
                  : `+`
              }</label>
              <input class="image-input" type="file" id="add-icon-img" accept="image/jpeg" />
            </div>
            <span>${id}</span>
            <h3 contenteditable="true">${cardTitle}</h3>
          </div>

          <i class="fa-solid fa-ellipsis"></i>
        </div>
      </div>
      <div class="centralized-container">
        <ul class="add-card-info">
          <li class="grid-item">
            <h5>Created</h5>
          </li>
          <li class="grid-item text-overflow-handler date-created">
            <p class="text-overflow-handler">${cardDateCreated}</p>
          </li>

          <li class="grid-item">
            <h5>Date</h5>
          </li>
          <li class="grid-item text-overflow-handler">
            <p class="text-overflow-handler">
              August 3, 2023 → August 16, 2023
            </p>
          </li>

          <li class="grid-item">
            <h5>Status</h5>
          </li>

          <li class="grid-item">
            ${Status(cardStatus, true)}
          </li>
        </ul>
        <div class="add-card--todo-cards">
          <ul class="add-card--todo-cards--categories">
            <li class="active">
              <i class="fa-solid fa-table"></i> <span>Border View</span>
            </li>
          </ul>
          <ul class="add-card--todo-cards--drag-drop-playground">
            <li class="todo">
              <div class="add-card--todo-cards--drag-drop-playground--header">
                <i class="fa-regular fa-circle"></i> <span>To Do</span>
              </div>
              <ul class="add-card--todo-cards--drag-drop-playground--cards">
                ${AddToDoCardButton("New", true, true)}
              </ul>
            </li>
            <li class="inprogress">
              <div class="add-card--todo-cards--drag-drop-playground--header">
                <i class="fa-regular fa-circle-play"></i>
                <span>In Progress</span>
              </div>
              <ul class="add-card--todo-cards--drag-drop-playground--cards">
                ${AddToDoCardButton("New", true, true)}
              </ul>
            </li>
            <li class="done">
              <div class="add-card--todo-cards--drag-drop-playground--header">
                <i class="fa-regular fa-circle-check"></i> <span>Done</span>
              </div>
              <ul class="add-card--todo-cards--drag-drop-playground--cards">
                ${AddToDoCardButton("New", true, true)}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>`;
};
