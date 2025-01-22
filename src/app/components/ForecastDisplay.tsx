import React, { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Day = styled.div`
  text-align: center;

  h3 {
    font-size: 18px;
    margin-bottom: 5px;
  }

  p {
    font-size: 16px;
    margin: 0;
  }
`;

const WeatherIcon = styled.img`
  width: 60px;
  height: 60px;
`;

interface ForecastDay {
  day: string;
  temperature: number;
  description: string;
  icon: string;
}

interface ForecastDisplayProps {
  forecast: ForecastDay[];
}

const ForecastDisplay: React.FC<ForecastDisplayProps> = ({ forecast }) => {
  useEffect(() => {
    console.log(forecast);
  }, []);
  return (
    <Container>
      {forecast.map((day, index) => (
        <Day key={index}>
          <h3>{day.day}</h3>
          <WeatherIcon
            src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
            alt="Weather Icon"
          />
          <p>{Math.round(day.temperature)}°C</p>
          <p>{day.description}</p>
        </Day>
      ))}
    </Container>
  );
};

export default ForecastDisplay;
