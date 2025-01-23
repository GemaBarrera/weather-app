"use client";

import styled from "styled-components";
import {
  ErrorMessage,
  ForecastDisplay,
  SearchBar,
  WeatherDisplay,
} from "../components";

import useFetchWeather from "../hooks/useFetchWeather";

const ToolContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100vh;
  margin-top: 60px;
`;

const WeatherTool: React.FC = () => {
  const { weather, forecast, error, fetchWeather } = useFetchWeather();
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
