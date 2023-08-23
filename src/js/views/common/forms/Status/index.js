export const statusTypes = {
  0: ["Empty", "empty--color"],
  1: ["In Progress", "in-progress--color"],
  2: ["Done", "done--color"],
};

export const Status = (key, isBefore) => {
  return (
    statusTypes.hasOwnProperty(key) &&
    `<div class="status ${statusTypes[key][1]} ${
      isBefore ? `status--before` : ``
    }">
  <span class="status-title text-overflow-handler">${statusTypes[key][0]}</span>
</div>`
  );
};
