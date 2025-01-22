"use client";

import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  max-width: 600px;
  margin-bottom: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  all: unset;
  flex: 1;
  padding: 10px;
  color: #0d2242;
  font-size: 16px;
  border-bottom: 1px solid #0d2242;
  padding: 6px;
  outline: none;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #0d2242;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #56647c;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SuggestionsList = styled.ul`
  list-style: none;
  background-color: #f0f0f0;
  margin: 40px 0 0;
  padding: 0;
  width: 100%;
  overflow-y: auto;
  position: absolute;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
`;

const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #56647c;
    color: #f0f0f0;
  }
`;

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

  const fetchSuggestions = async (value: string) => {
    if (!value) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (city: string) => {
    setQuery(city);
    setSelectedCity(city);
    // Hide suggestion on select
    setSuggestions([]);
  };

  const handleSearch = () => {
    if (selectedCity || query.trim()) {
      onSearch(selectedCity || query.trim());
    }
  };

  return (
    <Container>
      <InputWrapper>
        <Input
          type="text"
          placeholder="Escribe una ciudad..."
          value={query}
          onChange={handleInputChange}
          onClick={() => setQuery("")}
        />
        <Button onClick={handleSearch} disabled={!query.trim()}>
          Buscar
        </Button>
      </InputWrapper>
      {suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((suggestion, index) => (
            <SuggestionItem
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
