import { Search } from "../../../common/forms/Search/index.js";
import { AddBtn } from "../../../common/forms/AddBtn/index.js";

export const FilterForm = () => {
  return `<form class="filter-form" method="post">
  ${Search("Search")}
  ${AddBtn("New")}
</form>`;
};

