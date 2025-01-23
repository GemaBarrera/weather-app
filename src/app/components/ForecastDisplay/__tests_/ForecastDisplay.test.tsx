import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ForecastDisplay from "../ForecastDisplay";

describe("ForecastDisplay Component", () => {
  const mockForecast = [
    {
      day: "Monday",
      maxTemperature: 25,
      minTemperature: 15,
      description: "sunny",
      icon: "01d",
    },
    {
      day: "Tuesday",
      maxTemperature: 22,
      minTemperature: 12,
      description: "cloudy",
      icon: "02d",
    },
    {
      day: "Wednesday",
      maxTemperature: 20,
      minTemperature: 10,
      description: "rainy",
      icon: "09d",
    },
  ];

  const renderComponent = () => {
    return render(<ForecastDisplay forecast={mockForecast} />);
  };

  it("renders the forecast days correctly", () => {
    renderComponent();

    mockForecast.forEach((day) => {
      expect(screen.getByText(day.day)).toBeInTheDocument();
      expect(screen.getByText(`${day.maxTemperature}°`)).toBeInTheDocument();
      expect(screen.getByText(`${day.minTemperature}°`)).toBeInTheDocument();
      expect(screen.getByAltText(day.description)).toBeInTheDocument();
    });
  });
});
