import styles from "./WinnersWidget.module.css";
import Button from "../Button/Button";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Theme, useTheme } from "../../context/StateProvider";
import WidgetScreen from "../WidgetScreen/WidgetScreen";
import React, { useContext, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import ConnectButton from "../ConnectButton/ConnectButton";
import { Web3Provider } from "@ethersproject/providers";
import { ExternalStateContext } from "../../context/ExternalState";
import { formatEtherShort, formatGain } from "../../utils";
import moment from "moment";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
interface MyProps {
  //   opensDate: string;
  show: boolean;
  setShow: (arg: boolean) => void;
  label: string;
}

const types = [
  "HODLERS",
  "DIVERS",
  "CONTRIBUTORS",
  "ADVOCATES",
  "DIAMOND HANDS",
  "LOYALISTS",
  "NEWCOMERS",
  "BELIEVERS",
  "AFFILIATE",
];
function gainsToUSD(gains: BigNumber, gainsFor100USD: BigNumber) {
  return gains.mul(10000).div(gainsFor100USD).toNumber() / 100;
}
const WinnersWidget: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> =
  ({ show, setShow, label }) => {
    const { theme, setTheme } = useTheme();
    const [seeAll, setSeeAll] = useState(false);

    const { state: externalState } = useContext(ExternalStateContext);
    const { account } = useWeb3React<Web3Provider>();

    const winnerIndex =
      externalState.winners && account
        ? externalState.winners
            .map((a) => a.toLowerCase())
            .indexOf(account?.toLowerCase())
        : -1;
    const state = account ? (seeAll ? 3 : winnerIndex != -1 ? 1 : 2) : 0;
    const getScreen = () => {
      switch (state) {
        case 0:
          return (
            <div
              className={`${styles.winnersWidget__content} ${
                theme === "Dark" ? styles.dark : ""
              }`}
            >
              <h2
                className={styles.marginTop}
                style={{ textTransform: "uppercase" }}
              >
                Connect Wallet to see if you won
              </h2>
              <div className={styles.line}></div>

              <ConnectButton size="sm" />
            </div>
          );
        case 1:
          return (
            <>
              <Header />
              <div
                className={`${styles.winnersWidget__content} ${
                  theme === "Dark" ? styles.dark : ""
                }`}
              >
                <h3 style={{ textTransform: "uppercase" }}>
                  Congratulations! You won the &quot;
                  {externalState.types &&
                  winnerIndex < externalState.types.length
                    ? types[externalState.types[winnerIndex].toNumber()]
                    : "?"}
                  &quot; Sweepstakes
                </h3>
                <div className={styles.line}></div>
                <h3 style={{ marginBottom: "0", textTransform: "uppercase" }}>
                  Prize Won:
                </h3>
                <h3 style={{ marginBottom: "0", textTransform: "uppercase" }}>
                  {externalState.amounts &&
                  winnerIndex < externalState.amounts.length
                    ? formatGain(externalState.amounts[winnerIndex], 2)
                    : "?"}{" "}
                  GAIN
                </h3>
                <h3 style={{ textTransform: "uppercase" }}>{`($${
                  externalState.amounts &&
                  winnerIndex < externalState.amounts.length &&
                  externalState.gainsFor100USD
                    ? gainsToUSD(
                        externalState.amounts[winnerIndex],
                        externalState.gainsFor100USD
                      )
                    : "?"
                })`}</h3>
                <p
                  style={{ textTransform: "uppercase" }}
                  className={styles.small__text_button}
                  onClick={() => setSeeAll(true)}
                >
                  See all sweepstakes Winners
                </p>
              </div>
            </>
          );
        case 2:
          return (
            <>
              <Header />
              <div
                className={`${styles.winnersWidget__content} ${
                  theme === "Dark" ? styles.dark : ""
                }`}
              >
                <h2 style={{ textTransform: "uppercase" }}>
                  You did not win. Better Luck next week
                </h2>
                <div className={styles.line}></div>
                <p
                  onClick={() => setSeeAll(true)}
                  style={{ textTransform: "uppercase" }}
                  className={styles.small__text_button}
                >
                  See all sweepstakes Winners
                </p>
              </div>
            </>
          );
        case 3:
          return (
            <>
              <Header />
              <Footer setShow={() => setSeeAll(false)} />
              <div
                className={`${styles.winnersWidget__content} ${
                  theme === "Dark" ? styles.dark : ""
                }`}
              >
                <h1 style={{ textTransform: "uppercase" }}>
                  Most Recent Winners
                </h1>
                <h3>
                  {externalState.performedAt
                    ? moment
                        .unix(externalState.performedAt?.toNumber())
                        .format("LL")
                    : "?"}
                </h3>
                <div className={styles.winners__list}>
                  {externalState.winners?.map((winner, index) => {
                    const isBNB =
                      externalState.types &&
                      externalState.types[index].toNumber() == 8;
                    return (
                      <div key={winner} className={styles.winner}>
                        <h2>
                          {externalState.types &&
                          winnerIndex < externalState.types.length
                            ? types[externalState.types[index].toNumber()]
                            : "?"}
                        </h2>
                        <h3>Wallet Address</h3>
                        <p className={styles.address}>{winner}</p>
                        <h3 style={{ textTransform: "uppercase" }}>
                          Prize Won:
                        </h3>
                        <h3 style={{ textTransform: "uppercase" }}>
                          {externalState.amounts &&
                          winnerIndex < externalState.amounts.length
                            ? isBNB
                              ? formatEtherShort(
                                  externalState.amounts[index],
                                  3
                                )
                              : formatGain(externalState.amounts[index], 2)
                            : "?"}{" "}
                          {isBNB ? "BNB" : "GAIN"}
                        </h3>
                        <h3 style={{ textTransform: "uppercase" }}>
                          {`($${
                            externalState.amounts &&
                            externalState.gainsFor100USD &&
                            externalState.usdBNBPrice &&
                            winnerIndex < externalState.amounts.length
                              ? isBNB
                                ? externalState.amounts[index]
                                    .mul(externalState.usdBNBPrice)
                                    .div(BigNumber.from(10).pow(18 + 6))
                                    .toNumber() / 100
                                : gainsToUSD(
                                    externalState.amounts[index],
                                    externalState.gainsFor100USD
                                  )
                              : "?"
                          })`}
                        </h3>
                        <div className={styles.line}></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          );
      }
    };
    return (
      <WidgetScreen
        className={styles.widgetScreen}
        show={show}
        setShow={setShow}
      >
        <>
          {/* <div className={styles.winnersWidget__content}>
          <h1 style={{ textTransform: "uppercase" }}>{label}</h1>
          <div className={styles.line}></div>
          <CountdownTimer opensDate={opensDate} />
        </div> */}
          {getScreen()}
        </>
      </WidgetScreen>
    );
  };

export default WinnersWidget;
