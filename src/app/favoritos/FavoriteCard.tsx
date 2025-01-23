"use client";

import React, { useEffect } from "react";
import WeatherDisplay from "../components/WeatherDisplay";
import useFetchWeather from "../hooks/useFetchWeather";
import styled from "styled-components";

const Card = styled.div<{ $isVisible: boolean }>`
  margin: "auto";
  textalign: "center";
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  background-color: #56647c;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  justify-self: center;
`;

interface FavoriteCardProps {
  city: string;
  $isVisible: boolean;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({ $isVisible, city }) => {
  const { weather, error, fetchWeather } = useFetchWeather();

  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <Card $isVisible={$isVisible}>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
    </Card>
  );
};

export default FavoriteCard;
