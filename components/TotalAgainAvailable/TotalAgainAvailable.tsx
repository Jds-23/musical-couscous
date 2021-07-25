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
            <h1 className={styles.row1__number}>
              {swapState.GPBalance ? formatGain(swapState.GPBalance, 2) : "-"}
            </h1>
          </div>
          <div className={styles.row2}>
            <div className={styles.row2__left}>
              <h1>Available</h1>
              <h1>
                {swapState.GPBalance && swapState.lockedBalanceOf
                  ? formatGain(
                      swapState.GPBalance.sub(swapState.lockedBalanceOf),
                      2
                    )
                  : "-"}
              </h1>
            </div>
            <div className={styles.row2__right}>
              <h1>Locked</h1>
              <h1>
                {swapState.lockedBalanceOf
                  ? formatGain(swapState.lockedBalanceOf, 2)
                  : "-"}
              </h1>
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
