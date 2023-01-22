import { Habit } from "./components/Habits"

function App() {
  return (
    <>
      <Habit completed={3} />
      <Habit completed={12} />
      <Habit completed={7} />
      <Habit completed={3} />
    </>
  )
}

export default App
