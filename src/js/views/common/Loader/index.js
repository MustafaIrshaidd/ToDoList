export const Loader = (isCard) => {
  let innerHTML;

  isCard &&
    (innerHTML = `<div class="todo-card loader">
    
    <div class="" styles="height:231px">
    
    </div>

    <div class="todo-card--card-body">
      
    </div>
    
  </div>`);

  return innerHTML;
};
