import { Search } from "../../../../common/forms/Search/index.js";
import { AddToDoCardButton } from "../../../../common/forms/AddToDoCardButton/index.js";

export const FilterForm = () => {
  return `<form class="filter-form" method="post">
  ${Search("Search")}
  ${AddToDoCardButton("New",false,false)}
</form>`;
};

