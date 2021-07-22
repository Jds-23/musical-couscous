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
import { ethers, BigNumber, Contract } from "ethers";
import { toInteger } from "lodash";
import Price from "../Price/Price";
import { BuyOrSell, useAppContext } from "../../context/StateProvider";
import { Types } from "../../reducer/reducer";
import { formatEther, parseEther, parseUnits } from "ethers/lib/utils";
import RouterABI from "../../contracts/PancakeRouter.json";
import ApproveABI from "../../contracts/Approve.json";
import { useEffect } from "react";

interface MyProps {
  onOpen: () => void;
}
const SellSection: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  onOpen,
}) => {
  const { library } = useWeb3React<Web3Provider>();

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
  useEffect(() => {
    console.log(swapState.allowance);
    if (swapState.allowance) {
      console.log(swapState.allowance?.isZero());
    }
  }, [swapState.allowance]);
  const getGain = (amount: string) => {
    return swapState.reserves0 &&
      process.env.NEXT_PUBLIC_VARIABLE_1 &&
      process.env.NEXT_PUBLIC_VARIABLE_2
      ? swapState.reserves0
          .mul(process.env.NEXT_PUBLIC_VARIABLE_1)
          .mul(parseEther(amount === "" || amount === "." ? "0" : amount))
          .div(
            swapState.reserves1
              .mul(process.env.NEXT_PUBLIC_VARIABLE_2)
              .add(
                BigNumber.from(10)
                  .pow(18)
                  .mul(process.env.NEXT_PUBLIC_VARIABLE_1)
              )
          )
      : undefined;
  };
  const getBnb = (amount: string) => {
    return swapState.reserves1 &&
      process.env.NEXT_PUBLIC_VARIABLE_1 &&
      process.env.NEXT_PUBLIC_VARIABLE_2
      ? swapState.reserves1
          .mul(parseUnits(amount === "" || amount === "." ? "0" : amount, 9))
          .mul(process.env.NEXT_PUBLIC_VARIABLE_1)
          .div(
            swapState.reserves0
              .mul(process.env.NEXT_PUBLIC_VARIABLE_2)
              .add(
                BigNumber.from(10)
                  .pow(9)
                  .mul(process.env.NEXT_PUBLIC_VARIABLE_1)
              )
          )
      : undefined;
  };
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
            parseFloat(ethers.utils.formatUnits(swapState.dailyTransfersOf, 9))
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
          amount={appState.gainInBigNumber}
          currency={fromCurrency}
          balance={swapState.GPbalance}
          currencyOptions={["bnb"]}
          setAmount={(amount) => {
            dispatch({
              type: Types.gain,
              payload: {
                gain:
                  amount === "" || amount === "."
                    ? undefined
                    : parseUnits(amount, 9),
                bnb:
                  amount === "" || amount === "." ? undefined : getBnb(amount),
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
                type: Types.toggleBuyOrSell,
                payload: { toggleBuyOrSell: BuyOrSell.Buy },
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
          balance={swapState.balance}
          currencyOptions={[]}
          setAmount={(amount) => {
            dispatch({
              type: Types.gain,
              payload: {
                gain:
                  amount === "" || amount === "." ? undefined : getGain(amount),
                bnb:
                  amount === "" || amount === "."
                    ? undefined
                    : parseEther(amount),
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
            fontSize: "14px",
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
          {!account ? (
            <CustomButton disabled={!account} block>
              {"Unlock Wallet"}
            </CustomButton>
          ) : (
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
                style={{
                  borderRadius: "14px",
                  width: "60%",
                  fontSize: "12px",
                  lineHeight: "13px",
                }}
                disabled={
                  swapState.allowance !== undefined
                    ? swapState.allowance?.isZero()
                    : true
                }
              >
                {"Swap"}
              </CustomButton>
            </>
          )}
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
