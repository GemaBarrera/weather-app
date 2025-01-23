import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import "jest-styled-components";
import Header from "../Header";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("highlights the Home link when on the Home page", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    render(<Header />);
    const homeLink = screen.getByText("Home");
    const favoritesLink = screen.getByText("Favorites");

    expect(homeLink).toHaveStyleRule("opacity", "1");
    expect(favoritesLink).toHaveStyleRule("opacity", "0.6");
  });

  it("highlights the Favorites link when on the Favorites page", () => {
    (usePathname as jest.Mock).mockReturnValue("/favorites");
    render(<Header />);
    const homeLink = screen.getByText("Home");
    const favoritesLink = screen.getByText("Favorites");

    expect(favoritesLink).toHaveStyleRule("opacity", "1");
    expect(homeLink).toHaveStyleRule("opacity", "0.6");
  });

  it("applies hover styles to navigation links", async () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    render(<Header />);
    const homeLink = screen.getByText("Home");

    expect(homeLink).toHaveStyleRule("text-decoration", "none");

    await userEvent.hover(homeLink);
    expect(homeLink).toHaveStyleRule("text-decoration", "underline", {
      modifier: ":hover",
    });

    await userEvent.unhover(homeLink);
    expect(homeLink).toHaveStyleRule("text-decoration", "none");
  });
});
