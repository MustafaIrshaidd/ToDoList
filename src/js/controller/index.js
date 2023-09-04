import { deleteToDoListByID } from "../../api/todolistServices.js";
import {
  renderIndexPage,
  removePopUpCard,
  addTaskCard,
  showPopUpCard,
  showPopupStatus,
  updateStatus,
  renderPlaygroundTasks,
  renderToDoCardsContainer,
  showPopupEdit,
  deleteToDoCardInCardsContainer,
} from "../model/index.js";

let debounceTimeout;

const onClickRemovePopupCardHandler = (body, id, isNewCard) => {
  const popupOverlay = body.querySelector(".add-card--overlay");

  popupOverlay.addEventListener("click", async (ev) => {
    !ev.target.closest(".add-card--popup") &&
      (await removePopUpCard(popupOverlay, id, isNewCard));
  });
};

const addImageHandler = (imgInputHelpers, imgInputHelperLabels) => {
  imgInputHelpers.forEach((imgInputHelper, index) => {
    let currentImg = null;

    imgInputHelper.addEventListener("change", () => {
      const file = imgInputHelper.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        if (currentImg) {
          // Replace the current image
          currentImg.src = reader.result;
        } else {
          // Create a new image element and add it
          const newImg = document.createElement("img");
          newImg.src = reader.result;
          newImg.className = "add-card-cover-image"; // Add a class for styling if needed
          imgInputHelperLabels[index].innerText = "";
          imgInputHelperLabels[index].appendChild(newImg);
          currentImg = newImg;
        }
      };

      // Reset image input
      imgInputHelper.value = "";
    });
  });
};

const handleDragDropOnTasks = (playground, id) => {
  playground
    .querySelectorAll(".add-card--todo-cards--drag-drop-playground--cards")
    .forEach((playgroundSection, containerIndex) => {
      playgroundSection.addEventListener("dragleave", (ev) => {
        const closestLi = ev.target.closest("li");
        if (closestLi) {
          closestLi.classList.remove("active");
        }
      });

      playgroundSection.addEventListener("dragstart", (ev) => {
        const targetTag = ev.target.tagName;

        if (targetTag === "LI" || targetTag === "IMG" || targetTag === "P") {
          let senderTaskIndex = ev.target
            .closest("li")
            .querySelector("span").innerText;
          let senderContainerIndex = containerIndex;
          let taskTitle = ev.target.querySelector("p").innerText;

          ev.dataTransfer.setData(
            "application/json",
            JSON.stringify({ senderTaskIndex, senderContainerIndex, taskTitle })
          );
        }
      });

      playgroundSection.addEventListener("dragover", (ev) => {
        ev.preventDefault();
        const targetTag = ev.target.tagName;
        if (
          targetTag === "DIV" ||
          targetTag === "IMG" ||
          targetTag === "P" ||
          targetTag === "BUTTON"
        ) {
          const closestLi = ev.target.closest("li");
          if (closestLi) {
            closestLi.classList.add("active");
          }
        }
      });

      playgroundSection.addEventListener("drop", (ev) => {
        ev.preventDefault();
        const targetTag = ev.target.tagName;
        if (
          targetTag === "DIV" ||
          targetTag === "IMG" ||
          targetTag === "P" ||
          targetTag === "BUTTON"
        ) {
          const closestLi = ev.target.closest("li");
          if (closestLi) {
            let data = ev.dataTransfer.getData("application/json");
            data = JSON.parse(data);
            closestLi.classList.remove("active");

            const recieverContainerIndex = containerIndex;
            let recieverTaskIndex;
            if (targetTag === "BUTTON") {
              recieverTaskIndex = null;
            } else {
              recieverTaskIndex = closestLi.querySelector("span").innerText;
            }

            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(async () => {
              await renderPlaygroundTasks(
                { ...data, recieverContainerIndex, recieverTaskIndex },
                id
              );
              handleDragDropOnTasks(playground, id);
            }, 20);
          }
        }
      });
    });
};

const handleClickAddNewTask = (playground, id) => {
  playground &&
    playground.addEventListener("click", (ev) => {
      if (ev.target.tagName == "BUTTON") {
        addTaskCard(ev, id);
      }
    });
};

