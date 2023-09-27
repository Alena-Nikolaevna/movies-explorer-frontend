import { NavLink } from "react-router-dom";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
function Header({ isLoggedIn }) {
  return (
    <header className="header">
      <NavLink to="/" className="header__logo"></NavLink>
      {isLoggedIn ? (
        <>
          <ul className="header__menu">

            <li className="header__menu-item">
              <NavLink to="/movies" className="header__menu-link">Фильмы</NavLink>
            </li>

            <li className="header__menu-item">
                <NavLink to="/saved-movies" className="header__menu-link">Сохранённые фильмы</NavLink>
            </li>
          </ul>

          <NavLink to="/profile" className="header__menu-button">Аккаунт</NavLink>
        </>
        
      ) : (
        <div className="header__links">
          <NavLink to="/signup" className="header__register-link">
            Регистрация
          </NavLink>
          <NavLink to="/signin" className="header__login-link">
            Войти
          </NavLink>
        </div>
      )}
      <BurgerMenu isLoggedIn={isLoggedIn}></BurgerMenu>
    </header>
  );
}

export default Header;