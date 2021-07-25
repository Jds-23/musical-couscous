import CustomModal from "../Modal/Modal";
import styles from "./ConfirmSwapModal.module.css";
import { ModalBody, ModalFooter } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import CustomButton from "../Button/Button";
import {
  BuyOrSell,
  useAppContext,
  useTheme,
} from "../../context/StateProvider";
import Info from "../Info/Info";
import { formatEther, formatUnits } from "ethers/lib/utils";
import RouterABI from "../../contracts/PancakeRouter.json";
import { Contract } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import Price from "../Price/Price";
import { ExternalStateContext } from "../../context/ExternalState";
import { getPriceImpactString, useLiquidity } from "../../utils";

interface MyProps {
  isOpen: boolean;
  onClose: () => void;
  successToast: (swapInfo: string, txId: string) => void;
  onSuccessOpen: () => void;
  onErrorOpen: () => void;
  setErrorMessage: (arg1: string) => void;
}

const ConfirmSwapModal: React.FC<
  React.HTMLAttributes<HTMLDivElement> & MyProps
> = ({
  isOpen,
  onClose,
  successToast,
  onSuccessOpen,
  onErrorOpen,
  setErrorMessage,
  ...props
}) => {
  const { library } = useWeb3React<Web3Provider>();
  const { account } = useWeb3React<Web3Provider>();
  const { theme } = useTheme();
  const { gain, bnb } = useLiquidity();
  const { state: appState } = useAppContext();
  const { state: swapState } = useContext(ExternalStateContext);
  const [loading, setLoading] = useState(false);

  const getBNB = () => {
    return appState.bnbInBigNumber ? formatEther(appState.bnbInBigNumber) : "";
  };
  const getGAIN = () => {
    return appState.gainInBigNumber
      ? formatUnits(appState.gainInBigNumber, 9)
      : "";
  };
  const getSwapInfos = () => {
    if (appState.toggleBuyOrSell === BuyOrSell.Buy) {
      return `Swapped ${getBNB()} BNB for ${getGAIN()} GAIN`;
    } else {
      return `Swapped ${getGAIN()} GAIN for ${getBNB()} BNB`;
    }
  };
  const buy = async () => {
    setLoading(true);
    if (
      library &&
      process.env.NEXT_PUBLIC_ROUTER_ADDRESS &&
      appState.gainInBigNumber &&
      account
    ) {
      const contract = new Contract(
        process.env.NEXT_PUBLIC_ROUTER_ADDRESS,
        RouterABI,
        library.getSigner()
      );
      console.log(
        "Min -deadline - value",
        appState.gainInBigNumber?.sub(
          appState.gainInBigNumber
            ?.mul(parseFloat(appState.slippageTolerance) * 1000)
            .div(100000)
        ),
        Math.floor(Date.now() / 1000) +
          parseFloat(appState.transactionDeadline) * 60,
        appState.bnbInBigNumber
      );
      await contract
        .swapExactETHForTokensSupportingFeeOnTransferTokens(
          appState.gainInBigNumber?.sub(
            appState.gainInBigNumber
              ?.mul(parseFloat(appState.slippageTolerance) * 1000)
              .div(100000)
          ),
          [
            process.env.NEXT_PUBLIC_ETH_ADDRESS,
            process.env.NEXT_PUBLIC_GP_ADDRESS,
          ],
          account,
          Math.floor(Date.now() / 1000) +
            parseFloat(appState.transactionDeadline) * 60,
          { value: appState.bnbInBigNumber }
        )
        .then((res: any) => {
          console.log(res);
          successToast(getSwapInfos(), res.hash);
          onSuccessOpen();
          onClose();
          setLoading(false);
        })
        .catch((err: any) => {
          console.log(err);
          onErrorOpen();
          onClose();
          setLoading(false);
        });
    }
  };
  const sell = async () => {
    setLoading(true);
    if (
      library &&
      process.env.NEXT_PUBLIC_ROUTER_ADDRESS &&
      appState.gainInBigNumber &&
      account
    ) {
      const contract = new Contract(
        process.env.NEXT_PUBLIC_ROUTER_ADDRESS,
        RouterABI,
        library.getSigner()
      );
      console.log(
        "Min -deadline - value",
        appState.bnbInBigNumber?.sub(
          appState.bnbInBigNumber
            ?.mul(parseFloat(appState.slippageTolerance) * 1000)
            .div(100000)
        ),
        Math.floor(Date.now() / 1000) +
          parseFloat(appState.transactionDeadline) * 60,
        appState.gainInBigNumber
      );
      contract
        .swapExactTokensForETHSupportingFeeOnTransferTokens(
          appState.gainInBigNumber,
          appState.bnbInBigNumber?.sub(
            appState.bnbInBigNumber
              ?.mul(parseFloat(appState.slippageTolerance) * 1000)
              .div(100000)
          ),
          [
            process.env.NEXT_PUBLIC_GP_ADDRESS,
            process.env.NEXT_PUBLIC_ETH_ADDRESS,
          ],
          account,
          Math.floor(Date.now() / 1000) +
            parseFloat(appState.transactionDeadline) * 60
        )
        .then((res: any) => {
          console.log(res);
          successToast(getSwapInfos(), res.hash);
          onSuccessOpen();
          onClose();
          setLoading(false);
        })
        .catch((err: any) => {
          console.log(err.message);
          setErrorMessage(err.message);
          onErrorOpen();
          onClose();
          setLoading(false);
        });
      // console.log(response);
    }
  };
  return (
    <>
      <CustomModal
        title={"Confirm Swap"}
        isOpen={isOpen}
        onClose={onClose}
        maxWidth={"553px"}
        {...props}
      >
        <ModalBody background={theme === "Dark" ? "#000" : "#fff"}>
          <div
            className={`${styles.row1} ${theme === "Dark" ? styles.dark : ""}`}
          >
            <div
              className={`${styles.row1__currency} ${
                theme === "Dark" ? styles.dark : ""
              }`}
            >
              <div>
                <img
                  alt={
                    appState.toggleBuyOrSell === BuyOrSell.Buy ? "BNB" : "GAIN"
                  }
                  src={`./images/${
                    appState.toggleBuyOrSell === BuyOrSell.Buy ? "BNB" : "GAIN"
                  }.svg`}
                />
                <p>
                  {appState.toggleBuyOrSell === BuyOrSell.Buy
                    ? getBNB()
                    : getGAIN()}
                </p>
              </div>
              <p>
                {appState.toggleBuyOrSell === BuyOrSell.Buy ? "BNB" : "GAIN"}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "30px",
                height: "30px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19.979"
                height="22.166"
                viewBox="0 0 19.979 22.166"
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
                  id="ArrowBottom"
                  d="M6547.521,560.4a1.6,1.6,0,0,0-2.26,0l-5.663,5.663V550.919a1.6,1.6,0,1,0-3.2,0V566l-5.663-5.663a1.6,1.6,0,0,0-2.26,2.26l8.258,8.258a1.589,1.589,0,0,0,1.263.629h.028a1.594,1.594,0,0,0,1.13-.468l8.363-8.363A1.6,1.6,0,0,0,6547.521,560.4Z"
                  transform="translate(-6528.011 -549.32)"
                  fill="url(#linear-gradient)"
                />
              </svg>
            </div>
            <div
              className={`${theme === "Dark" ? styles.dark : ""} ${
                styles.row1__currency
              }`}
            >
              <div>
                <img
                  alt={
                    appState.toggleBuyOrSell === BuyOrSell.Buy ? "GAIN" : "BNB"
                  }
                  src={`./images/${
                    appState.toggleBuyOrSell === BuyOrSell.Buy ? "GAIN" : "BNB"
                  }.svg`}
                />

                <p>
                  {appState.toggleBuyOrSell === BuyOrSell.Buy
                    ? getGAIN()
                    : getBNB()}
                </p>
              </div>
              <p>
                {appState.toggleBuyOrSell === BuyOrSell.Buy ? "GAIN" : "BNB"}
              </p>
            </div>
            {appState.gainInBigNumber && appState.bnbInBigNumber && (
              <p>
                Output is estimated. You will receive at least{" "}
                {appState.toggleBuyOrSell === BuyOrSell.Buy
                  ? `${formatUnits(
                      appState.gainInBigNumber?.sub(
                        appState.gainInBigNumber
                          ?.mul(parseFloat(appState.slippageTolerance) * 1000)
                          .div(100000)
                      ),
                      9
                    )} GAIN `
                  : `${formatEther(
                      appState.bnbInBigNumber?.sub(
                        appState.bnbInBigNumber
                          ?.mul(parseFloat(appState.slippageTolerance) * 1000)
                          .div(100000)
                      )
                    )} BNB `}
                or the transaction will revert.
              </p>
            )}
          </div>

          <div
            className={`${styles.row2} ${theme === "Dark" ? styles.dark : ""}`}
          >
            <div>
              <h4 className={styles.label}>Price</h4>
              <p style={{ fontSize: "10px" }}>
                <Price />
              </p>
            </div>
            {/* <div>
              <Info
                tooltip="Bypasses confirmation modals and allows high slippage trades. Use at your own risk."
                style={{ fontSize: "10px" }}
              >
                <h4>Toggle Expert Mode</h4>
              </Info>{" "}
              <p style={{ fontSize: "10px" }}>23.42 GAIN PROTOCOL</p>
            </div> */}
            <div>
              <Info tooltip="The difference between the market price and estimated price due to trade size.">
                Price Impact
              </Info>
              <p style={{ color: "#ECB42A", fontSize: "10px" }}>
                {appState.toggleBuyOrSell === BuyOrSell.Buy
                  ? getPriceImpactString(appState.gainInBigNumber, gain)
                  : getPriceImpactString(appState.bnbInBigNumber, bnb)}
              </p>
            </div>
            <div>
              <Info
                tooltip="For each trade a 0.25% fee is paid
- 0.17% to LP token holders
- 0.03% to the Treasury
- 0.05% towards GAIN buyback and burn"
              >
                Liquidity Provider Fee
              </Info>
              <p style={{ fontSize: "10px" }}>
                {formatUnits(
                  appState.gainInBigNumber
                    ? appState.gainInBigNumber?.mul(2).div(1000)
                    : "0",
                  9
                )}{" "}
                GAIN
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter background={theme === "Dark" ? "#000" : "#fff"}>
          <CustomButton
            block
            onClick={() => {
              appState.toggleBuyOrSell === BuyOrSell.Buy ? buy() : sell();
            }}
            disabled={loading}
          >
            Confirm Swap
          </CustomButton>
        </ModalFooter>
      </CustomModal>
    </>
  );
};
export default ConfirmSwapModal;
