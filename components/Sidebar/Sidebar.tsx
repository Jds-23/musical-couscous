import styles from "./Sidebar.module.css";
import { Theme, useTheme } from "../../context/StateProvider";
import React, { useEffect, useRef, useState } from "react";
import MobileMenu from "../MobileMenu/MobileMenu";
import WidgetCountdownScreen from "../WidgetCountdownScreen/WidgetCountdownScreen";
import LockWidget from "../LockWidget/LockWidget";
import WinnersWidget from "../WinnersWidget/WinnersWidget";
import AffiliatesWidget from "../AffiliatesWidget/AffiliatesWidget";
const Sidebar = () => {
  const { theme, setTheme } = useTheme();
  const [goingUp, setGoingUp] = useState(false);
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const prevScrollY = useRef(0);
  const [showLock, setShowLock] = useState(false);
  const [showWinners, setShowWinners] = useState(false);
  const [showPlay, setShowPlay] = useState(false);
  const [showContribute, setShowContribute] = useState(false);
  const [showAffiliates, setShowAffiliates] = useState(false);
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
      <WidgetCountdownScreen
        opensDate={"Sep 1, 2021 16:00:00"}
        label={"CONTRIBUTIONS OPENS IN"}
        setShow={setShowContribute}
        show={showContribute}
      />
      <WidgetCountdownScreen
        opensDate={"Aug 15, 2021 16:00:00"}
        label={"PLAY TIME STARTS IN"}
        setShow={setShowPlay}
        show={showPlay}
      />
      <WidgetCountdownScreen
        opensDate={"Aug 8, 2021 16:00:00"}
        label={"Lock tokens will be available in"}
        setShow={setShowLock}
        show={showLock}
      />
      <LockWidget label={"LOCK"} setShow={setShowLock} show={showLock} />
      <WinnersWidget
        label={"Winners"}
        setShow={setShowWinners}
        show={showWinners}
      />
      <AffiliatesWidget
        label={"Affiliate starts in"}
        setShow={setShowAffiliates}
        show={showAffiliates}
      />
      <div
        className={`${styles.sidebar} ${
          theme !== "Light" ? styles.sidebar__dark : ""
        } ${goingUp && !hamburgerMenu ? styles.goingUp : ""}`}
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
          onClick={() => setShowContribute(true)}
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
        <button
          onClick={() => setShowLock(true)}
          className={styles.sidebar__button}
          style={theme !== "Light" ? { color: "#fff" } : { color: "#181823" }}
        >
          <img
            className={styles.image__normal}
            src={
              theme !== "Light"
                ? "./images/Sidebar/LightLock.svg"
                : "./images/Sidebar/DarkLock.svg"
            }
          />
          <img
            className={styles.image__hover}
            src={
              theme !== "Light"
                ? "./images/Sidebar/Selected/Dark/Lock.svg"
                : "./images/Sidebar/Selected/Bright/Lock.svg"
            }
          />
          <span
            className={`${styles.button__text} ${styles.button__text__lock}`}
          >
            Lock
          </span>
        </button>
        <MobileMenu
          hamburgerMenu={hamburgerMenu}
          setHamburgerMenu={setHamburgerMenu}
        />
        <button
          onClick={() => setShowPlay(true)}
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
        <button
          className={styles.sidebar__button}
          style={theme !== "Light" ? { color: "#fff" } : { color: "#181823" }}
          onClick={() => {
            setShowAffiliates(!showAffiliates);
          }}
        >
          <img
            className={styles.image__normal}
            src={
              theme !== "Light"
                ? "./images/Sidebar/LightAffiliates.svg"
                : "./images/Sidebar/DarkAffiliates.svg"
            }
          />
          <img
            className={styles.image__hover}
            src={
              theme !== "Light"
                ? "./images/Sidebar/Selected/Bright/Affiliates.svg"
                : "./images/Sidebar/Selected/Dark/Affiliates.svg"
            }
          />
          <span
            className={`${styles.button__text} ${styles.button__text__affiliates}`}
          >
            Affiliates
          </span>
        </button>
        <button
          onClick={() => setShowWinners(true)}
          className={styles.sidebar__button}
          style={theme !== "Light" ? { color: "#fff" } : { color: "#181823" }}
        >
          <img
            className={styles.image__normal}
            src={
              theme !== "Light"
                ? "./images/Sidebar/LightWinners.svg"
                : "./images/Sidebar/DarkWinners.svg"
            }
          />
          <img
            className={styles.image__hover}
            src={
              theme !== "Light"
                ? "./images/Sidebar/Selected/Dark/Winners.svg"
                : "./images/Sidebar/Selected/Bright/Winners.svg"
            }
          />
          <span
            className={`${styles.button__text} ${styles.button__text__winners}`}
          >
            Winners
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
