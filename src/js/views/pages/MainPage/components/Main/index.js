import { ToDoCardsContainer } from '../ToDoCardsContainer/index.js'

export const Main = () => {
  return (
    `
    <main>
      <div class="centralized-container">

         ${ToDoCardsContainer()}

      </div>
    </main>
    `
  )
}