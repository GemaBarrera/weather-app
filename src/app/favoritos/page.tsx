"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { useFavorites } from "../context/FavoritesContext";
import useWeather from "../hooks/useFetchWeather";
import { GlobalStyles } from "../styles/GlobalStyles";
import FavoriteCard from "./FavoriteCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

const CityList = styled.ul`
  display: flex;
  justify-content: space-evenly;
  width: 80vw;
  line-height: 1.5;
  list-style: none;
  padding: 0;
  flex-wrap: wrap;
`;

const CityItem = styled.li<{ $isSelected: boolean }>`
  width: 100px;
  height: 40px;
  margin-right: 10px;
  color: ${(props) => (props.$isSelected ? "#50A4AD" : "#56647c")};
  font-size: ${(props) => props.$isSelected && "18px"};
  cursor: pointer;
  border-radius: 5px;
  align-self: center;

  &:hover {
    background-color: ${(props) => (props.$isSelected ? "#cceeff" : "#f7f7f7")};
  }

  &::after {
    content: "|";
    color: #ccc; /* Cambia el color de la barra */
    margin-left: 10px;
  }

  &:last-child::after {
    content: "";
  }
`;

const CardWrapper = styled.div`
  height: 60vh;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1); /* Borde base */
  border-left-color: #007bff; /* Color del borde que se moverá */
  border-radius: 50%; /* Forma circular */
  width: 40px; /* Tamaño del spinner */
  height: 40px; /* Tamaño del spinner */
  animation: spin 1s linear infinite; /* Animación infinita */

  @keyframes spin {
    from {
      transform: rotate(0deg); /* Inicio de la rotación */
    }
    to {
      transform: rotate(360deg); /* Fin de la rotación */
    }
  }
`;

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
      <GlobalStyles />
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
            <Spinner />
          )}
        </CardWrapper>
      </Container>
    </>
  );
};

export default FavoritesPage;
