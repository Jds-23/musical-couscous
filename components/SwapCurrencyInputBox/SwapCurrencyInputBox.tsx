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
                <img src={`./images/${currency}.png`} alt={`${currency}`} />
              )}
              <div>
                {currency || currency !== "" ? currency : "Select a currency"}
              </div>
              <svg
                viewBox="0 0 24 24"
                color="text"
                width="20px"
                xmlns="http://www.w3.org/2000/svg"
                className="sc-bdvvaa iQxzfF"
              >
                <path d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwapCurrencyInputBox;
