export const TaskCard = (cardIcon,id,cardTitle) => {
  return `<li draggable="true">
    <div
      class="add-card--todo-cards--drag-drop-playground--card--content">
      <img
        src="assets/images/card-icon/${cardIcon}"
        alt="image not found"
        height="25px"
        width="25px" />
      <span>${id}</span>
      <p>${cardTitle}</p>
    </div>
    <i class="fa-solid fa-ellipsis"></i>
  </li>`;
};

