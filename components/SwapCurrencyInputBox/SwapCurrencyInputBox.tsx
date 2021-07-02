import { BigNumber } from "ethers";
import React from "react";
import styles from "./SwapCurrencyInputBox.module.css";
import { ethers } from "ethers";
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
  balance: BigNumber | undefined;
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
            <p>
              {balance
                ? `Balance: ${
                    currency === "BNB"
                      ? parseFloat(ethers.utils.formatEther(balance)).toFixed(2)
                      : parseFloat(
                          ethers.utils.formatUnits(balance, 6)
                        ).toFixed(2)
                  }`
                : "-"}
            </p>
          </div>
        </div>
        <div className={styles.swapCurrencyOutput__container__row2}>
          <input
            type="text"
            inputMode={"decimal"}
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
                {currency || currency !== ""
                  ? currency === "GAINPROTOCOL"
                    ? ""
                    : currency
                  : "Select a currency"}
              </div>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwapCurrencyInputBox;
