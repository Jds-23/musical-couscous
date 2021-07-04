import Head from "next/head";
import React, { useEffect, useState } from "react";
import Switch from "../components/Switch/Switch";
import Header from "../components/Header/Header";
import styles from "../styles/Home.module.css";
import { ModalFooter, ModalBody, useDisclosure } from "@chakra-ui/react";
import BuySection from "../components/BuySection/BuySection";
import SellSection from "../components/SellSection/SellSection";
import WalletInfoModal from "../components/WalletInfoModal/WalletInfoModal";
import ConfirmSwapModal from "../components/ConfirmSwapModal/ConfirmSwapModal";
import InfoCards from "../components/InfoCards/InfoCards";
import Info from "../components/Info/Info";
import ErrorModal from "../components/ErrorModal/ErrorModal";
import SuccessModal from "../components/SuccessModal/SuccessModal";
import HidableBar from "../components/HidableBar/HidableBar";
import { useToast, Box } from "@chakra-ui/react";
import CountdownScreen from "../components/CountdownScreen/CountdownScreen";
const opensDate = "Jul 25, 2021 16:00:00";
export default function Home() {
  const [state, setState] = useState(0);
  const [walletInfoModal, setWalletInfoModal] = useState(false);
  const [confirmSwapModal, setConfirmSwapModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [seeMoreDetails, setSeeMoreDetails] = useState(false);
  const [time, setTime] = useState(
    new Date(opensDate).getTime() -
      new Date().getTime() -
      new Date().getTimezoneOffset() * 60000
  );
  const toast = useToast();

  const successToast = () => {
    toast({
      position: "top",
      render: () => (
        <Box width={"100%"} color="#24135B" p={3} bg="#FFFFFF">
          <h1 style={{ fontSize: "22px", marginBottom: "50px" }}>
            Swap 0.0584758 BNB for 5794877 GAIN PROTOCOL
          </h1>
          <h1 style={{ fontSize: "19px", marginBottom: "10px" }}>
            View on BscScan
          </h1>
        </Box>
      ),
      isClosable: true,
    });
  };
  useEffect(() => {
    setInterval(
      () =>
        setTime(
          new Date(opensDate).getTime() -
            new Date().getTimezoneOffset() * 60000 -
            new Date().getTime()
        ),
      1000
    );
  }, []);
  return (
    <>
      <WalletInfoModal
        isOpen={walletInfoModal}
        onClose={() => setWalletInfoModal(false)}
      />
      <div className={styles.home__container}>
        <Head>
          <title>Gain Protocol SwapX</title>
          <meta name="description" content="Coin offering" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="preload"
            href="/fonts/euro_technic_extended_regular.ttf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Eurostile-Bold.ttf"
            as="font"
            crossOrigin=""
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-198458708-1"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      gtag("config", "UA-198458708-1");`,
            }}
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=AW-358031656"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      gtag("config", "AW-358031656");`,
            }}
          />
        </Head>
        <div className={styles.home__background} />
        <img
          src={"./images/background/LeftTop.svg"}
          className={styles.home__bg_left_top}
        />

        <img
          src={"./images/background/TopRight.svg"}
          className={styles.home__bg_right_top}
        />
        <img
          src={"./images/background/LeftBottom.svg"}
          className={styles.home__bg_left_bottom}
        />
        <img
          src={"./images/background/RightBottom.svg"}
          className={styles.home__bg_right_bottom}
        />
        <Header openWalletInfoModal={() => setWalletInfoModal(true)} />
        {time > 0 ? (
          <CountdownScreen opensDate={opensDate} />
        ) : (
          <>
            <ConfirmSwapModal
              isOpen={confirmSwapModal}
              successToast={successToast}
              onSuccessOpen={() => setSuccessModal(true)}
              onClose={() => setConfirmSwapModal(false)}
            />
            <ErrorModal
              isOpen={errorModal}
              onClose={() => setErrorModal(false)}
            />
            <SuccessModal
              isOpen={successModal}
              onClose={() => setSuccessModal(false)}
            />
            <div className={styles.home__content}>
              <Switch
                options={["Buy", "Sell"]}
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: "48px",
                }}
                state={state}
                setState={setState}
              />
              {state === 0 ? (
                <BuySection
                  state={state}
                  setState={setState}
                  onOpen={() => setConfirmSwapModal(true)}
                />
              ) : (
                <SellSection
                  state={state}
                  setState={setState}
                  onOpen={() => setConfirmSwapModal(true)}
                />
              )}
              {state === 0 ? (
                <InfoCards>
                  <div
                    style={{
                      fontSize: "14px",
                      display: "grid",
                      gridTemplateColumns: "4fr 1fr 4fr",
                    }}
                  >
                    <Info tooltip="The total fee you are set to pay when buying GAIN.">
                      Buyer Fee
                    </Info>
                    <p style={{ textAlign: "center" }}>3.5%</p>
                    <p style={{ textAlign: "right" }}>56,789 GAIN</p>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        textDecoration: "underline",
                        fontSize: "10px",
                        color: "#7a71a7",
                        cursor: "pointer",
                      }}
                      onClick={() => setSeeMoreDetails(!seeMoreDetails)}
                    >
                      {seeMoreDetails ? "CLOSE" : "VIEW"} DETAILS
                    </span>
                  </div>
                  <HidableBar isHidden={!seeMoreDetails}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "4fr 1fr 4fr",
                        width: "100%",
                        fontSize: "11px",
                      }}
                    >
                      <div>
                        <Info tooltip="Estimated amount of GAIN added to the liquidity from this transaction.">
                          Liquidity
                        </Info>
                        <Info tooltip="Estimated amount of GAIN added to the team wallet from this transaction.">
                          Team
                        </Info>
                        <Info tooltip="Estimated amount of GAIN added to the sweepstakes pool from this transaction. ">
                          Sweepstakes
                        </Info>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <p>3.5%</p>
                        <p>3.5%</p>
                        <p>3.5%</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p>56,789 GAIN</p>
                        <p>56,789 GAIN</p>
                        <p>56,789 GAIN</p>
                      </div>
                    </div>
                  </HidableBar>
                </InfoCards>
              ) : (
                <InfoCards>
                  <div
                    style={{
                      fontSize: "14px",
                      display: "grid",
                      gridTemplateColumns: "4fr 1fr 4fr",
                    }}
                  >
                    <Info tooltip="The total fee you are set to pay when selling GAIN. ">
                      Seller Fee
                    </Info>
                    <p style={{ textAlign: "center" }}>3.5%</p>
                    <p style={{ textAlign: "right" }}>56,789 GAIN</p>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        textDecoration: "underline",
                        fontSize: "10px",
                        color: "#7a71a7",
                        cursor: "pointer",
                      }}
                      onClick={() => setSeeMoreDetails(!seeMoreDetails)}
                    >
                      {seeMoreDetails ? "CLOSE" : "VIEW"} DETAILS
                    </span>
                  </div>
                  <HidableBar isHidden={!seeMoreDetails}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "4fr 1fr 4fr",
                        width: "100%",
                        fontSize: "11px",
                      }}
                    >
                      <div>
                        <Info tooltip="Estimated amount of GAIN added to the static rewards pool from this transaction. ">
                          Static Reward
                        </Info>
                        <Info tooltip="Estimated amount of GAIN added to the hodl rewards pool from this transaction.">
                          Hodl Reward
                        </Info>
                        <Info tooltip="Estimated amount of GAIN added to the charity pool rewards from this transaction.">
                          Charity
                        </Info>
                        <Info
                          tooltip="The estimated amount of added fee from this transaction due to selling more
