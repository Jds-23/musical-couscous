import styles from "./PlayWidget.module.css";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import Button from "../Button/Button";
import { Theme, useTheme } from "../../context/StateProvider";
import RandomGeneratorABI from "../../contracts/RandomGenerator.json";
import WidgetScreen from "../WidgetScreen/WidgetScreen";
import { useContext, useEffect, useState, useMemo } from "react";
import ViewOnBscScan from "./ViewOnBscScan/ViewOnBscScan";
import WinnersCarousels from "./WinnersCarousels/WinnersCarousels";
import { ExternalStateContext } from "../../context/ExternalState";
import moment from "moment";
import ConnectButton from "../ConnectButton/ConnectButton";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { keccak256, solidityPack } from "ethers/lib/utils";

// import ProgressBar from "../ProgressBar/ProgressBar";
interface MyProps {
  show: boolean;
  setShow: (arg: boolean) => void;
  label: string;
}

function getNextSweepstake(openDate: number, drift = 6) {
  const dayNeeded = 1; // Monday
  const now = moment().utc();

  const thisWeek = moment(now)
    .isoWeekday(dayNeeded)
    .startOf("day")
    .add(openDate, "second");
  if (thisWeek.isBefore(moment(now).subtract(drift, "minutes"))) {
    return thisWeek.add(1, "weeks");
  }
  return thisWeek;
}
const useRefreshTimer = (interval: number) => {
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    const handler = setInterval(() => setTimer((timer) => timer + 1), interval);
    return () => clearInterval(handler);
  }, [setTimer, interval]);
  return timer;
};

function sleep(timeout: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(resolve, timeout);
  });
}

