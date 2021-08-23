import React, { useContext, useState } from "react";
import { useTheme } from "../../context/StateProvider";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Footer from "./Footer/Footer";
import WidgetScreen from "../WidgetScreen/WidgetScreen";
import AnimatedDiamond from "../AnimatedLoader/AnimatedLoader";
import styles from "./AffiliatesWidget.module.css";
import ConnectButton from "../ConnectButton/ConnectButton";
import { ExternalStateContext } from "../../context/ExternalState";
import {
  formatBytes32String,
  formatEther,
  parseBytes32String,
} from "ethers/lib/utils";
import SweepstakesABI from "../../contracts/Sweepstakes.json";
import { Contract } from "ethers";
import { useRouter } from "next/router";
import useSWR from "swr";
import moment from "moment";

interface MyProps {
  //   opensDate: string;
  show: boolean;
  setShow: (arg: boolean) => void;
  label: string;
}
enum Section {
  Account = "Account",
  CreateIntro = "CreateIntro",
  Rules = "Rules",
  CreateAccount = "CreateAccount",
  History = "History",
}

enum DisplayState {
  Intro,
  CreateIntro,
  Rules,
  CreateAccount,
  DisplayLink,
  Loader,
  History,
  Account,
}

function generateUniqID() {
  return (
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1) +
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  );
}

const AffiliatesWidget: React.FC<
  React.HTMLAttributes<HTMLDivElement> & MyProps
