import styles from "./TotalAgainAvailable.module.css";
interface MyProps {
  setShowTotalGain: (a: boolean) => void;
}
const Main: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  setShowTotalGain,
  ...props
}) => {
  return (
    <>
      <main className={styles.main} {...props}>
        <div className={styles.main__header}>
          <button
            onClick={() => setShowTotalGain(false)}
            className={`${styles.main__header__title} ${styles.gradientText}`}
          >
            CLOSE
          </button>
        </div>
        <div className={styles.main__body}>
          <div className={styles.row1}>
            <h1 className={styles.row1__header}>TOTAL GAIN</h1>
            <h1 className={styles.row1__number}>2,538,628</h1>
          </div>
          <div className={styles.row2}>
            <div className={styles.row2__left}>
              <h1>Available</h1>
              <h1>25388</h1>
            </div>
            <div className={styles.row2__right}>
              <h1>Locked</h1>
              <h1>2628</h1>
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.row3}>
            <h3>A portion of the locked token is being released daily.</h3>
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
