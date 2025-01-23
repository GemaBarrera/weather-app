import { HeaderContainer, Logo, Nav, NavLink } from "./HeaderStyles";

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>Weather App</Logo>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/favoritos">Favorites</NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
