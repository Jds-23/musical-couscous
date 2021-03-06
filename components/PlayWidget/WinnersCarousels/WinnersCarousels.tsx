import { BigNumber } from "ethers";
import { useContext } from "react";
import { ExternalStateContext } from "../../../context/ExternalState";
import { formatGain } from "../../../utils";
import styles from "./WinnersCarousels.module.css";
const WinnersCarousels = () => {
  const { state: externalState } = useContext(ExternalStateContext);
  const index = externalState.types?.map((i) => i.toNumber()).indexOf(2);
  return (
    <div className={styles.winnersCarousels}>
      <div>
        <p className={styles.address}>{externalState.winners?.[2] || ""}</p>
        <p className={styles.won__text}>
          WON{" "}
          {externalState.amounts && index !== undefined && index >= 0
            ? formatGain(externalState.amounts[index], 2)
            : ""}{" "}
          GAIN
        </p>
      </div>
      {/* <button className={styles.arrowLeft}>
        <img src={"./images/ArrowLeft.png"} />
      </button>
      <button className={styles.arrowRight}>
        <img src={"./images/ArrowRight.png"} />
      </button> */}
    </div>
  );
};

export default WinnersCarousels;
