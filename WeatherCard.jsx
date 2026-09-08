export default function WeatherCard({ weather }) {
  const condition = weather.weather?.[0];

  return (
    <article className="weather-card">
      <div className="weather-main">
        <div>
          <p className="location">{weather.name}, {weather.sys?.country}</p>
          <h2>{Math.round(weather.main.temp)}°C</h2>
          <p className="description">{condition?.description}</p>
        </div>
        {condition?.icon && (
          <img
            src={`https://openweathermap.org/img/wn/${condition.icon}@2x.png`}
            alt={condition.description}
          />
        )}
      </div>

      <div className="details">
        <div><strong>{Math.round(weather.main.feels_like)}°C</strong><span>Feels like</span></div>
        <div><strong>{weather.main.humidity}%</strong><span>Humidity</span></div>
        <div><strong>{weather.wind?.speed} m/s</strong><span>Wind</span></div>
        <div><strong>{weather.main.pressure} hPa</strong><span>Pressure</span></div>
      </div>
    </article>
  );
}
