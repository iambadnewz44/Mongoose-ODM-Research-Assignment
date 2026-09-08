export default function Stats({ tasks }) {
  const completed = tasks.filter(task => task.completed).length;
  const remaining = tasks.length - completed;

  return (
    <section className="stats" id="about">
      <div><strong>{tasks.length}</strong><span>Total Tasks</span></div>
      <div><strong>{remaining}</strong><span>Active</span></div>
      <div><strong>{completed}</strong><span>Completed</span></div>
    </section>
  );
}
