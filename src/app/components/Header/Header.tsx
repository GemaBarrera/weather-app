"use client";

import {
  HeaderContainer,
  HeaderContentWrapper,
  Logo,
  Nav,
  NavLink,
} from "./HeaderStyles";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const isFavorites = pathname == "/favorites";

  return (
    <HeaderContainer>
      <HeaderContentWrapper>
        <Logo>Weather App</Logo>
        <Nav>
          <NavLink href="/" $isSelected={!isFavorites}>
            Home
          </NavLink>
          <NavLink href="/favorites" $isSelected={isFavorites}>
            Favorites
          </NavLink>
        </Nav>
      </HeaderContentWrapper>
    </HeaderContainer>
  );
};

export default Header;
