"use client";

import styled from "styled-components";
import { useState } from "react";
import {
  ErrorMessage,
  ForecastDisplay,
  SearchBar,
  WeatherDisplay,
} from "./components";
import { GlobalStyles } from "./styles/GlobalStyles";

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
  temperature: number;
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
    };
    weather: {
      description: string;
      icon: string;
    }[];
  }[];
}

export default function Home() {
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
      const dailyForecast = forecastData.list
        .filter((item) => item.dt_txt.includes("12:00:00"))
        .slice(0, 3)
        .map((item) => ({
          day: new Date(item.dt * 1000).toLocaleDateString("es-ES", {
            weekday: "long",
          }),
          temperature: item.main.temp,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        }));

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
    <>
      <GlobalStyles />
      <ToolContainer style={{ width: "80%", maxWidth: "600px" }}>
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
    </>
  );
}
