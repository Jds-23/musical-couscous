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
  amount: BigNumber | undefined;
  setAmount: (arg0: string) => void;
  currency: string | undefined;
  setCurrency: (arg0: string) => void;
  currencyOptions: string[];
  balance: BigNumber | undefined;
  setShowTotalGain: (a: boolean) => void;
  onMax?: () => void;
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
  setShowTotalGain,
  onMax,
  ...props
}) => {
  const [activate, setActivate] = useState(false);
  const [activeState, setActiveState] = useState("");
  return (
    <div className={styles.swapCurrencyOutput} {...props}>
      <div className={styles.swapCurrencyOutput__container}>
        <div className={styles.swapCurrencyOutput__container__row1}>
          <div className={styles.swapCurrencyOutput__container__row1__content}>
            <p>{type}</p>
            <p
              style={{ textAlign: "right" }}
              onClick={() => setShowTotalGain(true)}
            >
              {balance
                ? `Available Balance: ${new Intl.NumberFormat("en-US").format(
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
            value={
              activate
                ? activeState
                : currency === "BNB"
                ? amount
                  ? ethers.utils.formatEther(amount)
                  : ""
                : amount
                ? parseFloat(ethers.utils.formatUnits(amount, 9)).toFixed(2)
                : ""
            }
            onFocus={() => {
              setActiveState(
                currency === "BNB"
                  ? amount
                    ? ethers.utils.formatEther(amount)
                    : ""
                  : amount
                  ? ethers.utils.formatUnits(amount, 9)
                  : ""
              );
              setActivate(true);
            }}
            onBlur={() => setActivate(false)}
            onChange={(e) => {
              if (e.target.value === "" || re.test(e.target.value)) {
                setActiveState(e.target.value);
                setAmount(e.target.value);
              }
            }}
          />
          {onMax && (
            <button onClick={onMax}>
              <span>
                <div
                  style={{
                    marginRight: 4,
                    fontFamily: "Eurostile Bold",
                    fontSize: "14px",
                  }}
                >
                  MAX
                </div>
              </span>
            </button>
          )}
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
