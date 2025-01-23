import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  background: #0d2242;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Day = styled.div`
  text-align: center;
  margin-top: 10px;

  h3 {
    color: #50a4ad;
    font-size: 18px;
    margin-bottom: 5px;
  }

  p {
    color: #f0f0f0;
    font-size: 16px;
    margin: 0 10px 0;
  }

  #min {
    opacity: 0.6;
  }
`;

const DayDetails = styled.div`
  display: flex;
`;

const WeatherIcon = styled.img`
  width: 80px;
  height: 80px;
`;

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
