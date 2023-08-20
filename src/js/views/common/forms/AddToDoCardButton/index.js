export const AddToDoCardButton = (placeholder, isCard) => {
  return `<button class="btn--new add-todo--card ${
    isCard ? `card` : ``
  }">${placeholder}</button>`;
};
