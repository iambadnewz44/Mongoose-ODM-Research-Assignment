import React, { Suspense, useCallback, useMemo, useState } from "react";

const PerformanceDetails = React.lazy(() => import("./components/PerformanceDetails"));

const products = Array.from({ length: 80 }, (_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
  category: ["Technology", "Books", "Fitness", "Home"][index % 4],
  price: 20 + ((index * 17) % 180)
}));

const ProductCard = React.memo(function ProductCard({ product, onSelect }) {
  const [renders, setRenders] = useState(0);

  React.useEffect(() => {
    setRenders(value => value + 1);
  }, []);

  return (
    <article className="card">
      <span className="category">{product.category}</span>
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      <small>Memoized component</small>
      <button onClick={() => onSelect(product)}>View product</button>
      <div className="render-count">Mounted renders: {renders}</div>
    </article>
  );
});

export default function App() {
  const [search, setSearch] = useState("");
  const [sortLow, setSortLow] = useState(true);
  const [selected, setSelected] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredProducts = useMemo(() => {
    const result = products.filter(product =>
      `${product.name} ${product.category}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    return [...result].sort((a, b) =>
      sortLow ? a.price - b.price : b.price - a.price
    );
  }, [search, sortLow]);

  const handleSelect = useCallback((product) => {
    setSelected(product);
  }, []);

  return (
    <main className="container">
      <header className="hero">
        <p className="eyebrow">React Performance Optimization</p>
        <h1>Faster React, better user experience.</h1>
        <p>
          A practical demonstration of code splitting, memoization,
          React.memo, useMemo and useCallback.
        </p>
      </header>

      <section className="panel">
        <div className="controls">
          <input
            aria-label="Search products"
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search products..."
          />
          <button onClick={() => setSortLow(value => !value)}>
            Sort: {sortLow ? "Low → High" : "High → Low"}
          </button>
          <button onClick={() => setShowDetails(value => !value)}>
            {showDetails ? "Hide" : "Show"} optimization notes
          </button>
        </div>

        {showDetails && (
          <Suspense fallback={<p>Loading optimization notes...</p>}>
            <PerformanceDetails />
          </Suspense>
        )}

        {selected && (
          <div className="selected">
            <strong>Selected:</strong> {selected.name} — ${selected.price}
            <button onClick={() => setSelected(null)}>Close</button>
          </div>
        )}

        <p className="result-count">
          Showing {filteredProducts.length} of {products.length} products
        </p>

        <div className="grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </section>

      <footer>
        <p>Performance assignment demo • Built with React and Vite</p>
      </footer>
    </main>
  );
}
