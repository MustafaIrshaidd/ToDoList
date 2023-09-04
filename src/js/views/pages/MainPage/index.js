import { Header } from "./components/Header/index.js"
import { Main } from "./components/Main/index.js"

export const MainPage = async () => {
  return (
    Header() + await Main()
  )
}

