import { BigNumber } from "ethers";
import React, { useState } from "react";
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
const re = /^\d*\.?\d*$/;
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
  const [activate, setActivate] = useState(false);
  return (
    <div className={styles.swapCurrencyOutput} {...props}>
      <div className={styles.swapCurrencyOutput__container}>
        <div className={styles.swapCurrencyOutput__container__row1}>
          <div className={styles.swapCurrencyOutput__container__row1__content}>
            <p>{type}</p>
            <p>
              {balance
                ? `Balance: ${new Intl.NumberFormat("en-US").format(
                    parseFloat(
                      currency === "BNB"
                        ? parseFloat(ethers.utils.formatEther(balance)).toFixed(
                            2
                          )
                        : parseFloat(
                            ethers.utils.formatUnits(balance, 9)
                          ).toFixed(2)
                    )
                  )}`
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
            value={amount}
            onFocus={() => setActivate(true)}
            onBlur={() => setActivate(false)}
            onChange={(e) => {
              if (
                (e.target.value === "" || re.test(e.target.value)) &&
                activate
              ) {
                setAmount(e.target.value);
              }
            }}
          />
          <button>
            <span>
              {(currency || currency !== "") && (
                <img
                  style={currency === "GAIN" ? { marginRight: "2px" } : {}}
                  src={`./images/${currency}.svg`}
                  alt={`${currency}`}
                />
              )}
              <div
                style={
                  currency === "GAIN"
                    ? {
                        marginRight: "0",
                        fontFamily: "Eurostile Bold",
                        fontSize: "14px",
                      }
                    : { marginRight: "4px" }
                }
              >
                {currency || currency !== "" ? currency : "Select a currency"}
              </div>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwapCurrencyInputBox;
