import styles from "./SellSection.module.css";
import React, { useState, useContext } from "react";
import CustomButton from "../Button/Button";
import SwapCurrencyInputBox from "../SwapCurrencyInputBox/SwapCurrencyInputBox";
import Main from "../Main/Main";
import TotalAgainAvailable from "../TotalAgainAvailable/TotalAgainAvailable";
import ProgressStepper from "../ProgressStepper/ProgressStepper";
import ProgressBar from "../ProgressBar/ProgressBar";
import Info from "../Info/Info";
import HidableBar from "../HidableBar/HidableBar";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ExternalStateContext } from "../../context/ExternalState";
import { ethers, BigNumber, Contract } from "ethers";
import { isUndefined, toInteger } from "lodash";
import Price from "../Price/Price";
import { BuyOrSell, useAppContext } from "../../context/StateProvider";
import { Types } from "../../reducer/reducer";
import { formatEther, parseEther, parseUnits } from "ethers/lib/utils";
import RouterABI from "../../contracts/PancakeRouter.json";
import ApproveABI from "../../contracts/Approve.json";
import { useEffect } from "react";
import {
  formatGain,
  getAmountIn,
  getAmountOut,
  tryParseEther,
  tryParseGain,
  useLiquidity,
} from "../../utils";

interface MyProps {
  onOpen: () => void;
}
const SellSection: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  onOpen,
}) => {
  const { library } = useWeb3React<Web3Provider>();

  const { gain, bnb } = useLiquidity();

  const [currency, setCurrency] = useState("bnb");
  const [state2, setState2] = useState(0);
  const [seeMoreDetails, setSeeMoreDetails] = useState(false);

  const { account } = useWeb3React<Web3Provider>();
  const { state: swapState } = useContext(ExternalStateContext);
  const [approving, setApproving] = useState(false);
  const { state: appState, dispatch } = useAppContext();
  const [examinedLockedBalanceAccount, setExaminedLockedBalanceAccount] =
    useState(BigNumber.from(0));

  const [showTotalGain, setShowTotalGain] = useState(false);

  const [fromCurrency, setFromCurrency] = useState("GAIN");
  const [toCurrency, setToCurrency] = useState("BNB");
  const approve = () => {
    setApproving(true);
    setTimeout(() => {
      setState2(1);
      setApproving(false);
    }, 40500);
  };
  useEffect(() => {
    console.log(swapState.allowance);
    if (swapState.allowance) {
      console.log(swapState.allowance?.isZero());
    }
  }, [swapState.allowance]);

  useEffect(() => {
    if (
      swapState.lockedBalanceOf &&
      examinedLockedBalanceAccount.toString() !=
        swapState.lockedBalanceOf.toString()
    ) {
      setExaminedLockedBalanceAccount(swapState.lockedBalanceOf);
      if (swapState.lockedBalanceOf.gt(0)) {
        setShowTotalGain(true);
      }
    }
  }, [
    swapState,
    examinedLockedBalanceAccount,
    setExaminedLockedBalanceAccount,
  ]);

  const approveFunction = async () => {
    if (
      process.env.NEXT_PUBLIC_ROUTER_ADDRESS &&
      library &&
      process.env.NEXT_PUBLIC_GP_ADDRESS
    ) {
      const contract = new Contract(
        process.env.NEXT_PUBLIC_GP_ADDRESS,
        ApproveABI,
        library.getSigner()
      );
      const response = await contract.approve(
        process.env.NEXT_PUBLIC_ROUTER_ADDRESS,
        BigNumber.from(2).pow(256).sub(1)
      );
    }
  };
  const checkIfDisabled = () => {
    if (!account) {
      return "Unlock Wallet";
    }
    if (swapState.allowance && !swapState.allowance.isZero()) {
      if (!appState.gainInBigNumber) {
        return "Enter Amount";
      } else {
        if (appState.gainInBigNumber.isZero()) {
          return "Enter Amount";
        }
        if (
          swapState.GPBalance &&
          appState.gainInBigNumber.gt(swapState.GPBalance)
        ) {
          return "Insufficient GAIN Balance";
        }
        return "Sell";
      }
    } else {
      return "Not Approved";
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.dailySellingLimit}>
        <Info
          tooltip="The total amount of GAIN you are allowed to sell within 24 hours without
activating the whale protection protocol. Be aware, once whale protection is
activated your transaction will accumulate additional fees depending on the
total amount of GAIN being sold."
          style={{ marginBottom: "7px", fontWeight: "bold" }}
        >
          DAILY SELL LIMIT
        </Info>
        <ProgressBar
          current={
            swapState.dailyTransfersOf &&
            parseFloat(ethers.utils.formatUnits(swapState.dailyTransfersOf, 9))
          }
          limit={
            gain &&
            swapState.whaleProtectionPercentFromLP &&
            parseFloat(
              parseFloat(
                ethers.utils.formatUnits(
                  gain
                    .div(100)
                    .mul(swapState.whaleProtectionPercentFromLP)
                    .div(10000),
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
            <p>{gain ? `${formatGain(gain, 2)} GAIN` : "Loading.."}</p>
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
              {gain && swapState.whaleProtectionPercentFromLP
                ? `${formatGain(
                    gain
                      .div(100)
                      .mul(swapState.whaleProtectionPercentFromLP)
                      .div(10000),
                    2
                  )} GAIN`
                : "Loading.."}
            </p>
          </div>
        </div>
      </HidableBar>
      {true ? (
        <TotalAgainAvailable
          setShowTotalGain={setShowTotalGain}
          style={{ height: "612.5px" }}
        />
      ) : (
        <Main style={{ marginTop: "10px" }} type={"Sell"}>
          <SwapCurrencyInputBox
            onMax={() => {
              if (!swapState.GPBalance || !swapState.lockedBalanceOf) {
                return;
              }
              const availableBalance = swapState.GPBalance.sub(
                swapState.lockedBalanceOf
              );

              dispatch({
                type: Types.gain,
                payload: {
                  gain: availableBalance.mul(965).div(1000),
                  bnb: getAmountOut(
                    gain,
                    bnb,
                    availableBalance.mul(965).div(1000)
                  ),
                },
              });
            }}
            type={"From"}
            amount={appState.gainInBigNumber}
            setShowTotalGain={setShowTotalGain}
            currency={fromCurrency}
            balance={swapState.GPBalance}
            currencyOptions={["bnb"]}
            setAmount={(amount) => {
              const value = tryParseGain(amount, undefined);
              dispatch({
                type: Types.gain,
                payload: {
                  gain: value,
                  bnb: getAmountOut(gain, bnb, value),
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
              alt="Swap"
              onClick={() =>
                dispatch({
                  type: Types.toggleBuyOrSell,
                  payload: {
                    toggleBuyOrSell: BuyOrSell.Buy,
                    liquidity: { gain, bnb },
                  },
                })
              }
              className={`${styles.swap_icon}`}
              src="./images/swap.svg"
            />
          </div>
          <SwapCurrencyInputBox
            type={"To"}
            currency={toCurrency}
            amount={appState.bnbInBigNumber}
            setShowTotalGain={(a: boolean) => {}}
            balance={swapState.balance}
            currencyOptions={[]}
            setAmount={(amount) => {
              const value = tryParseEther(amount, undefined);
              if (isUndefined(value)) {
                return;
              }
              dispatch({
                type: Types.bnb,
                payload: {
                  gain: getAmountIn(gain, bnb, value),
                  bnb: value,
                },
              });
            }}
            setCurrency={setCurrency}
            style={{ marginTop: "15px", marginBottom: "15px" }}
          />
          <div
            style={{
              display: "flex",
              marginBottom: "30px",
              justifyContent: "space-between",
              color: "#7A71A7",
              padding: "1px 5px",
              fontSize: "12px",
            }}
          >
            <p>Price</p>
            <p style={{ textAlign: "right" }}>
              <Price />
            </p>
          </div>

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
            <>
              <CustomButton
                onClick={approveFunction}
                style={{
                  borderRadius: "14px",
                  width: "40%",
                  fontSize: "12px",
                  lineHeight: "13px",
                }}
                disabled={
                  swapState.allowance !== undefined
                    ? !swapState.allowance?.isZero()
                    : true
                }
              >
                {swapState.allowance !== undefined
                  ? !swapState.allowance?.isZero()
                    ? "Approved"
                    : "Approve Gain Protocol"
                  : "Approve Gain Protocol"}
                {/* {approving && (
                <span>
                  Approving
                  <img
                    src="./images/reload.svg"
                    className={styles.approving}
                    alt="approving"
                  />
                </span>
              )} */}
              </CustomButton>
              <CustomButton
                onClick={() => onOpen()}
                style={
                  checkIfDisabled() === "Insufficient GAIN Balance"
                    ? {
                        borderRadius: "14px",
                        width: "60%",
                        fontSize: "12px",
                      }
                    : {
                        borderRadius: "14px",
                        width: "60%",
                      }
                }
                disabled={checkIfDisabled() !== "Sell"}
              >
                {checkIfDisabled()}
              </CustomButton>
            </>
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
      )}
    </div>
  );
};

export default SellSection;
