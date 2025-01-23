"use client";

import {
  Container,
  Day,
  DayDetails,
  WeatherIcon,
} from "./ForecastDisplayStyles";

interface ForecastDay {
  day: string;
  maxTemperature: number;
  minTemperature: number;
  description: string;
  icon: string;
}

interface ForecastDisplayProps {
  forecast: ForecastDay[];
}

const ForecastDisplay: React.FC<ForecastDisplayProps> = ({ forecast }) => {
  return (
    <Container>
      {forecast.map((day, index) => (
        <Day key={`day-${index}`}>
          <WeatherIcon
            src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
            alt={day.description}
          />
          <h3>{day.day}</h3>
          <DayDetails>
            <p>{Math.round(day.maxTemperature)}°</p>
            <p id="min">{Math.round(day.minTemperature)}°</p>
          </DayDetails>
        </Day>
      ))}
    </Container>
  );
};

export default ForecastDisplay;
