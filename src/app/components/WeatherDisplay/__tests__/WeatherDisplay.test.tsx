import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import WeatherDisplay from "../WeatherDisplay";
import { FavoritesProvider } from "../../../context/FavoritesContext";

describe("WeatherDisplay Component", () => {
  const defaultProps = {
    city: "Madrid",
    temperature: 20,
    maxTemperature: 25,
    minTemperature: 15,
    humidity: 50,
    description: "clear sky",
    icon: "01d",
  };

  const renderComponent = () => {
    return render(
      <FavoritesProvider>
        <WeatherDisplay {...defaultProps} />
      </FavoritesProvider>
    );
  };

  it("renders weather information correctly", () => {
    renderComponent();

    expect(screen.getByTestId("city")).toHaveTextContent("Madrid");
    expect(screen.getByTestId("temperature")).toHaveTextContent("20°");
    expect(screen.getByTestId("max-temp")).toHaveTextContent("25°");
    expect(screen.getByTestId("min-temp")).toHaveTextContent("15°");
    expect(screen.getByTestId("humidity")).toHaveTextContent("Humidity: 50%");
    expect(screen.getByAltText("clear sky")).toBeInTheDocument();
  });

  it("displays the filled star icon when the city is a favorite", () => {
    localStorage.setItem("favorites", JSON.stringify([{ name: "Madrid" }]));
    renderComponent();

    const favoriteIcon = screen.getByRole("button");
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveStyle("color: rgb(255, 215, 0)");
  });

  it("displays the outline star icon when the city is not a favorite", () => {
    localStorage.setItem("favorites", JSON.stringify([]));
    renderComponent();

    const favoriteIcon = screen.getByRole("button");
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveStyle("color: rgb(102, 102, 102)");
  });

  it("adds a city to favorites when the star icon is clicked and the city is not a favorite", () => {
    localStorage.setItem("favorites", JSON.stringify([]));
    renderComponent();

    const favoriteIcon = screen.getByRole("button");
    fireEvent.click(favoriteIcon);

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    expect(favorites).toEqual([{ name: "Madrid" }]);
  });

  it("removes a city from favorites when the star icon is clicked and the city is a favorite", () => {
    localStorage.setItem("favorites", JSON.stringify([{ name: "Madrid" }]));
    renderComponent();

    const favoriteIcon = screen.getByRole("button");
    fireEvent.click(favoriteIcon);

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    expect(favorites).toEqual([]);
  });
});
