import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo_marvel.png"

const Header = ({ modalVisibility, setModalVisibility }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    document.body.style.overflowY = "hidden";

    setModalVisibility({ ...modalVisibility, login: true });
  };
  const handleSignup = () => {
    document.body.style.overflowY = "hidden";
    setModalVisibility({ ...modalVisibility, signup: true });
  };
  return (
    <header>
      <div className="container">
        <div>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <nav className="__main-nav">
          <Link to="/characters">
            <button>Characters</button>
          </Link>
          <Link to="/comics">
            <button>Comics</button>
          </Link>
        </nav>
        <nav className="__user-nav">
          {!Cookies.get("token") && (
            <>
              <button onClick={handleSignup}>Signup</button>
              <button onClick={handleLogin}>Login</button>
            </>
          )}
          {Cookies.get("token") && (
            <Link to="/">
              <button
                onClick={() => {
                  Cookies.remove("token");
                }}
              >
                Disconnect
              </button>
            </Link>
          )}
        </nav>
        <nav className="__favorites-nav">
          {Cookies.get("token") && (
            <Link to="favorites">
              <button>Favoris</button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
