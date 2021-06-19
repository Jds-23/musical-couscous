import React from "react";
import styles from "./SwapCurrencyInputBox.module.css";
// enum Type {
//   from,
//   to,
// }
interface MyProps {
  type: string;
  amount: string;
  setAmount: (arg0: string) => void;
  currency: string | undefined;
  setCurrency: (arg0: string) => void;
  currencyOptions: string[];
  balance: string;
}
const SwapCurrencyInputBox: React.FC<
  React.HTMLAttributes<HTMLDivElement> & MyProps
> = ({
  type,
  amount,
  currency,
  balance,
  setCurrency,
  setAmount,
  currencyOptions,
  ...props
}) => {
  return (
    <div className={styles.swapCurrencyOutput} {...props}>
      <div className={styles.swapCurrencyOutput__container}>
        <div className={styles.swapCurrencyOutput__container__row1}>
          <div className={styles.swapCurrencyOutput__container__row1__content}>
            <p>{type}</p>
            <p>{balance !== "" ? `Balance: ${balance}` : "-"}</p>
          </div>
        </div>
        <div className={styles.swapCurrencyOutput__container__row2}>
          <input
            type="text"
            placeholder="-"
            minLength={1}
            maxLength={79}
            spellCheck={false}
            pattern="^[0-9]*[.,]?[0-9]*$"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button>
            <span>
              {(currency || currency !== "") && (
                <img src={`./images/${currency}.svg`} alt={`${currency}`} />
              )}
              <div style={{ marginRight: "4px" }}>
                {currency || currency !== "" ? currency : "Select a currency"}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24.999"
                height="14.535"
                viewBox="0 0 24.999 14.535"
              >
                <defs>
                  <linearGradient
                    id="linear-gradient"
                    y1="0.5"
                    x2="1"
                    y2="0.5"
                    gradientUnits="objectBoundingBox"
                  >
                    <stop offset="0" stop-color="#cfc5f7" />
                    <stop offset="0.894" stop-color="#cfa8f7" />
                  </linearGradient>
                </defs>
                <path
                  id="Path_673"
                  data-name="Path 673"
                  d="M6725.535,511.289a1.992,1.992,0,0,1-1.414-.586l-10.535-10.535a2,2,0,0,1,2.828-2.828l9.121,9.12,9.051-9.05a2,2,0,0,1,2.828,2.828L6726.949,510.7A1.991,1.991,0,0,1,6725.535,511.289Z"
                  transform="translate(-6713 -496.754)"
                  fill="url(#linear-gradient)"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwapCurrencyInputBox;
