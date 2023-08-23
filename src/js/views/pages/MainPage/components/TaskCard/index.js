export const TaskCard = (cardIcon,id,cardTitle) => {
  return `<li draggable="true">
    <div
      class="add-card--todo-cards--drag-drop-playground--card--content">
      <img
        src="assets/images/card-icon/${cardIcon}"
        alt="image not found"
        height="25px"
        width="25px" 
        onerror="this.onerror=null; this.src='assets/images/card-icon/notfound.svg'"/>
      <span>${id}</span>
      <p contenteditable="true">${cardTitle}</p>
    </div>
    <i class="fa-solid fa-ellipsis"></i>
  </li>`;
};

