import React, { useState, useEffect } from "react";
import { FaTypo3, FaTimes, FaBars } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import "./MyNavbar.css";

const MyNavbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const [check, setCheck] = useState(false);

  const checkAuthor = async () => {
    try {
      const parameters = {
        params: {
          user_UID: currentUser.uid,
        },
      };

      const res = await axios.get("/api/authorUpdate/checkAuthor", parameters, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCheck(res.data["check"]);
    } catch (err) {
      console.log(err);
    }
  };

  checkAuthor();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
      setClick(false);
    } catch {
      setError("Failed to log out");
      alert({ error });
    }
  }

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="myNavbar">
        <div className="myNavbar-container">
          <Link to="/" className="myNavbar-logo" onClick={closeMobileMenu}>
            FLIP <FaTypo3 />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            {click ? (
              <FaTimes style={{ color: "white" }} />
            ) : (
              <FaBars style={{ color: "white" }} />
            )}
          </div>
          <ul className={click ? "myNav-menu active" : "myNav-menu"}>
            {currentUser && (
              <>
                <li className="myNav-item">
                  <Link
                    to="/"
                    className="myNav-links"
                    onClick={closeMobileMenu}
                  >
                    Home
                  </Link>
                </li>
                <li className="MyNav-item">
                  <Link
                    to="/Login"
                    className="myNav-links"
                    onClick={handleLogout}
                  >
                    LogOut
                  </Link>
                </li>
                <li className="myNav-item">
                  <Link
                    to="/update-profile"
                    className="myNav-links"
                    onClick={closeMobileMenu}
                  >
                    Update Profile
                  </Link>
                </li>
              </>
            )}

            {check && currentUser && (
              <li className="myNav-item">
                <Link
                  to="/author-dashboard"
                  className="myNav-links"
                  onClick={closeMobileMenu}
                >
                  Author DashBoard
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default MyNavbar;
