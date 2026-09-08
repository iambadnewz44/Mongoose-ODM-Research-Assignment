import { useState } from "react";
import WeatherCard from "./components/WeatherCard";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";

export default function App() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchWeather(event) {
    event.preventDefault();
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    if (!apiKey) {
      setStatus("Add VITE_OPENWEATHER_API_KEY to your .env file before making a request.");
      setWeather(null);
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const url = `${API_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch weather data.");
      }

      setWeather(data);
    } catch (error) {
      setWeather(null);
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">REST API Assignment</p>
        <h1>Weather Explorer</h1>
        <p>
          A React application that sends a GET request to the OpenWeather
          current-weather API and displays the JSON response as a visual dashboard.
        </p>
      </section>

      <section className="panel">
        <form onSubmit={fetchWeather} className="search">
          <label htmlFor="city">City</label>
          <div className="search-row">
            <input
              id="city"
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="Enter a city"
            />
            <button disabled={loading}>{loading ? "Loading..." : "Get Weather"}</button>
          </div>
        </form>

        {status && <div className="message">{status}</div>}

        {weather && <WeatherCard weather={weather} />}
      </section>

      <section className="explanation">
        <h2>REST API Concepts Demonstrated</h2>
        <div className="concept-grid">
          <article><h3>GET</h3><p>The app uses a GET request to retrieve current weather data.</p></article>
          <article><h3>JSON</h3><p>The response is parsed with <code>response.json()</code> and displayed in the UI.</p></article>
          <article><h3>Error Handling</h3><p>HTTP errors and API messages are caught and presented to the user.</p></article>
          <article><h3>API Key Security</h3><p>The key is read from an environment variable and is excluded from Git.</p></article>
        </div>
      </section>

      <footer>REST API Weather Explorer • React + OpenWeather</footer>
    </main>
  );
}
