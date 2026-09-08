export default function PerformanceDetails() {
  return (
    <aside className="notes">
      <h2>Optimization notes</h2>
      <ul>
        <li><strong>React.memo:</strong> avoids re-rendering ProductCard when its props remain unchanged.</li>
        <li><strong>useMemo:</strong> caches the filtered and sorted product list.</li>
        <li><strong>useCallback:</strong> keeps the product selection callback stable.</li>
        <li><strong>Code splitting:</strong> these notes load only when requested.</li>
        <li><strong>Profiling:</strong> use React Developer Tools Profiler to compare commits before and after changes.</li>
      </ul>
    </aside>
  );
}
