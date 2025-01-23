import { FavoriteIcon } from "..";
import { useFavorites } from "../../context/FavoritesContext";
import {
  City,
  Container,
  Day,
  IconWrapper,
  Temperature,
  TemperatureWrapper,
  WeatherDetails,
  WeatherIcon,
} from "./WeatherDisplayStyles";

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
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`;

  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.name === city);

  const onToggle = () => {
    if (isFavorite) {
      removeFavorite(city);
    } else {
      addFavorite(city);
    }
  };

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
      <FavoriteIcon isFavorite={isFavorite} onToggle={onToggle} />
    </Container>
  );
};

export default WeatherDisplay;
