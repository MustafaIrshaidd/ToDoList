export const AddToDoCardButton = (placeholder, isCard , isTask) => {
  return `<button class="btn--new add-todo--card ${
    isCard && `card`
  } ${isTask && `task`}">${placeholder}</button>`;
};
