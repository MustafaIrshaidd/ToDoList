import { ToDoCardsContainer } from '../ToDoCardsContainer/index.js'

export const Main = async () => {
  return (
    `
    <main>
      <div class="centralized-container">

         ${await ToDoCardsContainer()}

      </div>
    </main>
    `
  )
}