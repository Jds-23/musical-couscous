import styles from "./LockWidget.module.css";
import Button from "../Button/Button";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import ConnectButton from "../ConnectButton/ConnectButton";
import { Theme, useTheme } from "../../context/StateProvider";
import WidgetScreen from "../WidgetScreen/WidgetScreen";
import Progressbar from "./Progressbar/Progressbar";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { BigNumber, Contract } from "ethers";
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
  const [days, setDays] = useState(90);
  const [percentageButton, setPercentageButton] = useState(100);
  const { state: externalState } = useContext(ExternalStateContext);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showLockScreen, setShowLockScreen] = useState(false);
  const [amount, setAmount] = useState(0);

  const state: number = account
    ? externalState.lockedBalance?.gt(0) && externalState.unlockedDate?.gt(0)
      ? showLockScreen
        ? 5
        : showDetails
        ? 4
        : 3
      : percentage > 0
      ? 2
      : 1
    : 0;
  const lockTokens = useCallback(
    async (days: number, amount?: number) => {
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
          amount
            ? BigNumber.from(amount).mul("1000000000")
            : externalState.GPBalance?.mul(percentage).div(100),
          days
        );
      } catch (err) {
        setLoading(false);
        console.log(err);
        alert(err.message);
        throw err;
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
            {/* <h4 style={{ textTransform: "uppercase", marginBottom: "5px" }}>
              Total locked from circulating supply
            </h4>
            <Progressbar limit={100} current={27} /> */}
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
                    className={
                      percentageButton === 70
                        ? styles.button__gradient
                        : styles.button__outline
                    }
                    onClick={() => setPercentageButton(70)}
                  >
                    70%
                  </button>
                  <button
                    style={{ width: "100px" }}
                    className={
                      percentageButton === 85
                        ? styles.button__gradient
                        : styles.button__outline
                    }
                    onClick={() => setPercentageButton(85)}
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
                    className={
                      percentageButton === 100
                        ? styles.button__gradient
                        : styles.button__outline
                    }
                    onClick={() => setPercentageButton(100)}
                  >
                    100%
                  </button>
                </div>
              </div>
              <button
                style={{
                  padding: "4px 20px 5px 20px",
                  marginTop: "10px",
                  textTransform: "uppercase",
                }}
                className={styles.button__gradient}
                onClick={() => setPercentage(percentageButton)}
              >
                Continue
              </button>
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
                <div style={{ display: "flex" }}>
                  <button
                    className={
                      days === 30
                        ? styles.button__gradient
                        : styles.button__outline
                    }
                    onClick={() => {
                      setDays(30);
                    }}
                  >
                    30 DAYS
                  </button>
                  <button
                    className={
                      days === 60
                        ? styles.button__gradient
                        : styles.button__outline
                    }
                    onClick={() => {
                      setDays(60);
                    }}
                  >
                    60 DAYS
                  </button>
                </div>
                {/* <div style={{ display: "flex" }}> */}
                <button
                  className={
                    days === 90
                      ? styles.button__gradient
                      : styles.button__outline
                  }
                  onClick={() => {
                    setDays(90);
                  }}
                >
                  90 DAYS
                </button>
                {/* <button
                    className={
                      days === 180
                        ? styles.button__gradient
                        : styles.button__outline
                    }
                    onClick={() => {
                      setDays(180);
                    }}
                  >
                    180 DAYS
                  </button>
                </div> */}
                <button
                  style={{
                    padding: "4px 20px 5px 20px",
                    marginTop: "10px",
                    textTransform: "uppercase",
                  }}
                  className={styles.button__gradient}
                  onClick={() => lockTokens(days)}
                >
                  Continue
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
              <h4
                style={{
                  textTransform: "uppercase",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => setShowDetails(true)}
              >
                View Details
              </h4>
            </div>
          </>
        );

      case 4:
        return (
          <>
            <Header />
            <div
              className={`${styles.lockWidget__content}
               ${theme === "Dark" ? styles.dark : ""}`}
            >
              <h3 style={{ textTransform: "uppercase", marginBottom: "0px" }}>
                Total gain tokens
              </h3>
              <h3 style={{ textTransform: "uppercase" }}>
                {externalState.GPBalance
                  ? formatGain(externalState.GPBalance, 2)
                  : "?"}
              </h3>
              <div style={{ display: "flex", width: "100%" }}>
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h4
                    className={styles.h4}
                    style={{ textTransform: "uppercase" }}
                  >
                    Available:
                  </h4>
                  <h4
                    className={styles.h4}
                    style={{ textTransform: "uppercase" }}
                  >
                    {externalState.lockedBalance && externalState.GPBalance
                      ? formatGain(
                          externalState.GPBalance.sub(
                            externalState.lockedBalance
                          ),
                          1
                        )
                      : "?"}
                  </h4>
                </div>
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h4
                    className={styles.h4}
                    style={{ textTransform: "uppercase" }}
                  >
                    Locked:
                  </h4>
                  <h4
                    className={styles.h4}
                    style={{ textTransform: "uppercase" }}
                  >
                    {formatGain(externalState.lockedBalance!, 1)}
                  </h4>
                </div>
              </div>
              <div
                style={{ marginTop: "10px", marginBottom: "10px" }}
                className={styles.line}
              ></div>
              <button
                className={styles.button__gradient}
                style={{
                  padding: "4px 20px 5px 20px",
                  marginTop: "10px",
                  textTransform: "uppercase",
                }}
                onClick={() => setShowLockScreen(true)}
              >
                Lock more tokens
              </button>
            </div>
            <Footer setShow={() => setShowDetails(false)} />
          </>
        );

      case 5:
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
              <>
                <div
                  className={`${styles.lockWidget__content} ${
                    theme === "Dark" ? styles.dark : ""
                  }`}
                >
                  <h3
                    style={{ textTransform: "uppercase", marginBottom: "0px" }}
                  >
                    Available tokens
                  </h3>
                  <h3 style={{ textTransform: "uppercase" }}>
                    {externalState.lockedBalance && externalState.GPBalance
                      ? formatGain(
                          externalState.GPBalance.sub(
                            externalState.lockedBalance
                          ),
                          2
                        )
                      : "?"}
                  </h3>
                  <div
                    style={{ marginBottom: "0" }}
                    className={styles.line}
                  ></div>
                  <h4>How many additional tokens would you like to lock?</h4>
                  <input
                    type="number"
                    className={styles.input}
                    placeholder="Enter amount here"
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                    value={amount}
                  />
                  <button
                    className={styles.button__gradient}
                    style={{
                      padding: "4px 20px 5px 20px",
                      marginTop: "10px",
                      textTransform: "uppercase",
                    }}
                    onClick={() => {
                      if (!amount) {
                        alert("Please enter amount");
                        return;
                      }
                      lockTokens(0, amount).then(() => {
                        setTimeout(() => {
                          setLoading(false);
                          setShowLockScreen(false);
                          setShowDetails(false);
                        }, 10000);
                      });
                    }}
                  >
                    Lock tokens
                  </button>
                </div>
                <Footer setShow={() => setShowLockScreen(false)} />
              </>
            )}
          </>
        );
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