export const addPopUpCardHandlers = (body, isNewCard, id) => {
  const imgInputHelper = document.querySelectorAll(".image-input");
  const imgInputHelperLabel = document.querySelectorAll(".image-label");
  const playground = document.querySelector(
    ".add-card--todo-cards--drag-drop-playground"
  );
  const status = document.querySelector(".add-card--popup .status");

  status &&
    status.parentNode.addEventListener("click", (event) => {
      event.preventDefault();

      const statusTitle = event.target.closest(".status-title");

      statusTitle && onClickStatusHandler(statusTitle, id);
    });

  const editBtn = document.querySelector(".add-card--popup .edit-btn");

  editBtn &&
    editBtn.addEventListener("click", (event) => {
      event.preventDefault();

      handleShowEditPopup(id, editBtn, isNewCard);
    });

  handleClickAddNewTask(playground, id);
  handleDragDropOnTasks(playground, id);

  addImageHandler(imgInputHelper, imgInputHelperLabel);

  onClickRemovePopupCardHandler(body, id, isNewCard);
};

const onClickAddNewCardHandler = async (body) => {
  const addNewCard = body.querySelectorAll(".add-todo--card");

  addNewCard &&
    addNewCard.forEach((newCardBtn) => {
      newCardBtn.addEventListener("click", async (ev) => {
        ev.preventDefault();
        await showPopUpCard(body, 0, true);
        addPopUpCardHandlers(body, true);
      });
    });
};

const onClickDeleteCardHandler = async (id, isNewCard) => {
  await deleteToDoListByID(id);

  !isNewCard && deleteToDoCardInCardsContainer(id);
};

const onChangeSearchHandler = (body) => {
  const searchInput = body.querySelector(".search-input");

  searchInput &&
    searchInput.addEventListener("input", (ev) => {
      renderToDoCardsContainer(ev.target.value);
    });
};

const onClickChangeStatusHandler = (statusPopup, id) => {
  statusPopup.addEventListener("click", (event) => {
    event.preventDefault();

    const statusTitle = event.target.closest(".status-title");
    const popupCard = Boolean(event.target.closest(".add-card--popup"));

    if (statusTitle) {
      event.stopPropagation(); // Stop the event from further propagating
      updateStatus(statusPopup, statusTitle, id, popupCard);
    }
  });
};

const onClickStatusHandler = (status, id) => {
  const statusContainer = status.closest(".status");
  const statusHeader = statusContainer.closest(".status--before");

  !statusContainer.closest(".status-list-popup") &&
    showPopupStatus(statusContainer);

  onClickChangeStatusHandler(
    statusHeader.querySelector(".status-list-popup"),
    id
  );
};

const handleClickEditButton = (id, editBtn, isNewCard) => {
  editBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const pressedEditBtn = event.target.closest("button");

    if (pressedEditBtn) {
      if (pressedEditBtn.classList.contains("edit-list--btn-Delete")) {
        const popupOverlay = event.target.closest(".add-card--overlay");
        popupOverlay && popupOverlay.remove();

        onClickDeleteCardHandler(id, isNewCard);
        return;
      }
    } else {
      editBtn.innerHTML = "";
    }
  });
};

const handleShowEditPopup = (id, editBtn, isNewCard) => {
  !editBtn.querySelector(".edit-popup") && showPopupEdit(id, editBtn);

  handleClickEditButton(id, editBtn, isNewCard);
};

export const onClickToDoCardHandler = (body) => {
  const ToDoCardsContainer = body.querySelector(".todo-cards--container");

  ToDoCardsContainer &&
    ToDoCardsContainer.addEventListener("click", async (ev) => {
      const ToDoCard = ev.target.closest(".todo-card");
      const status = ev.target.closest(".status-title");

      if (ToDoCard) {
        const id = ToDoCard.querySelector(
          ".todo-card--card-body--header .id"
        ).innerText;
        const index = ToDoCard.querySelector(
          ".todo-card--card-body--header .index"
        ).innerText;

        const editBtn = ev.target.closest(".edit-btn");

        if (editBtn) {
          handleShowEditPopup(id, editBtn);

          return;
        }

        if (status) {
          onClickStatusHandler(status, id);

          return;
        }

        await showPopUpCard(body, id, false, index);
        addPopUpCardHandlers(body, false, id);
      }
    });
};

window.onload = async () => {
  await renderIndexPage(document.body);
  onClickToDoCardHandler(document.body);
  onChangeSearchHandler(document.body);
  onClickAddNewCardHandler(document.body);
};
