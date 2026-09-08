import { useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React components', completed: true },
    { id: 2, text: 'Practice state and props', completed: false }
  ])

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    }
    setTodos((current) => [...current, newTodo])
  }

  const toggleTodo = (id) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos((current) => current.filter((todo) => todo.id !== id))
  }

  return (
    <main className="app-shell">
      <section className="todo-card">
        <header>
          <p className="eyebrow">Interactive UI Development with React</p>
          <h1>My Todo List</h1>
          <p className="subtitle">Manage tasks with React state, components, and props.</p>
        </header>

        <TodoForm onAddTodo={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />

        <footer>
          <strong>{todos.filter((todo) => !todo.completed).length}</strong> task(s) remaining
        </footer>
      </section>
    </main>
  )
}