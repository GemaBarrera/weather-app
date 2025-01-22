"use client";

import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import { GlobalStyles } from "./styles/GlobalStyles";

export default function Home() {
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);

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

      const data = await response.json();
      setWeather({
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

      const forecastData = await forecastResponse.json();
      const dailyForecast = forecastData.list
        .filter((item: any) => item.dt_txt.includes("12:00:00"))
        .slice(0, 3)
        .map((item: any) => ({
          day: new Date(item.dt * 1000).toLocaleDateString("es-ES", {
            weekday: "long",
          }),
          temperature: item.main.temp,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        }));

      setForecast(dailyForecast);
    } catch (error: any) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <>
      <GlobalStyles />
      <div style={{ width: "80%" }}>
        <SearchBar onSearch={fetchWeather} />
      </div>
    </>
  );
}
