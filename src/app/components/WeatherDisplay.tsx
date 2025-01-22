import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 20px;
`;

const Temperature = styled.h1`
  font-size: 64px;
  margin: 0;
`;

const WeatherDetails = styled.div`
  font-size: 16px;
  margin-top: 10px;

  p {
    margin: 5px 0;
  }
`;

const WeatherIcon = styled.img`
  width: 80px;
  height: 80px;
`;

interface WeatherDisplayProps {
  temperature: number;
  maxTemperature: number;
  minTemperature: number;
  humidity: number;
  description: string;
  icon: string;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  temperature,
  maxTemperature,
  minTemperature,
  humidity,
  description,
  icon,
}) => {
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <Container>
      <WeatherIcon src={iconUrl} alt="Weather Icon" />
      <Temperature>{Math.round(temperature)}°C</Temperature>
      <p>{maxTemperature}</p>
      <p>{minTemperature}</p>
      <WeatherDetails>
        <p>{description}</p>
        <p>Humedad: {humidity}%</p>
      </WeatherDetails>
    </Container>
  );
};

export default WeatherDisplay;
