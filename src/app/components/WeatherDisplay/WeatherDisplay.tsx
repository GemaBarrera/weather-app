"use client";

import { useCallback } from "react";
import { FavoriteIcon } from "..";
import { useFavorites } from "../../../context/FavoritesContext";
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
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.name === city);

  const onToggle = useCallback(() => {
    if (isFavorite) {
      removeFavorite(city);
    } else {
      addFavorite(city);
    }
  }, [isFavorite, city, addFavorite, removeFavorite]);

  return (
    <Container data-testid="weather-display">
      <TemperatureWrapper>
        <Temperature data-testid="temperature">
          {Math.round(temperature)}°
        </Temperature>
        <City data-testid="city">{city}</City>
        <Day>Hoy</Day>
        <WeatherDetails>
          <p data-testid="max-temp">{Math.round(maxTemperature)}°</p>
          <p id="min" data-testid="min-temp">
            {Math.round(minTemperature)}°
          </p>
          <p id="humidity" data-testid="humidity">
            Humidity: {humidity}%
          </p>
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
