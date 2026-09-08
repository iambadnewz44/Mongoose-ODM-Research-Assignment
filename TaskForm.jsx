import { useState } from "react";

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim()) return;

    onAddTask(title.trim(), category);
    setTitle("");
    setCategory("General");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">New task</label>
        <input
          id="title"
          value={title}
          onChange={event => setTitle(event.target.value)}
          placeholder="Enter a task..."
        />
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={event => setCategory(event.target.value)}
        >
          <option>General</option>
          <option>Learning</option>
          <option>Project</option>
          <option>Study</option>
        </select>
      </div>

      <button type="submit">Add Task</button>
    </form>
  );
}
