import { useState } from 'react'

export default function TodoForm({ onAddTodo }) {
  const [text, setText] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = text.trim()

    if (!trimmed) return

    onAddTodo(trimmed)
    setText('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Enter a new task..."
        aria-label="New task"
      />
      <button type="submit">Add Task</button>
    </form>
  )
}