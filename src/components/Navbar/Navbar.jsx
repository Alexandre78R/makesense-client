import { useState } from "react";
import authService from "../../services/auth";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../store/auth";
import { useSelector, useDispatch } from "react-redux";
import logoWhite from "../../assets/makesense_logo_white.svg";
import logoBlue from "../../assets/makesense_logo_blue.svg";
import CustomToast from "../CustomToast/CustomToast";

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { showAlert } = CustomToast();

  const handleSubmit = async (event) => {
    try {
      await authService.logout();
      dispatch(logout());
      localStorage.setItem("userlogin", "false");
      navigate("/login");
    } catch (err) {
      console.log("err", err);
      showAlert(
        "error",
        "Nous rencontrons un problème, en espérant très vite(.js) chez MAKESENSE !"
      );
    }
  };

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };
  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return !auth.user ? (
    <nav className="nav2">
      <img className="nav_logo" src={logoWhite} alt="makesense logo" />
    </nav>
  ) : (
    <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"} `}>
      <div className="transparent"></div>
      <Link to="/">
        <img className="nav_logo" src={logoBlue} alt="makesense logo" />
      </Link>
      <div className="nav-linksDesktop">
        <ul>
          <li>
            <Link to="/">Découvrir les projets</Link>
          </li>
          <li>
            <Link to="/titleproject">Lancer mon projet</Link>
          </li>
          <li>
            <Link to="/guide">Comment se lancer</Link>
          </li>
        </ul>
      </div>
      <div></div>
      <img className="nav_bell" src="../src/assets/bell.svg" alt="bell" />
      <div className="burgerAvatar">
        <img
          className="menu"
          src="../src/assets/menu.png"
          alt="menu"
          onClick={handleShowLinks}
        />
        <img
          className="nav_avatar_default"
          src={auth?.user?.avatar}
          alt="default avatar"
          onClick={handleShowDropdown}
        />
      </div>
      {showDropdown ? (
        <div className="dropdown">
          <ul>
            <li onClick={handleShowDropdown}>
              <Link to="/monprofil">Mon profil</Link>
            </li>
            <li onClick={handleShowDropdown}>
              <Link to="/suiviprojet">Suivi de Projets</Link>
            </li>
            <li onClick={handleShowDropdown}>
              <Link to="/admin">Adminstration</Link>
            </li>
            <li>
              <Link to="/login" onClick={handleSubmit}>
                Déconnexion
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
      <img
        className="cross"
        src="../src/assets/Cross.png"
        alt="cross"
        onClick={handleShowLinks}
      />
      <div className="nav-links">
        <img
          className="nav_avatar_big"
          src={auth?.user?.avatar}
          alt="big avatar"
        />
        <ul>
          <li>
            <Link to="/monprofil">Mon profil</Link>
          </li>
          <li>
            <Link to="/suiviprojet">Suivi de Projets</Link>
          </li>
          <li>
            <Link to="/admin">Adminstration</Link>
          </li>
          <li>
            <Link to="/login" onClick={handleSubmit}>
              Déconnexion
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
