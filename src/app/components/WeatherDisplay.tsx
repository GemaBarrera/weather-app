import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  background-color: #0d2242;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const TemperatureWrapper = styled.div`
  width: fit-content;
  text-align: left;
`;

const IconWrapper = styled.div`
  display: flex;
  width: 60%;
  align-items: center;
  justify-content: flex-end;
`;

const Day = styled.h3`
  color: #f0f0f0;
  font-weight: lighter;
`;

const City = styled.h2`
  color: #50a4ad;
`;

const Temperature = styled.h1`
  font-size: 64px;
  color: #f0f0f0;
  margin: 0;
`;

const WeatherDetails = styled.div`
  display: flex;
  margin-top: 10px;
  color: #f0f0f0;

  p {
    margin: 6px 10px 6px 0;
  }

  #min {
    opacity: 0.6;
  }

  #humidity {
    color: #4e85b0;
  }
`;

const WeatherIcon = styled.img`
  width: 160px;
`;

interface WeatherDisplayProps {
  city: string;
  temperature: number;
  maxTemperature: number;
  minTemperature: number;
  humidity: number;
  description: string;
  icon: string;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  city,
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
      <TemperatureWrapper>
        <Temperature>{Math.round(temperature)}°</Temperature>
        <City>{city}</City>
        <Day>Hoy</Day>
        <WeatherDetails>
          <p>{Math.round(maxTemperature)}°</p>
          <p id="min">{Math.round(minTemperature)}°</p>
          <p id="humidity">Humidity: {humidity}%</p>
        </WeatherDetails>
      </TemperatureWrapper>
      <IconWrapper>
        <WeatherIcon src={iconUrl} alt={description} />
      </IconWrapper>
    </Container>
  );
};

export default WeatherDisplay;
