"use client";

import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import useWeather from "../hooks/useFetchWeather";
import FavoriteCard from "./FavoriteCard";
import {
  CardWrapper,
  CityItem,
  CityList,
  Container,
} from "./FavoritePageStyles";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const { weather, error, fetchWeather } = useWeather();

  // Set default selected city
  useEffect(() => {
    if (!selectedCity && favorites.length > 0) {
      const firstCity = favorites[0].name;
      setSelectedCity(firstCity);
      fetchWeather(firstCity);
    }
  }, [selectedCity, favorites, fetchWeather]);

  const handleCityClick = (city: string) => {
    if (city !== selectedCity) {
      setIsVisible(false);
      setTimeout(() => {
        setSelectedCity(city);
        fetchWeather(city);
        setIsVisible(true);
      }, 300);
    }
  };

  return (
    <>
      <Container>
        <CityList>
          {favorites.map((fav: { name: string }) => (
            <CityItem
              key={fav.name}
              $isSelected={fav.name === selectedCity}
              onClick={() => handleCityClick(fav.name)}
            >
              {fav.name}
            </CityItem>
          ))}
        </CityList>
        <CardWrapper>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {weather ? (
            <FavoriteCard $isVisible={isVisible} city={weather.name} />
          ) : (
            <p>Add some cities to your favorites.</p>
          )}
        </CardWrapper>
      </Container>
    </>
  );
};

export default FavoritesPage;
