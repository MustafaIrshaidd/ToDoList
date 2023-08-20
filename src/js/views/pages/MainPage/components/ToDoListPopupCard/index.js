import { Status } from "../../../../common/forms/Status/index.js";
import { TaskCard } from "../TaskCard/index.js";

export const ToDoListPopUpCard = (
  id,
  cardImage,
  cardIcon,
  cardTitle,
  cardStatus,
  cardDateCreated
) => {
  return `<div class="add-card--overlay">
    <div class="add-card--popup">
      <div class="add-card-content">
        <img
          class="add-card-cover-image"
          src="assets/images/card-img/git.png"
          alt="image not found" />

        <div class="add-card-content--header centralized-container">
          <div class="add-card-content--header--container">
            <img
              class="add-card-image--icon"
              src="assets/images/card-icon/giticon.png"
              alt="image not found" />
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
          <li class="grid-item text-overflow-handler">
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
            <li>
              <div class="add-card--todo-cards--drag-drop-playground--header">
                <i class="fa-regular fa-circle"></i> <span>To Do</span>
              </div>
              <ul class="add-card--todo-cards--drag-drop-playground--cards">
                ${TaskCard("giticon.png",1,"Git Hub")}
                ${TaskCard("giticon.png",1,"Git Hub")}
                ${TaskCard("giticon.png",1,"Git Hub")}
                ${TaskCard("giticon.png",1,"Git Hub")}
              </ul>
            </li>
            <li>
              <div class="add-card--todo-cards--drag-drop-playground--header">
                <i class="fa-regular fa-circle-play"></i>
                <span>In Progress</span>
              </div>
              <ul class="add-card--todo-cards--drag-drop-playground--cards">
              
              </ul>
            </li>
            <li>
              <div class="add-card--todo-cards--drag-drop-playground--header">
                <i class="fa-regular fa-circle-check"></i> <span>Done</span>
              </div>
              <ul class="add-card--todo-cards--drag-drop-playground--cards">
                
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>`;
};
