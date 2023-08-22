const statusTypes = {
  0: ["Empty" , "empty--color"],
  1: ["In Progress", "in-progress--color"],
  2: ["Done", "done--color"],
};


export const Status = (key,title) => {
  return (
    statusTypes.hasOwnProperty(key) &&
    `<div class="status ${statusTypes[key][1]} ${title?`status--before`:``}">
  <span class="status-title">${statusTypes[key][0]}</span>
</div>`
  );
};
