import { useCallback, useState } from "react";

interface WeatherData {
  name: string;
  temperature: number;
  maxTemperature: number;
  minTemperature: number;
  humidity: number;
  description: string;
  icon: string;
}

interface ForecastItem {
  day: string;
  maxTemperature: number;
  minTemperature: number;
  description: string;
  icon: string;
}

interface UseWeatherReturn {
  weather: WeatherData | null;
  forecast: ForecastItem[];
  error: string;
  fetchWeather: (city: string) => Promise<void>;
}

interface CurrentWeatherAPIResponse {
  name: string;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
  };
  weather: { description: string; icon: string }[];
}

interface ForecastAPIResponse {
  list: {
    dt: number;
    dt_txt: string;
    main: { temp: number };
    weather: { description: string; icon: string }[];
  }[];
}

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

const useWeather = (): UseWeatherReturn => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [error, setError] = useState("");

  const fetchWeather = useCallback(
    async (city: string) => {
      setWeather(null);
      setForecast([]);
      setError("");

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("City not found. Please, verify the name.");
          } else {
            throw new Error("Error getting the weather. Please, try again.");
          }
        }

        const data: CurrentWeatherAPIResponse = await response.json();
        setWeather({
          name: data.name,
          temperature: data.main.temp,
          maxTemperature: data.main.temp_max,
          minTemperature: data.main.temp_min,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        });

        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!forecastResponse.ok) {
          throw new Error("Error getting the forecast. Please, try again.");
        }

        const forecastData: ForecastAPIResponse = await forecastResponse.json();

        const groupedByDay: Record<string, { temp: number }[]> =
          forecastData.list.reduce((acc, item) => {
            const date = item.dt_txt.split(" ")[0];
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(item.main);
            return acc;
          }, {} as Record<string, { temp: number }[]>);

        const dailyForecast = Object.entries(groupedByDay)
          .slice(0, 3)
          .map(([date, temps]) => {
            const temperatures = temps.map((t) => t.temp);
            const maxTemperature = Math.max(...temperatures);
            const minTemperature = Math.min(...temperatures);

            const middayData = forecastData.list.find(
              (item) =>
                item.dt_txt.includes(date) &&
                (item.dt_txt.includes("12:00:00") || true)
            );

            return {
              day: new Date(date).toLocaleDateString("es-ES", {
                weekday: "long",
              }),
              maxTemperature,
              minTemperature,
              description: middayData?.weather[0].description || "",
              icon: middayData?.weather[0].icon || "",
            };
          });

        setForecast(dailyForecast);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error has ocurred.");
        }
      }
    },
    [setWeather, setForecast, setError]
  );

  return { weather, forecast, error, fetchWeather };
};

export default useWeather;
