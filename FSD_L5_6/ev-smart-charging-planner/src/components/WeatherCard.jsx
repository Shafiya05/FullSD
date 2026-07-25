import { useEffect, useState } from 'react'
import axios from 'axios'

const cityCoordinates = {
  Bangalore: { latitude: 12.9716, longitude: 77.5946 },
  Mysore: { latitude: 12.2958, longitude: 76.6394 },
  Chennai: { latitude: 13.0827, longitude: 80.2707 },
  Hyderabad: { latitude: 17.385, longitude: 78.4867 },
}

function WeatherCard({ city }) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const { latitude, longitude } = cityCoordinates[city]

    async function fetchWeather() {
      setLoading(true)
      setError(false)

      try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
          params: {
            latitude,
            longitude,
            current: 'temperature_2m,weather_code',
          },
          signal: controller.signal,
        })

        setWeather({
          temperature: response.data.current.temperature_2m,
          weatherCode: response.data.current.weather_code,
          updatedAt: new Date(),
        })
      } catch (fetchError) {
        if (fetchError.name !== 'CanceledError') {
          setError(true)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchWeather()

    return () => controller.abort()
  }, [city])

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-xl font-semibold text-slate-900">Live Weather</h2>

      {loading && <p className="mt-3 text-slate-600">Loading weather...</p>}
      {error && <p className="mt-3 text-rose-600">Unable to fetch weather.</p>}

      {weather && !loading && !error && (
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-sky-50 p-3">
            <dt className="text-xs font-semibold uppercase tracking-wide text-sky-700">City Name</dt>
            <dd className="mt-1 font-medium text-slate-900">{city}</dd>
          </div>
          <div className="rounded-lg bg-sky-50 p-3">
            <dt className="text-xs font-semibold uppercase tracking-wide text-sky-700">
              Current Temperature
            </dt>
            <dd className="mt-1 font-medium text-slate-900">{weather.temperature}°C</dd>
          </div>
          <div className="rounded-lg bg-sky-50 p-3">
            <dt className="text-xs font-semibold uppercase tracking-wide text-sky-700">Weather Code</dt>
            <dd className="mt-1 font-medium text-slate-900">{weather.weatherCode}</dd>
          </div>
          <div className="rounded-lg bg-sky-50 p-3">
            <dt className="text-xs font-semibold uppercase tracking-wide text-sky-700">Last Updated</dt>
            <dd className="mt-1 font-medium text-slate-900">
              {weather.updatedAt.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </dd>
          </div>
        </dl>
      )}
    </section>
  )
}

export default WeatherCard