than the daily sell limit. This amount will be added to the static rewards pool
and will be distributed among all holders as a part of the static rewards
distribution."
                        >
                          Whale Protection
                        </Info>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <p>3.5%</p>
                        <p>3.5%</p>
                        <p>3.5%</p>
                        <p>3.5%</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p>56,789 GAIN</p>
                        <p>56,789 GAIN</p>
                        <p>56,789 GAIN</p>
                        <p>56,789 GAIN</p>
                      </div>
                    </div>
                  </HidableBar>
                </InfoCards>
              )}

              {state === 0 ? (
                <InfoCards>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "5fr 3fr",
                      width: "100%",
                      fontSize: "11px",
                    }}
                  >
                    <div>
                      <Info tooltip="The minimum amount of GAIN you will receive. Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.">
                        Minimum received
                      </Info>
                      <Info tooltip="The difference between the market price and estimated price due to trade size.">
                        Price Impact
                      </Info>
                      <Info
                        tooltip="For each trade a 0.25% fee is paid
- 0.17% to LP token holders
- 0.03% to the Treasury
- 0.05% towards CAKE buyback and burn"
                      >
                        Liquidity Provider Fee
                      </Info>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p>56,789 GAIN</p>
                      <p style={{ color: "#ECB42A" }}>{"<"}0.01%</p>
                      <p>23.42 GAIN</p>
                    </div>
                  </div>
                </InfoCards>
              ) : (
                <InfoCards>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "5fr 3fr",
                      width: "100%",
                      fontSize: "11px",
                    }}
                  >
                    <div>
                      <Info tooltip="The minimum amount of GAIN you will receive. Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.">
                        Maximum Sold
                      </Info>
                      <Info tooltip="The difference between the market price and estimated price due to trade size.">
                        Price Impact
                      </Info>
                      <Info
                        tooltip="For each trade a 0.25% fee is paid
- 0.17% to LP token holders
- 0.03% to the Treasury
- 0.05% towards CAKE buyback and burn"
                      >
                        Liquidity Provider Fee
                      </Info>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p>56,789 GAIN</p>
                      <p style={{ color: "#ECB42A" }}>{"<"}0.01%</p>
                      <p>23.42 GAIN</p>
                    </div>
                  </div>
                </InfoCards>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
