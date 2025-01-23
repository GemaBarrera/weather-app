"use client";

import React, { useCallback, useState } from "react";
import {
  Button,
  Container,
  Input,
  InputWrapper,
  SuggestionItem,
  SuggestionsList,
} from "./SearchBarStyles";

type CitySuggestion = {
  name: string;
  country: string;
};

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);

  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

  const fetchSuggestions = useCallback(async (value: string) => {
    if (!value) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      fetchSuggestions(value);
    },
    [fetchSuggestions]
  );

  const handleSuggestionClick = (city: string) => {
    setQuery(city);
    setSelectedCity(city);
    // Hide suggestion on select
    setSuggestions([]);
  };

  const handleSearch = useCallback(() => {
    if (selectedCity || query.trim()) {
      onSearch(selectedCity || query.trim());
    }
  }, [selectedCity, query, onSearch]);

  return (
    <Container>
      <InputWrapper>
        <Input
          data-testid="search-input"
          type="text"
          placeholder="Search city"
          value={query}
          onChange={handleInputChange}
          onClick={() => setQuery("")}
        />
        <Button
          data-testid="search-button"
          onClick={handleSearch}
          disabled={!query.trim()}
        >
          Buscar
        </Button>
      </InputWrapper>
      {suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((suggestion, index) => (
            <SuggestionItem
              data-testid={`suggestion-${index}`}
              key={index}
              onClick={() =>
                handleSuggestionClick(
                  `${suggestion.name}, ${suggestion.country}`
                )
              }
            >
              {suggestion.name}, {suggestion.country}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </Container>
  );
};

export default SearchBar;
