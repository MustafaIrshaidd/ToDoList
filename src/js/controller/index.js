import {
  renderIndexPage,
  removePopUpCard,
  addTaskCard,
  showPopUpCard,
  showPopupStatus,
  updateStatus,
  renderPlaygroundTasks,
  renderToDoCardsContainer,
} from "../model/index.js";

let debounceTimeout;

const onClickRemovePopupCardHandler = (body, id, isNewCard) => {
  const popupOverlay = body.querySelector(".add-card--overlay");

  popupOverlay.addEventListener("click", (ev) => {
    !ev.target.closest(".add-card--popup") &&
      removePopUpCard(popupOverlay, id, isNewCard);
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

const addPlaygroundHandler = (playground, id) => {
  playground &&
    playground.addEventListener("click", (ev) => {
      if (ev.target.tagName == "BUTTON") {

        addTaskCard(ev, id);
      }
    });

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
        if (targetTag === "DIV" || targetTag === "IMG" || targetTag === "P") {
          const closestLi = ev.target.closest("li");
          if (closestLi) {
            closestLi.classList.add("active");
          }
        }
      });

      playgroundSection.addEventListener("drop", (ev) => {
        ev.preventDefault();
        const targetTag = ev.target.tagName;
        if (targetTag === "DIV" || targetTag === "IMG" || targetTag === "P") {
          const closestLi = ev.target.closest("li");
          if (closestLi) {
            let data = ev.dataTransfer.getData("application/json");
            data = JSON.parse(data);
            closestLi.classList.remove("active");

            const recieverContainerIndex = containerIndex;
            const recieverTaskIndex = closestLi.querySelector("span").innerText;

            clearTimeout(debounceTimeout);
            console.log(id)
            debounceTimeout = setTimeout(() => {
              renderPlaygroundTasks(
                { ...data, recieverContainerIndex, recieverTaskIndex },
                id
              );

              addPlaygroundHandler(playground, id);
            }, 20);
          }
        }
      });
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

  addPlaygroundHandler(playground, id);

  addImageHandler(imgInputHelper, imgInputHelperLabel);

  onClickRemovePopupCardHandler(body, id, isNewCard);
};

const onClickAddNewCardHandler = (body) => {
  const addNewCard = body.querySelectorAll(".add-todo--card");

  addNewCard &&
    addNewCard.forEach((newCardBtn) => {
      newCardBtn.addEventListener("click", (ev) => {
        ev.preventDefault();
        showPopUpCard(body, 0, true);
        addPopUpCardHandlers(body, true);
      });
    });
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
    const statusTitle = event.target.closest(".status-title");
    const popupCard = Boolean(event.target.closest(".add-card--popup"));

    statusTitle && updateStatus(statusPopup, statusTitle, id, popupCard);
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

const onClickToDoCardHandler = (body) => {
  const ToDoCardsContainer = body.querySelector(".todo-cards--container");

  ToDoCardsContainer &&
    ToDoCardsContainer.addEventListener("click", (ev) => {
      const ToDoCard = ev.target.closest(".todo-card");
      const status = ev.target.closest(".status-title");

      if (ToDoCard) {
        const id = ToDoCard.querySelector(
          ".todo-card--card-body--header span"
        ).innerText;


        if (status) {
          onClickStatusHandler(status, id);

          return;
        }

        showPopUpCard(body, id);
        addPopUpCardHandlers(body, false, id);
      }
    });
};

window.onload = () => {
  renderIndexPage(document.body);
  onClickToDoCardHandler(document.body);
  onChangeSearchHandler(document.body);
  onClickAddNewCardHandler(document.body);
};
