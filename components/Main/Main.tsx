import styles from "./Main.module.css";
const Main: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  return (
    <main className={styles.main}>
      <div className={styles.main__header}>
        <div className={styles.main__header__left}>
          <p>Exchange</p>
          <p>Buy Gain in an Instant</p>
        </div>
        <div className={styles.main__header__right}>
          <button className={styles.main__header__buttons}>
            <img src={"./images/MenuIcon.svg"} />
          </button>
          <button className={styles.main__header__buttons}>
            <img src={"./images/RecentIcon.svg"} />
          </button>
        </div>
      </div>
      <div className={styles.main__body}>{children}</div>
    </main>
  );
};

export default Main;
