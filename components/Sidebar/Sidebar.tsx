import styles from "./Sidebar.module.css";
import { Theme, useTheme } from "../../context/StateProvider";
import React, { useEffect, useRef, useState } from "react";
import MobileMenu from "../MobileMenu/MobileMenu";
const Sidebar = () => {
  const { theme, setTheme } = useTheme();
  const [goingUp, setGoingUp] = useState(true);
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const prevScrollY = useRef(0);
  const [showBuy, setShowBuy] = useState(false);
  const [showPlay, setShowPlay] = useState(false);
  const [showContribute, setShowContribute] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current < currentScrollY && goingUp) {
        setGoingUp(false);
      }
      if (prevScrollY.current > currentScrollY && !goingUp) {
        setGoingUp(true);
      }
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp]);
  return (
    <>
      <div
        className={`${styles.sidebar} ${
          theme !== "Light" ? styles.sidebar__dark : ""
        } ${!goingUp && !hamburgerMenu ? styles.goingUp : ""}`}
      >
        {/* <span className={styles.left__line}></span>
      <span className={styles.right__line}></span> */}
        <div className={styles.background}></div>
        <button
          className={styles.sidebar__button}
          style={theme !== "Light" ? { color: "#fff" } : { color: "#181823" }}
          onClick={() => {
            theme === "Light" ? setTheme(Theme.Dark) : setTheme(Theme.Light);
          }}
        >
          <img
            className={styles.image__normal}
            src={
              theme !== "Light"
                ? "./images/Sidebar/LightDarkMode.svg"
                : "./images/Sidebar/DarkLightMode.svg"
            }
          />
          <img
            className={styles.image__hover}
            src={
              theme !== "Light"
                ? "./images/Sidebar/Selected/Dark/DarkMode.svg"
                : "./images/Sidebar/Selected/Bright/BrightMode.svg"
            }
          />
          <span
            className={`${styles.button__text} ${styles.button__text__mood}`}
          >
            Mood
          </span>
        </button>
        <button
          className={styles.sidebar__button}
          style={theme !== "Light" ? { color: "#fff" } : { color: "#181823" }}
        >
          <img
            className={styles.image__normal}
            src={
              theme !== "Light"
                ? "./images/Sidebar/LightPlay.svg"
                : "./images/Sidebar/DarkPlay.svg"
            }
          />
          <img
            className={styles.image__hover}
            src={
              theme !== "Light"
                ? "./images/Sidebar/Selected/Dark/Play.svg"
                : "./images/Sidebar/Selected/Bright/Play.svg"
            }
          />
          <span
            className={`${styles.button__text} ${styles.button__text__play}`}
          >
            Play
          </span>
        </button>
        <MobileMenu
          hamburgerMenu={hamburgerMenu}
          setHamburgerMenu={setHamburgerMenu}
        />
        <button
          className={styles.sidebar__button}
          style={theme !== "Light" ? { color: "#fff" } : { color: "#181823" }}
        >
          <img
            className={styles.image__normal}
            src={
              theme !== "Light"
                ? "./images/Sidebar/LightContribute.svg"
                : "./images/Sidebar/DarkContribute.svg"
            }
          />
          <img
            className={styles.image__hover}
            src={
              theme !== "Light"
                ? "./images/Sidebar/Selected/Dark/Contribute.svg"
                : "./images/Sidebar/Selected/Bright/Contribute.svg"
            }
          />
          <span
            className={`${styles.button__text} ${styles.button__text__pledge}`}
          >
            Pledge
          </span>
        </button>
        <a
          href={"https://www.gainprotocol.com/"}
          className={`${styles.sidebar__button}`}
          style={theme !== "Light" ? { color: "#fff" } : { color: "#181823" }}
        >
          <img
            className={styles.image__normal}
            src={
              theme !== "Light"
                ? "./images/Sidebar/LightHome.svg"
                : "./images/Sidebar/DarkHome.svg"
            }
          />
          <img
            className={styles.image__hover}
            src={
              theme !== "Light"
                ? "./images/Sidebar/LightHome.svg"
                : "./images/Sidebar/DarkHome.svg"
            }
          />
          <span
            className={`${styles.button__text} ${styles.button__text__home}`}
          >
            Home
          </span>
        </a>
      </div>
    </>
  );
};

export default Sidebar;
