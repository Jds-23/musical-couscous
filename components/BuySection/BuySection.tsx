import { useState, useContext } from "react";
import styles from "./BuySection.module.css";
import CustomButton from "../Button/Button";
import SwapCurrencyInputBox from "../SwapCurrencyInputBox/SwapCurrencyInputBox";
import Main from "../Main/Main";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ExternalStateContext } from "../../context/ExternalState";
import { ethers, BigNumber, Contract } from "ethers";
import Price from "../Price/Price";
import { BuyOrSell, useAppContext } from "../../context/StateProvider";
import { Types } from "../../reducer/reducer";
import { parseEther, parseUnits } from "ethers/lib/utils";
import RouterABI from "../../contracts/PancakeRouter.json";
interface MyProps {
  onOpen: () => void;
}
const BuySection: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  onOpen,
}) => {
  const { library } = useWeb3React<Web3Provider>();
  const { account } = useWeb3React<Web3Provider>();
  const { state: swapState } = useContext(ExternalStateContext);

  const [fromCurrency, setFromCurrency] = useState("BNB");
  const [toCurrency, setToCurrency] = useState("GAIN");
  const { state: appState, dispatch } = useAppContext();

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
  const buy = async () => {
    if (
      library &&
      process.env.NEXT_PUBLIC_ROUTER_ADDRESS &&
      appState.gainInString &&
      account
    ) {
      const contract = new Contract(
        process.env.NEXT_PUBLIC_ROUTER_ADDRESS,
        RouterABI,
        library.getSigner()
      );
      const response =
        await contract.swapExactTokensForETHSupportingFeeOnTransferTokens(
          appState.bnbInString,
          appState.gainInString?.sub(
            appState.gainInString?.mul(appState.slippageTolerance).div(100)
          ),
          [
            process.env.NEXT_PUBLIC_ETH_ADDRESS,
            process.env.NEXT_PUBLIC_GP_ADDRESS,
          ],
          account,
          Math.floor(Date.now() / 1000) +
            parseFloat(appState.transactionDeadline) * 60
        );
      console.log(response);
    }
  };
  return (
    <div className={styles.container}>
      <Main type={"Buy"}>
        <SwapCurrencyInputBox
          type={"From"}
          amount={appState.bnbInString}
          currency={fromCurrency}
          balance={swapState.balance}
          currencyOptions={[]}
          setAmount={(amount) => {
            dispatch({
              type: Types.gain,
              payload: {
                gain: amount === "" || amount === "." ? "" : getGain(amount),
                bnb: parseEther(amount === "" || amount === "." ? "0" : amount),
              },
            });
          }}
          setCurrency={setFromCurrency}
          style={{ marginTop: "15px", marginBottom: "15px" }}
        />
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <img
            onClick={() =>
              dispatch({
                type: Types.toggleBuyOrSell,
                payload: { toggleBuyOrSell: BuyOrSell.Sell },
              })
            }
            className={`${styles.swap_icon} `}
            src="./images/swap.svg"
          />
        </div>
        <SwapCurrencyInputBox
          type={"To"}
          amount={appState.gainInString}
          currency={toCurrency}
          balance={swapState.GPbalance}
          currencyOptions={[]}
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
          setCurrency={setToCurrency}
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
          <p>Slippage Tolerance</p>
          <p>{appState.slippageTolerance}%</p>
        </div>
        <Price />
        <CustomButton disabled={!account} onClick={buy} block>
          {account ? "Swap" : "Unlock Wallet"}
        </CustomButton>
      </Main>
    </div>
  );
};

export default BuySection;
