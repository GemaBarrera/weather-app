"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface FavoriteCity {
  name: string;
}

interface FavoritesContextProps {
  favorites: FavoriteCity[];
  addFavorite: (city: string) => void;
  removeFavorite: (city: string) => void;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);

  // Get favorites when the component mounts
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Set favorites
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (city: string) => {
    if (!favorites.find((fav) => fav.name === city)) {
      setFavorites((prev) => [...prev, { name: city }]);
    }
  };

  const removeFavorite = (city: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.name !== city));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextProps => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites debe usarse dentro de un FavoritesProvider");
  }
  return context;
};
