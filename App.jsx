import { useMemo, useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Stats from "./components/Stats";

const initialTasks = [
  { id: 1, title: "Learn React components", category: "Learning", completed: true },
  { id: 2, title: "Practice props and data flow", category: "Learning", completed: false },
  { id: 3, title: "Build a responsive UI", category: "Project", completed: false },
  { id: 4, title: "Review JavaScript basics", category: "Study", completed: false }
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("all");

  const visibleTasks = useMemo(() => {
    if (filter === "active") return tasks.filter(task => !task.completed);
    if (filter === "completed") return tasks.filter(task => task.completed);
    return tasks;
  }, [tasks, filter]);

  function addTask(title, category) {
    const newTask = {
      id: Date.now(),
      title,
      category,
      completed: false
    };
    setTasks(current => [newTask, ...current]);
  }

  function toggleTask(id) {
    setTasks(current =>
      current.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(current => current.filter(task => task.id !== id));
  }

  return (
    <div className="app">
      <Header />
      <main className="container">
        <section className="hero">
          <div>
            <p className="eyebrow">React App Project</p>
            <h1>TaskFlow</h1>
            <p>
              A functional task manager demonstrating React components,
              props, state, and parent-to-child data flow.
            </p>
          </div>
        </section>

        <Stats tasks={tasks} />

        <section className="workspace">
          <TaskForm onAddTask={addTask} />

          <div className="list-header">
            <h2>My Tasks</h2>
            <div className="filters">
              {["all", "active", "completed"].map(option => (
                <button
                  key={option}
                  className={filter === option ? "filter active" : "filter"}
                  onClick={() => setFilter(option)}
                >
                  {option[0].toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <TaskList
            tasks={visibleTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        </section>
      </main>

      <footer>TaskFlow • React Components & Data Flow Project</footer>
    </div>
  );
}
