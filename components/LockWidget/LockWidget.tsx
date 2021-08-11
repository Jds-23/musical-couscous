import styles from "./LockWidget.module.css";
import Button from "../Button/Button";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import ConnectButton from "../ConnectButton/ConnectButton";
import { Theme, useTheme } from "../../context/StateProvider";
import WidgetScreen from "../WidgetScreen/WidgetScreen";
import React, { useCallback, useContext, useEffect, useState } from "react";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "ethers";
import SweepstakesABI from "../../contracts/Sweepstakes.json";
import { ExternalStateContext } from "../../context/ExternalState";
import moment from "moment";
import { formatGain } from "../../utils";
import AnimatedLoader from "../AnimatedLoader/AnimatedLoader";
interface MyProps {
  //   opensDate: string;
  show: boolean;
  setShow: (arg: boolean) => void;
  label: string;
}
const LockWidget: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  show,
  setShow,
  label,
}) => {
  const { theme, setTheme } = useTheme();

  const { account, library } = useWeb3React<Web3Provider>();
  const [percentage, setPercentage] = useState(0);
  const { state: externalState } = useContext(ExternalStateContext);
  const [loading, setLoading] = useState(false);
  const state = account
    ? externalState.lockedBalance?.gt(0) && externalState.unlockedDate?.gt(0)
      ? 3
      : percentage > 0
      ? 2
      : 1
    : 0;
  const lockTokens = useCallback(
    async (days: number) => {
      setLoading(true);
      const contract = new Contract(
        process.env.NEXT_PUBLIC_SWEEPSTAKES_ADDRESS!,
        SweepstakesABI,
        library?.getSigner()
      );
      try {
        if (!externalState.GPBalance?.gt(0)) {
          alert("No GAINs in wallet");
          return;
        }
        await contract.lockTokens(
          externalState.GPBalance?.mul(percentage).div(100),
          days
        );
      } catch (err) {
        setLoading(false);
        alert(err.message);
      } finally {
      }
    },
    [library, externalState, percentage, setLoading]
  );

  const getScreen = () => {
    switch (state) {
      case 0:
        return (
          <div
            className={`${styles.lockWidget__content} ${
              theme === "Dark" ? styles.dark : ""
            }`}
          >
            <h1
              className={styles.marginTop}
              style={{ textTransform: "uppercase" }}
            >
              LOCK TOKENS
            </h1>
            <div className={styles.line}></div>
            <h2 style={{ textTransform: "uppercase" }}>
              Connect Wallet to Lock tokens
            </h2>
            <ConnectButton size="sm" />
          </div>
        );
      case 1:
        return (
          <>
            <Header />
            <div
              className={`${styles.lockWidget__content} ${
                theme === "Dark" ? styles.dark : ""
              }`}
            >
              <h1 style={{ textTransform: "uppercase" }}>
                Percentage of tokens to lock
              </h1>
              <div className={styles.line}></div>
              <div className={styles.locks__percent__option}>
                <div>
                  <button
                    style={{ width: "100px" }}
                    className={styles.button__outline}
                    onClick={() => setPercentage(70)}
                  >
                    70%
                  </button>
                  <button
                    style={{ width: "100px" }}
                    className={styles.button__outline}
                    onClick={() => setPercentage(85)}
                  >
                    85%
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    style={{ width: "100px" }}
                    className={styles.button__gradient}
                    onClick={() => setPercentage(100)}
                  >
                    100%
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <Header />
            {loading ? (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AnimatedLoader />
              </div>
            ) : (
              <div
                className={`${styles.lockWidget__content} ${
                  theme === "Dark" ? styles.dark : ""
                }`}
              >
                <h1 style={{ textTransform: "uppercase" }}>LOCK duration</h1>
                <div className={styles.line}></div>
                <button
                  className={styles.button__outline}
                  onClick={() => {
                    lockTokens(30);
                  }}
                >
                  30 DAYS
                </button>
                <button
                  className={styles.button__outline}
                  onClick={() => {
                    lockTokens(60);
                  }}
                >
                  60 DAYS
                </button>
                <button
                  className={styles.button__gradient}
                  onClick={() => {
                    lockTokens(90);
                  }}
                >
                  90 DAYS
                </button>
              </div>
            )}
            <Footer setShow={() => setPercentage(0)} />
          </>
        );
      case 3:
        return (
          <>
            <Header />
            <div
              className={`${styles.lockWidget__content} ${
                theme === "Dark" ? styles.dark : ""
              }`}
            >
              <h3 style={{ textTransform: "uppercase" }}>
                Thank you for being a valued community member
              </h3>
              <div className={styles.line}></div>
              <h3 style={{ textTransform: "uppercase" }}>
                {formatGain(externalState.lockedBalance!, 2)} of your tokens are
                locked. Tokens will be unlocked on{" "}
                {moment
                  .unix(externalState.unlockedDate!.toNumber())
                  .format("LL")}
              </h3>
            </div>
          </>
        );
      // case 4:
      //   return (
      //     <>
      //       <Header />
      //       <div
      //         className={`${styles.lockWidget__content} ${
      //           theme === "Dark" ? styles.dark : ""
      //         }`}
      //       >
      //         <h3 style={{ textTransform: "uppercase" }}>
      //           Tokens will unlock in
      //         </h3>
      //         <div className={styles.line}></div>
      //         <CountdownTimer opensDate={"Sep 1, 2021 00:00:00"} />

      //         <h4
      //           onClick={() => setState(1)}
      //           style={{ textTransform: "uppercase" }}
      //         >
      //           Lock remaining Tokens
      //         </h4>
      //       </div>
      //     </>
      //   );
    }
  };
  return (
    <WidgetScreen show={show} setShow={setShow}>
      <>
        {/* <div className={styles.lockWidget__content}>
          <h1 style={{ textTransform: "uppercase" }}>{label}</h1>
          <div className={styles.line}></div>
          <CountdownTimer opensDate={opensDate} />
        </div> */}
        {getScreen()}
      </>
    </WidgetScreen>
  );
};

export default LockWidget;