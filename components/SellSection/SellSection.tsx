import styles from "./SellSection.module.css";
import React, { useState, useContext } from "react";
import CustomButton from "../Button/Button";
import SwapCurrencyInputBox from "../SwapCurrencyInputBox/SwapCurrencyInputBox";
import Main from "../Main/Main";
import ProgressStepper from "../ProgressStepper/ProgressStepper";
import ProgressBar from "../ProgressBar/ProgressBar";
import Info from "../Info/Info";
import HidableBar from "../HidableBar/HidableBar";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ExternalStateContext } from "../../context/ExternalState";
import { ethers, BigNumber } from "ethers";
import { toInteger } from "lodash";
import Price from "../Price/Price";
import { SwapState, useAppContext } from "../../context/StateProvider";
import { Types } from "../../reducer/reducer";
import { parseEther, parseUnits } from "ethers/lib/utils";

interface MyProps {
  onOpen: () => void;
}
const SellSection: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> =
  ({}) => {
    const [fromAmount, setFromAmount] = useState("");
    const [toAmount, setToAmount] = useState("");
    const [balance, setBalance] = useState("");
    const [currency, setCurrency] = useState("bnb");
    const [state2, setState2] = useState(0);
    const [seeMoreDetails, setSeeMoreDetails] = useState(false);

    const { account } = useWeb3React<Web3Provider>();
    const { state: swapState } = useContext(ExternalStateContext);
    const [approving, setApproving] = useState(false);
    const { state: appState, dispatch } = useAppContext();

    const [fromCurrency, setFromCurrency] = useState("GAIN");
    const [toCurrency, setToCurrency] = useState("BNB");
    const approve = () => {
      setApproving(true);
      setTimeout(() => {
        setState2(1);
        setApproving(false);
      }, 40500);
    };

    const getGain = (amount: string) => {
      return swapState.reserves0
        ? swapState.reserves0
            .mul(998)
            .mul(parseEther(amount === "" || amount === "." ? "0" : amount))
            .div(
              swapState.reserves1
                .mul(1000)
                .add(BigNumber.from(10).pow(18).mul(998))
            )
        : undefined;
    };
    const getBnb = (amount: string) => {
      return swapState.reserves1
        ? swapState.reserves1
            .mul(parseUnits(amount === "" || amount === "." ? "0" : amount, 9))
            .mul(998)
            .div(
              swapState.reserves0
                .mul(1000)
                .add(BigNumber.from(10).pow(9).mul(998))
            )
        : undefined;
    };

    return (
      <div className={styles.container}>
        <div className={styles.dailySellingLimit}>
          <Info
            tooltip="The total amount of GAIN you are allowed to sell within 24 hours without
activating the whale protection protocol. Be aware, once whale protection is
activated your transaction will accumulate additional fees depending on the
total amount of GAIN being sold."
            style={{ marginBottom: "7px" }}
          >
            DAILY SELL LIMIT
          </Info>
          <ProgressBar
            current={
              swapState.dailyTransfersOf &&
              parseFloat(
                ethers.utils.formatUnits(swapState.dailyTransfersOf, 9)
              )
            }
            limit={
              swapState.reserves0 &&
              parseFloat(
                parseFloat(
                  ethers.utils.formatUnits(
                    swapState.reserves0.mul(200).div(10000),
                    9
                  )
                ).toFixed(2)
              )
            }
          />
        </div>
        <span
          className={styles.moreDetails}
          onClick={() => setSeeMoreDetails(!seeMoreDetails)}
        >
          {seeMoreDetails ? "CLOSE" : "VIEW"} DETAILS
        </span>
        <HidableBar
          style={{ maxWidth: "500px", padding: "0 30px", marginBottom: "10px" }}
          isHidden={!seeMoreDetails}
        >
          <div className={styles.GPInfo}>
            <div className={styles.label}>
              <Info
                tooltip="The total amount of available liquidity. Available liquidity sets the daily sell
limit and price impact for all transactions. "
              >
                Total Liquidity
              </Info>
            </div>
            <div className={styles.data}>
              <p>
                {new Intl.NumberFormat("en-US").format(
                  parseFloat(
                    parseFloat(
                      ethers.utils.formatUnits(swapState.reserves0, 9)
                    ).toFixed(2)
                  )
                )}{" "}
                GAIN
              </p>
            </div>
          </div>
          <div className={styles.GPInfo}>
            <div className={styles.label}>
              <Info
                tooltip="The total amount of GAIN you are allowed to sell within 24 hours without
activating the whale protection protocol. Be aware, once whale protection is
activated your transaction will accumulate additional fees depending on the
total amount of GAIN being sold."
              >
                Daily Sell Limit
              </Info>
            </div>
            <div className={styles.data}>
              <p>
                {new Intl.NumberFormat("en-US").format(
                  parseFloat(
                    parseFloat(
                      ethers.utils.formatUnits(
                        swapState.reserves0.mul(200).div(10000),
                        9
                      )
                    ).toFixed(2)
                  )
                )}{" "}
                GAIN
              </p>
            </div>
          </div>
        </HidableBar>
        <Main style={{ marginTop: "10px" }} type={"Sell"}>
          <SwapCurrencyInputBox
            type={"From"}
            amount={appState.gainInString}
            currency={fromCurrency}
            balance={swapState.GPbalance}
            currencyOptions={["bnb"]}
            setAmount={(amount) => {
              dispatch({
                type: Types.gain,
                payload: {
                  gain: parseUnits(
                    amount === "" || amount === "." ? "0" : amount,
                    9
                  ),
                  bnb: amount === "" || amount === "." ? "" : getBnb(amount),
                },
              });
            }}
            setCurrency={setCurrency}
            style={{ marginTop: "15px", marginBottom: "15px" }}
          />
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <img
              onClick={() =>
                dispatch({
                  type: Types.swapState,
                  payload: { swapState: SwapState.Buy },
                })
              }
              className={`${styles.swap_icon}`}
              src="./images/swap.svg"
            />
          </div>
          <SwapCurrencyInputBox
            type={"To"}
            currency={toCurrency}
            amount={appState.bnbInString}
            balance={swapState.balance}
            currencyOptions={[]}
            setAmount={(amount) => {
              dispatch({
                type: Types.gain,
                payload: {
                  gain: amount === "" || amount === "." ? "" : getGain(amount),
                  bnb: parseEther(
                    amount === "" || amount === "." ? "0" : amount
                  ),
                },
              });
            }}
            setCurrency={setCurrency}
            style={{ marginTop: "15px", marginBottom: "15px" }}
          />
          <Price />
          <div
            style={{
              display: "flex",
              marginBottom: "30px",
              justifyContent: "space-between",
              color: "#7A71A7",
              padding: "1px 5px",
              fontSize: "14px",
            }}
          >
            <p>Slippage Tolerance</p>
            <p>{appState.slippageTolerance}%</p>
          </div>
          <div style={{ display: "flex", gap: "5px", width: "100%" }}>
            <CustomButton
              onClick={approve}
              style={{
                borderRadius: "14px",
                width: "40%",
                fontSize: "12px",
                lineHeight: "13px",
              }}
              disabled={state2 > 0 || approving}
            >
              {state2 === 0 && !approving && "Approve Gain Protocol"}
              {approving && (
                <span>
                  Approving
                  <img
                    src="./images/reload.svg"
                    className={styles.approving}
                    alt="approving"
                  />
                </span>
              )}
              {state2 >= 1 && !approving && "Approved"}
            </CustomButton>
            <CustomButton
              onClick={() => setState2(2)}
              style={{
                borderRadius: "14px",
                width: "60%",
                fontSize: "12px",
                lineHeight: "13px",
              }}
              disabled={state2 < 1 || approving}
            >
              {"Swap"}
            </CustomButton>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <ProgressStepper state={state2} setState={setState2} />
          </div>
        </Main>
      </div>
    );
  };

export default SellSection;