> = ({ show, setShow, label }) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [generatingLink, setGeneratingLink] = useState(false);
  const [section, setSection] = useState<Section | null>(null);
  const [viewDetail, setViewDetail] = useState("");
  const { state: externalState } = useContext(ExternalStateContext);

  const { data, error } = useSWR(
    account
      ? "https://api.bscscan.com/api?module=logs" +
          "&action=getLogs&fromBlock=0&toBlock=latest&" +
          "address=0x2cf13601129aaa1f2c2dd528baff72754ce97522&" +
          "topic0=0x6ad218c5fb85cf67a932505ab650605788068846227b3f708d63f4cddf421d5c&" +
          `topic1=0x${account.substring(2).padStart(64, "0")}&` +
          "apikey=99BRHSEW1IJVUM2NSZRZDJ53NYCE9E7AJZ"
      : null,
    { refreshInterval: 10000 }
  );

  let state = DisplayState.Intro;
  const affiliateID = externalState.affiliateID
    ? parseBytes32String(externalState.affiliateID)
    : "";
  if (section) {
    if (account && affiliateID) {
      if (section == Section.History) {
        state = DisplayState.History;
      } else {
        state = DisplayState.DisplayLink;
      }
    } else if (account && generatingLink) {
      state = DisplayState.Loader;
    } else if (section == Section.Account) {
      if (account && externalState.affiliateID && !affiliateID) {
        // Affiliate ID loaded, but is empty
        state = DisplayState.CreateIntro;
      } else {
        state = DisplayState.Account;
      }
    } else if (section == Section.CreateIntro) {
      state = DisplayState.CreateIntro;
    } else if (section == Section.Rules) {
      state = DisplayState.Rules;
    } else if (section == Section.CreateAccount) {
      state = DisplayState.CreateAccount;
    }
  }

  const link = externalState.affiliateID
    ? `https://swapx.gainprotocol.com/?af=${parseBytes32String(
        externalState.affiliateID
      )}`
    : "";
  const generateLink = async () => {
    setGeneratingLink(true);
    const contract = new Contract(
      process.env.NEXT_PUBLIC_SWEEPSTAKES_ADDRESS!,
      SweepstakesABI,
      library?.getSigner()
    );
    try {
      await contract.createAffiliateID(formatBytes32String(generateUniqID()));
    } catch (err) {
      setGeneratingLink(false);
      alert(err.message);
    } finally {
    }
  };
  const getScreen = () => {
    switch (state) {
      case DisplayState.Intro:
        return (
          <div
            style={{ justifyContent: "center", margin: "0" }}
            className={`${styles.affiliates__content} ${
              theme === "Dark" ? styles.dark : ""
            }`}
          >
            <h2
              //   className={styles.marginTop}
              style={{ textTransform: "uppercase" }}
            >
              Join our affiliates program and earn passive income
            </h2>
            <div
              style={{ marginTop: "10px", marginBottom: "10px" }}
              className={styles.line}
            ></div>
            <button
              className={styles.button__gradient}
              style={{ padding: "4px 0 5px 0", marginTop: "10px" }}
              onClick={() => setSection(Section.CreateIntro)}
            >
              GET STARTED
            </button>
            <button
              className={styles.button__color}
              style={{ padding: "4px 0 5px 0", marginTop: "10px" }}
              onClick={() => setSection(Section.Account)}
            >
              MY ACCOUNT
            </button>
          </div>
        );
      case DisplayState.CreateIntro:
        return (
          <div
            className={`${styles.affiliates__content} ${
              theme === "Dark" ? styles.dark : ""
            }`}
          >
            <h1
              //   className={styles.marginTop}
              style={{ textTransform: "uppercase" }}
            >
              Passive Income
            </h1>
            <div
              className={styles.line}
              style={{ marginTop: "10px", marginBottom: "10px" }}
            ></div>
            <p style={{ textAlign: "center" }}>
              Earn 1% commission on all transactions referred by you.
              Additionally, with each referral you will receive 1 entry to the
              daily affiliates sweepstake with a chance to win big. Everyday we
              host an exclusive sweepstake for our affiliates.
            </p>
            <div
              style={{ marginTop: "10px", marginBottom: "10px" }}
              className={styles.line}
            ></div>
            <p
              className={styles.small__text}
              onClick={() => setSection(Section.Rules)}
              style={{
                textTransform: "uppercase",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              See rules
            </p>
            <button
              className={styles.button__color}
              style={{
                width: "100%",
                padding: "4px 0 5px 0",
                marginTop: "10px",
                background: "none",
                color: theme === "Light" ? "#786FA6" : "#A09AC0",
                whiteSpace: "nowrap",
              }}
              onClick={() => setSection(Section.CreateAccount)}
            >
              BECOME AN AFFILIATE
            </button>
          </div>
        );
      case DisplayState.Rules:
        return (
          <div
            className={`${styles.affiliates__content} ${
              theme === "Dark" ? styles.dark : ""
            }`}
          >
            <h1
              //   className={styles.marginTop}
              style={{ textTransform: "uppercase" }}
            >
              SWEEPSTAKES ENTRY RULES
            </h1>
            <div
              className={styles.line}
              style={{ marginTop: "10px", marginBottom: "10px" }}
            ></div>
            <p style={{ textAlign: "center" }}>
              Sweepstake entries are only valid for 1 day. You must have a
              minimum of 1 referral on each day in order to participate.
            </p>
            <p style={{ textAlign: "center" }}>
              Each purchased token equals to 1 entry to the next affiliates
              sweepstake. The more GAIN tokens purchased by your referrals the
              higher the chances are to win.
            </p>

            <button
              className={styles.button__color}
              style={{
                width: "100%",
                padding: "4px 0 5px 0",
                marginTop: "10px",
                background: "none",
                color: theme === "Light" ? "#786FA6" : "#A09AC0",
                whiteSpace: "nowrap",
              }}
              onClick={() => setSection(Section.CreateAccount)}
            >
              BECOME AN AFFILIATE
            </button>
          </div>
        );
      case DisplayState.CreateAccount:
        return (
          <>
            <div className={styles.affiliate_outer_container}>
              {account && <ConnectButton size="sm" />}
              <div
                className={`${styles.affiliates__content} ${
                  theme === "Dark" ? styles.dark : ""
                }`}
              >
                <h1
                  //   className={styles.marginTop}
                  style={{ textTransform: "uppercase" }}
                >
                  BECOME AN AFFILIATE
                </h1>
                <div
                  className={styles.line}
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                ></div>
                <p style={{ textAlign: "center", marginBottom: "10px" }}>
                  CONNECT YOUR WALLET TO GENERATE YOUR UNIQUE LINK.
                </p>
                <p style={{ textAlign: "center", marginBottom: "10px" }}>
                  SHARE YOUR LINK AND EARN 1% COMMISSION FROM ALL TRANSACTIONS
                  REFERRED BY YOU.
                </p>
                <p style={{ textAlign: "center", marginBottom: "10px" }}>
                  Commission is automatically sent to your wallet in a form of
                  BNB.
                </p>

                {account ? (
                  <button
                    className={styles.button__gradient}
                    style={{ padding: "4px 0 5px 0" }}
                    onClick={() => generateLink()}
                  >
                    GENERATE LINK
                  </button>
                ) : (
                  <ConnectButton size="sm" />
                )}
              </div>
            </div>
          </>
        );
      case DisplayState.Loader:
        return (
          <div
            className={`${styles.affiliates__content} ${
              theme === "Dark" ? styles.dark : ""
            }`}
            style={{ margin: "0", justifyContent: "center" }}
          >
            <AnimatedDiamond />
          </div>
        );
      case DisplayState.DisplayLink:
        return (
          <div
            className={`${styles.affiliates__content} ${
              theme === "Dark" ? styles.dark : ""
            }`}
          >
            <h1
              //   className={styles.marginTop}
              style={{ textTransform: "uppercase" }}
            >
              Your unique link is
            </h1>
            <div
              className={styles.line}
              style={{ marginTop: "10px", marginBottom: "10px" }}
            ></div>
            <button
              style={{ marginTop: "20px", marginBottom: "20px" }}
              className={`${styles.button__color} ${styles.unique__link}`}
              onClick={() => router.push(link)}
            >
              {link}
            </button>
            <div className={styles.groupButtons}>
              <span className={styles.button__circle}>
                <button onClick={() => navigator.clipboard.writeText(link)}>
                  <img src={"./images/AffiliatesWidget/copy.svg"} alt="Copy" />
                </button>
                <span>COPY</span>
              </span>
              {/* <span className={styles.button__circle}>
                <button onClick={() => setState(6)}>
                  <img src={"./images/AffiliatesWidget/share.svg"} />
                </button>
                <span>SHARE </span>
              </span> */}
            </div>
            <p
              className={`${styles.small__text} ${styles.gradient__underline}`}
              style={{
                textTransform: "uppercase",
                marginTop: "20px",
                fontSize: "calc((4.83 / 144) * 300px)",
                cursor: "pointer",
              }}
              onClick={() => setSection(Section.History)}
            >
              COMMISSION HISTORY
            </p>
          </div>
        );
      case DisplayState.History:
        return (
          <div
            className={`${styles.affiliates__content} ${
              theme === "Dark" ? styles.dark : ""
            }`}
          >
            <h1
              //   className={styles.marginTop}
              style={{ textTransform: "uppercase" }}
            >
              COMMISSION HISTORY
            </h1>
            <div
              className={styles.line}
              style={{ marginTop: "10px", marginBottom: "10px" }}
            ></div>

            {data?.result?.map((item: any) => {
              return (
                <div
                  key={item.transactionHash}
                  className={styles.commission__history__item}
                >
                  {" "}
                  <div className={styles.commission__history__item__main}>
                    <p>
                      {moment.unix(parseInt(item.timeStamp, 16)).format("l")}
                    </p>
                    <p>
                      {formatEther("0x" + item.data.substring(32 + 32 + 2))} BNB
                    </p>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`https://bscscan.com/tx/${item.transactionHash}`}
                    >
                      View on BscScan
                    </a>
                    {/* {viewDetail === item.transactionHash ? (
                      <p
                        onClick={() => setViewDetail("")}
                        style={{ cursor: "pointer" }}
                      >
                        CLOSE DETAILS
                      </p>
                    ) : (
                      <p
                        onClick={() => setViewDetail(item.transactionHash)}
                        style={{ cursor: "pointer" }}
                      >
                        VIEW DETAILS
                      </p>
                    )}
                  </div>
                  {viewDetail === item.transactionHash && (
                    <div className={styles.commission__history__item__more}>
                      <a style={{ cursor: "pointer" }} href={`https://bscscan.com/`}>View Wallet Address</a>
                      <a style={{ cursor: "pointer" }}>View on BscScan</a>
                    </div>
                  )} */}
                  </div>
                </div>
              );
            })}

            <Footer setShow={() => setSection(Section.Account)} />
          </div>
        );
      case DisplayState.Account:
        return (
          <div
            style={{ justifyContent: "center", margin: "0" }}
            className={`${styles.affiliates__content} ${
              theme === "Dark" ? styles.dark : ""
            }`}
          >
            <h1
              //   className={styles.marginTop}
              style={{ textTransform: "uppercase" }}
            >
              Connect your wallet to access your account{" "}
            </h1>
            <div
              style={{ marginTop: "10px", marginBottom: "10px" }}
              className={styles.line}
            ></div>
            <ConnectButton size="sm" />
          </div>
        );
    }
  };
  return (
    <WidgetScreen show={show} setShow={setShow}>
      <>
        {/* <div className={styles.affiliates__content}>
              <h1 style={{ textTransform: "uppercase" }}>{label}</h1>
              <div className={styles.line}></div>
              <CountdownTimer opensDate={opensDate} />
            </div> */}
        {getScreen()}
      </>
    </WidgetScreen>
  );
};

export default AffiliatesWidget;
