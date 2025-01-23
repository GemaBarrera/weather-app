import {
  HeaderContainer,
  HeaderContentWrapper,
  Logo,
  Nav,
  NavLink,
} from "./HeaderStyles";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContentWrapper>
        <Logo>Weather App</Logo>
        <Nav>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/favorites">Favorites</NavLink>
        </Nav>
      </HeaderContentWrapper>
    </HeaderContainer>
  );
};

export default Header;
