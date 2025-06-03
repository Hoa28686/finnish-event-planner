import { NavLink, Link } from "react-router";
import styles from "./Header.module.css";
import { IoClose } from "react-icons/io5";
import { FiMoon, FiSun } from "react-icons/fi";
import { LuMenu } from "react-icons/lu";
import { useEffect, useState } from "react";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const prevTheme = localStorage.getItem("theme");
    if (prevTheme === "dark") {
      document.body.classList.add("dark-theme");
      setDarkTheme(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkTheme) {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    }
    setDarkTheme(!darkTheme);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  return (
    <header
      className={`${styles.header} ${showMenu ? styles["show-menu"] : ""}`}
    >
      <div className={styles.headerContainer}>
        <Link to="/" className={styles["nav-logo"]}>
          Event Planner
        </Link>

        <nav
          className={`${styles["nav-menu"]} ${
            showMenu ? styles["show-menu"] : ""
          }`}
        >
          <ul className={styles["nav-list"]}>
            <li>
              <NavLink className={styles["nav-link"]} to="/" onClick={hideMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={styles["nav-link"]}
                to="/add-event"
                onClick={hideMenu}
              >
                Add
              </NavLink>
            </li>
            <li>
              <NavLink
                className={styles["nav-link"]}
                to="/calendar"
                onClick={hideMenu}
              >
                Calendar
              </NavLink>
            </li>
            <li>
              <NavLink
                className={styles["nav-link"]}
                to="/about"
                onClick={hideMenu}
              >
                About
              </NavLink>
            </li>
          </ul>

          {/* close button */}
          <IoClose className={styles["nav-close"]} onClick={hideMenu} />
        </nav>

        <div className={styles["nav-button"]}>
          {darkTheme ? (
            <FiSun className={styles["nav-theme"]} onClick={toggleTheme} />
          ) : (
            <FiMoon className={styles["nav-theme"]} onClick={toggleTheme} />
          )}
          <LuMenu
            className={styles["nav-mini-menu"]}
            onClick={() => setShowMenu(true)}
          />
        </div>
      </div>
    </header>
  );
};
export default Header;
