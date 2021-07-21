import React from "react";
import styles from "./Switch.module.css";
import { BuyOrSell, useAppContext } from "../../context/StateProvider";
import { Types } from "../../reducer/reducer";
const Switch: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => {
  const { state, dispatch } = useAppContext();
  return (
    <div className={styles.switch} {...props}>
      <button
        onClick={() =>
          dispatch({
            type: Types.toggleBuyOrSell,
            payload: {
              toggleBuyOrSell: BuyOrSell.Buy,
            },
          })
        }
        className={`${styles.switch__option} ${
          BuyOrSell.Buy === state.toggleBuyOrSell
            ? styles.switch__option__active
            : ""
        }`}
      >
        {"Buy"}
      </button>
      <button
        onClick={() =>
          dispatch({
            type: Types.toggleBuyOrSell,
            payload: {
              toggleBuyOrSell: BuyOrSell.Sell,
            },
          })
        }
        className={`${styles.switch__option} ${
          BuyOrSell.Sell === state.toggleBuyOrSell
            ? styles.switch__option__active
            : ""
        }`}
      >
        {"Sell"}
      </button>

      <span
        style={
          state.toggleBuyOrSell === BuyOrSell.Buy
            ? { left: 0 }
            : { left: "50%" }
        }
        className={styles.switch__drop}
      ></span>
    </div>
  );
};

export default Switch;
