import React from "react";
import styles from "./Switch.module.css";
import { SwapState, useAppContext } from "../../context/StateProvider";
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
            type: Types.swapState,
            payload: {
              swapState: SwapState.Buy,
            },
          })
        }
        className={`${styles.switch__option} ${
          SwapState.Buy === state.swapState ? styles.switch__option__active : ""
        }`}
      >
        {"Buy"}
      </button>
      <button
        onClick={() =>
          dispatch({
            type: Types.swapState,
            payload: {
              swapState: SwapState.Sell,
            },
          })
        }
        className={`${styles.switch__option} ${
          SwapState.Sell === state.swapState
            ? styles.switch__option__active
            : ""
        }`}
      >
        {"Sell"}
      </button>

      <span
        style={
          state.swapState === SwapState.Buy ? { left: 0 } : { left: "50%" }
        }
        className={styles.switch__drop}
      ></span>
    </div>
  );
};

export default Switch;
