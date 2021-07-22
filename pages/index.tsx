import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import Switch from "../components/Switch/Switch";
import Header from "../components/Header/Header";
import styles from "../styles/Home.module.css";
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
import Sidebar from "../components/Sidebar/Sidebar";
import { useTheme, useAppContext, BuyOrSell } from "../context/StateProvider";
import { ExternalStateContext } from "../context/ExternalState";
import { ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import TransactionsInfos from "../components/TransactionsInfos/TransactionsInfos";
import TransactionsFees from "../components/TransactionsFees/TransactionsFees";

const opensDate = "Jul 2, 2021 16:00:00";
export default function Home() {
  const [walletInfoModal, setWalletInfoModal] = useState(false);
  const [confirmSwapModal, setConfirmSwapModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const { theme } = useTheme();
  const { state: appState } = useAppContext();
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
          {/* <!-- Criteo Loader File --> */}
          <script
            type="text/javascript"
            src="//dynamic.criteo.com/js/ld/ld.js?a=87595"
            async={true}
          ></script>
          {/* <!-- END Criteo Loader File --> */}
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
window.criteo_q = window.criteo_q || [];
var deviceType = /iPad/.test(navigator.userAgent) ? "t" : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(navigator.userAgent) ? "m"
 : "d";
window.criteo_q.push(
{ event: "setAccount", account: 87595},
{ event: "setSiteType", type: deviceType }, { event: "viewItem", item: "1" }
);`,
            }}
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
        <div
          className={`${styles.home__background}
        ${theme === "Dark" ? styles.home__background__dark : ""}`}
        />
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
              onErrorOpen={() => setErrorModal(true)}
              setErrorMessage={setErrorMessage}
              onClose={() => setConfirmSwapModal(false)}
            />
            <ErrorModal
              isOpen={errorModal}
              errorMessage={errorMessage}
              onClose={() => setErrorModal(false)}
            />
            <SuccessModal
              isOpen={successModal}
              onClose={() => setSuccessModal(false)}
            />
            <div className={styles.home__content}>
              <Sidebar />
              <Switch
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: "48px",
                }}
              />
              {appState.toggleBuyOrSell === BuyOrSell.Buy ? (
                <BuySection onOpen={() => setConfirmSwapModal(true)} />
              ) : (
                <SellSection onOpen={() => setConfirmSwapModal(true)} />
              )}

              {appState.gainInBigNumber &&
                (!appState.gainInBigNumber.isZero() ? (
                  <TransactionsFees />
                ) : (
                  <></>
                ))}
              {appState.gainInBigNumber &&
                (!appState.gainInBigNumber.isZero() ? (
                  <TransactionsInfos />
                ) : (
                  <></>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
