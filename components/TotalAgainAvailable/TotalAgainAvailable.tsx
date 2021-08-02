import { useContext } from "react";
import { ExternalStateContext } from "../../context/ExternalState";
import { formatGain } from "../../utils";
import styles from "./TotalAgainAvailable.module.css";
interface MyProps {
  setShowTotalGain: (a: boolean) => void;
}
const Main: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  setShowTotalGain,
  ...props
}) => {
  const { state: swapState } = useContext(ExternalStateContext);
  return (
    <>
      <main className={styles.main} {...props}>
        <div className={styles.main__header}>
          <span
            onClick={() => setShowTotalGain(false)}
            className={`${styles.main__header__title} ${styles.gradientText}`}
          >
            CLOSE
          </span>
        </div>
        <div className={styles.main__body}>
          <div className={styles.row1}>
            <h1 className={styles.row1__header}>TOTAL GAIN</h1>
            <h1 className={styles.row1__number}>
              {swapState.GPBalance ? formatGain(swapState.GPBalance, 0) : "-"}
            </h1>
          </div>
          <div className={styles.row2}>
            <div className={styles.row2__left}>
              <h1>Available</h1>
              <h1 className={styles.row2__left__balance}>
                {swapState.GPBalance && swapState.lockedBalanceOf
                  ? formatGain(
                      swapState.GPBalance.sub(swapState.lockedBalanceOf),
                      0
                    )
                  : "-"}
              </h1>
            </div>
            <div className={styles.row2__right}>
              <h1>Locked</h1>
              <h1 className={styles.row2__right__balance}>
                {swapState.lockedBalanceOf
                  ? formatGain(swapState.lockedBalanceOf, 0)
                  : "-"}
              </h1>
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.row3}>
            <h3>Only available tokens can be sold.</h3>
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
