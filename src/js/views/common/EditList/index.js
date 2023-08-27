const ListTypes = {
  0: "Delete",
};

export const EditList = () => {
  let editListHTML = ``;
  Object.entries(ListTypes).forEach(([key, value]) => {
    editListHTML += `<button class="edit-list--btn edit-list--btn-${value}">${value}</button>`;
  });

  return `<div class="edit-list">${editListHTML}</div>`;
};