const PlayWidget: React.FC<React.HTMLAttributes<HTMLDivElement> & MyProps> = ({
  show,
  setShow,
  label,
}) => {
  useRefreshTimer(1000);
  const { theme } = useTheme();
  const [randomValue, setRandomValue] = useState(0);
  const [hasRegistered, setRegistered] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const { state: externalState } = useContext(ExternalStateContext);
  const { account, library } = useWeb3React<Web3Provider>();
  const startTime = externalState.randomGenerationStartTime?.toNumber();
  const nextSweepstakeMoment = startTime ? getNextSweepstake(startTime) : null;
  const timezoneOFfset = new Date().getTimezoneOffset() * 60000;
  const contract = useMemo(
    () =>
      new Contract(
        process.env.NEXT_PUBLIC_RANDOM_GENERATOR_ADDRESS!,
        RandomGeneratorABI,
        library?.getSigner()
      ),
    [library]
  );

  const nextSweepstake = nextSweepstakeMoment
    ? nextSweepstakeMoment.unix() * 1000 + timezoneOFfset
    : null;
  const isInSweepstake =
    nextSweepstakeMoment &&
    moment().isAfter(nextSweepstakeMoment) &&
    moment(nextSweepstakeMoment).add(6, "minute").isAfter(moment());

  const isInReveal =
    isInSweepstake &&
    moment(nextSweepstakeMoment).add(2, "minute").isBefore(moment());

  useEffect(() => {
    if (show) {
      document.querySelector("body")?.classList.add("overflow-hidden");
      return () => {
        document.querySelector("body")?.classList.remove("overflow-hidden");
      };
    }
  }, [show]);
  const state = isInSweepstake
    ? account
      ? hasRegistered
        ? hasRevealed
          ? 4
          : 3
        : isInReveal
        ? 0
        : 2
      : 1
    : 0;
  const getScreen = () => {
    switch (state) {
      case 0:
        return (
          <>
            <h1 style={{ marginBottom: "20px" }}>LET’S PLAY</h1>
            <p className={styles.paragraph__1}>
              Be sure to check back in time to participate in the daily
              contributors sweepstake for a chance to win.
            </p>
            <div style={{ marginBottom: "20px" }} className={styles.line}></div>
            {nextSweepstakeMoment?.isBefore(moment()) ? (
              <div className={styles.timer}>
                <p style={{ textAlign: "center" }}>
                  RANDOMS GENERATION HAS STARTED. PLEASE TRY AGAIN NEXT TIME
                </p>
              </div>
            ) : (
              <div className={styles.timer}>
                <p style={{ textAlign: "center" }}>
                  RANDOMS GENERATION STARTS IN
                </p>
                <div>
                  {nextSweepstake && (
                    <CountdownTimer opensDate={nextSweepstake} />
                  )}
                </div>
              </div>
            )}
            <h3 style={{ marginTop: "20px" }}>RECENT WINNER</h3>
            <div style={{ marginBottom: "15px" }} className={styles.line}></div>
            <WinnersCarousels />
          </>
        );
      case 1:
        return (
          <>
            <h1>IT&apos;S TIME TO PLAY</h1>
            <p
              style={{ marginTop: "100px", marginBottom: "90px" }}
              className={styles.paragraph__2}
            >
              Connect your wallet to generate your random number.
            </p>
            <ConnectButton size="sm" />
          </>
        );
      case 2:
        return (
          <>
            <h1 style={{ marginBottom: "20px" }}>IT&apos;S TIME TO PLAY</h1>

            <ConnectButton size="sm" />
            <p className={styles.paragraph__1}>Time left to guess a number:</p>
            {nextSweepstake && (
              <CountdownTimer opensDate={nextSweepstake + 2 * 60 * 1000} />
            )}
            <br />

            <p className={styles.paragraph__2}>
              Using a creative number will increase your chance of wining.
            </p>
            <p style={{ marginBottom: "15px" }} className={styles.paragraph__2}>
              Enter your number below.
            </p>
            <input
              style={{ marginBottom: "50px" }}
              className={styles.input}
              placeholder={`Enter a number between 1 and ${externalState.minigameRange?.toString()}`}
              onChange={(e) => setRandomValue(parseInt(e.target.value))}
            />
            <Button
              style={{ width: "80%" }}
              block
              size="sm"
              onClick={async () => {
                if (
                  externalState.randomGenerationMinimumBalance &&
                  externalState.GPBalance?.lt(
                    externalState.randomGenerationMinimumBalance
                  )
                ) {
                  alert(
                    "You need to hold at least " +
                      externalState.randomGenerationMinimumBalance?.div(
                        "100000000"
                      ) +
                      " GAIN to participate"
                  );
                  return;
                }
                const hash = keccak256(
                  solidityPack(["uint256", "address"], [randomValue, account])
                );
                try {
                  await contract.registerRandom(hash);
                } catch (err: any) {
                  console.log(err);
                  alert(
                    "Error: " +
                      (err?.data?.message || err?.message || "Unknown") +
                      "\nPlease try again"
                  );
                  return;
                }
                const timeToReveal =
                  (moment(nextSweepstakeMoment).add(2, "minute").unix() -
                    moment().unix()) *
                    1000 +
                  8000;
                console.log("Waiting for reveal", timeToReveal);
                setTimeout(async () => {
                  console.log("Reveal");
                  let success = false;
                  for (let i = 0; i < 10; i++) {
                    try {
                      await contract.reveal(randomValue);
                      success = true;
                      break;
                    } catch (err: any) {
                      if (i == 9) {
                        // Last retry
                        alert(
                          "Error: " +
                            (err?.data?.message || err?.message || "Unknown")
                        );
                      }
                      console.log("err", i, err);
                      await sleep(i * 1000);
                    }
                  }
                  if (success) {
                    setHasRevealed(true);
                  }
                }, timeToReveal);
                setRegistered(true);
              }}
            >
              SEND
            </Button>
          </>
        );
      case 3:
        return (
          <>
            <h1 style={{ marginBottom: "20px" }}>IT&apos;S TIME TO PLAY</h1>

            <ConnectButton size="sm" />
            <p className={styles.paragraph__1}>
              Please wait and approve another transaction in:{" "}
            </p>
            {nextSweepstake && (
              <CountdownTimer
                opensDate={nextSweepstake + (2 * 60 + 8) * 1000}
              />
            )}
            <br />

            <p className={styles.paragraph__2}>
              Be sure to stay here for the next few minutes to confirm your
              submission. Without confirming your submission you will not enter
              today&apos;s s contributors sweepstake.
            </p>
          </>
        );
      case 4:
        return (
          <>
            <p style={{ marginBottom: "50px" }} className={styles.paragraph__1}>
              Thank you for confirming your submission..
            </p>
            {nextSweepstake &&
            Date.now() + timezoneOFfset <
              nextSweepstake + (4 * 60 + 8) * 1000 ? (
              <>
                <p
                  style={{ marginTop: "17px" }}
                  className={styles.paragraph__3}
                >
                  The generated number will appear in:
                </p>
                {nextSweepstake && (
                  <CountdownTimer
                    opensDate={nextSweepstake + (4 * 60 + 8) * 1000}
                  />
                )}
              </>
            ) : (
              <p style={{ marginTop: "17px" }} className={styles.paragraph__3}>
                Generated number:{" "}
                {externalState.randomGenerationMinigameRandom?.toString()}
              </p>
            )}
            <p style={{ marginTop: "17px" }} className={styles.paragraph__3}>
              You are now participating in today&apos;s contributors
              sweepstakes. Stay tuned, we will be announcing the winner soon.
            </p>
          </>
        );
    }
  };
  return (
    <WidgetScreen
      show={show}
      setShow={setShow}
      className={styles.playWidget__screen}
    >
      <div
        className={`${styles.playWidget__content} ${
          theme === "Dark" ? styles.dark : ""
        }`}
      >
        {/* <h1 style={{ textTransform: "uppercase" }}>{label}</h1>
          <div className={styles.line}></div>
          <CountdownTimer opensDate={opensDate} /> */}
        {getScreen()}
      </div>
    </WidgetScreen>
  );
};
export default PlayWidget;
