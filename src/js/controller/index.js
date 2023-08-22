import { renderIndexPage } from "../model/index.js";
import { ToDoListPopUpCard } from "../views/pages/MainPage/components/ToDoListPopupCard/index.js";
import { removePopUpCard , addTaskCard } from "../model/index.js";


const onClickRemovePopupCardHandler = (body) => {
  const popupOverlay = body.querySelector(".add-card--overlay");

  popupOverlay.addEventListener("click", (ev) => {
    !ev.target.closest(".add-card--popup") && removePopUpCard(popupOverlay);
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

const addPlaygroundHandler = (playground) => {
  playground &&
    playground.addEventListener("click", (ev) => {
      if(ev.target.tagName=="BUTTON"){
        addTaskCard(ev);
      }
    });
};

const showPopupCard = (body) => {
  const newElement = document.createElement("div");
  newElement.innerHTML = ToDoListPopUpCard(1, "", "", "Untitled", 0);
  body.appendChild(newElement);

  const imgInputHelper = document.querySelectorAll(".image-input");
  const imgInputHelperLabel = document.querySelectorAll(".image-label");
  const playground = document.querySelector(
    ".add-card--todo-cards--drag-drop-playground"
  );

  addPlaygroundHandler(playground);

  addImageHandler(imgInputHelper, imgInputHelperLabel);

  onClickRemovePopupCardHandler(body);
};

const onClickAddNewCardHandler = (body) => {
  const addNewCard = body.querySelectorAll(".add-todo--card");

  addNewCard &&
    addNewCard.forEach((newCardBtn) => {
      newCardBtn.addEventListener("click", (ev) => {
        ev.preventDefault();
        showPopupCard(body);
        console.log("lets add new card");
      });
    });
};

const onChangeSearchHandler = (body) => {
  const searchInput = body.querySelector(".search-input");

  searchInput &&
    searchInput.addEventListener("input", (ev) => {
      console.log(ev.target.value);
    });
};

const onClickToDoCardHandler = (body) => {
  const ToDoCardsContainer = body.querySelector(".todo-cards--container");

  ToDoCardsContainer &&
    ToDoCardsContainer.addEventListener("click", (ev) => {
      const ToDoCard = ev.target.closest(".todo-card");

      if (ToDoCard) {
        const id = ToDoCard.querySelector(
          ".todo-card--card-body--header span"
        ).innerText;
        console.log(id);
      }
    });
};

window.onload = () => {
  renderIndexPage(document.body);
  onClickToDoCardHandler(document.body);
  onChangeSearchHandler(document.body);
  onClickAddNewCardHandler(document.body);
};
