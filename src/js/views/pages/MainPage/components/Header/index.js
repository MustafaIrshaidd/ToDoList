import { FilterForm } from "../FilterForm/index.js"

export const Header = () => {
    return (
        `<header>
    <div class="centralized-container">
      <h1>To Do List</h1>
      ${FilterForm()}
    </div>
  </header>`
    )
}
