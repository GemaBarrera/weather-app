import styled from "styled-components";
import { useState } from "react";
import {
  ErrorMessage,
  ForecastDisplay,
  SearchBar,
  WeatherDisplay,
} from "../components";

const ToolContainer = styled.div`
  width: 80%;
  max-width: 600px;
  height: 100vh;
  margin-top: 60px;
`;

interface WeatherState {
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

interface CurrentWeatherAPIResponse {
  name: string;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

interface ForecastAPIResponse {
  list: {
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
      temp_max: number;
      temp_min: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
  }[];
}

const WeatherTool: React.FC = () => {
  const [weather, setWeather] = useState<WeatherState | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [error, setError] = useState<string>("");

  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

  const fetchWeather = async (city: string) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            "Ciudad no encontrada. Por favor, verifica el nombre."
          );
        } else {
          throw new Error("Error al obtener el clima. Inténtalo de nuevo.");
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
        `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!forecastResponse.ok) {
        throw new Error("Error al obtener el pronóstico. Inténtalo de nuevo.");
      }

      const forecastData: ForecastAPIResponse = await forecastResponse.json();

      // Group data by date
      const groupedByDay: Record<string, { temp: number }[]> =
        forecastData.list.reduce((acc, item) => {
          // Get date (YYYY-MM-DD)
          const date = item.dt_txt.split(" ")[0];
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(item.main);
          return acc;
        }, {} as Record<string, { temp: number }[]>);

      // Calculate max and min by day
      const dailyForecast = Object.entries(groupedByDay)
        .slice(0, 3)
        .map(([date, temps]) => {
          const temperatures = temps.map((t) => t.temp);
          const maxTemperature = Math.max(...temperatures);
          const minTemperature = Math.min(...temperatures);

          // Find exact or nearest interval to 12:00:00
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Ha ocurrido un error desconocido.");
      }
    }
  };

  return (
    <ToolContainer>
      <SearchBar onSearch={fetchWeather} />
      {weather && (
        <WeatherDisplay
          city={weather.name}
          temperature={weather.temperature}
          maxTemperature={weather.maxTemperature}
          minTemperature={weather.minTemperature}
          humidity={weather.humidity}
          description={weather.description}
          icon={weather.icon}
        />
      )}
      {forecast.length > 0 && <ForecastDisplay forecast={forecast} />}
      {error !== "" && <ErrorMessage message={error} />}
    </ToolContainer>
  );
};

export default WeatherTool;
