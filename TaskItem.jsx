export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <article className={task.completed ? "task completed" : "task"}>
      <div className="task-info">
        <button
          className="check"
          aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
          onClick={() => onToggle(task.id)}
        >
          {task.completed ? "✓" : "○"}
        </button>

        <div>
          <h3>{task.title}</h3>
          <span>{task.category}</span>
        </div>
      </div>

      <button className="delete" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </article>
  );
}
