import { ethers } from "ethers";
import { useContext, useState } from "react";
import { ExternalStateContext } from "../../context/ExternalState";
import { BuyOrSell, useAppContext } from "../../context/StateProvider";
import { formatGain } from "../../utils";
import HidableBar from "../HidableBar/HidableBar";
import Info from "../Info/Info";
import InfoCards from "../InfoCards/InfoCards";

const TransactionsFees = () => {
  const { state: swapState } = useContext(ExternalStateContext);
  const { state: appState } = useAppContext();
  const [seeMoreDetails, setSeeMoreDetails] = useState(false);

  return (
    <>
      {appState.toggleBuyOrSell === BuyOrSell.Buy ? (
        <InfoCards>
          <div
            style={{
              fontSize: "12px",
              display: "grid",
              gridTemplateColumns: "4fr 1fr 4fr",
            }}
          >
            <Info tooltip="The total fee you are set to pay when buying GAIN.">
              Buyer Fee
            </Info>
            <p style={{ textAlign: "center" }}>3.5%</p>
            <p style={{ textAlign: "right" }}>
              {swapState.buyLiquidityFee &&
              swapState.buyTeamFee &&
              swapState.buySweepstakeFee
                ? `${formatGain(
                    swapState.buyTeamFee
                      .add(swapState.buyLiquidityFee)
                      .add(swapState.buySweepstakeFee),
                    2
                  )} GAIN`
                : "Loading.."}{" "}
            </p>
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
            {!swapState.buyLiquidityFee ||
            !swapState.buyTeamFee ||
            !swapState.buySweepstakeFee ? (
              <></>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "4fr 1fr 4fr",
                  width: "100%",
                  fontSize: "10px",
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
                  <p>1.9%</p>
                  <p>0.1%</p>
                  <p>1.5%</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p>{formatGain(swapState.buyLiquidityFee, 2)} GAIN</p>
                  <p>{formatGain(swapState.buyTeamFee, 2)} GAIN</p>
                  <p>{formatGain(swapState.buySweepstakeFee, 2)} GAIN</p>
                </div>
              </div>
            )}
          </HidableBar>
        </InfoCards>
      ) : (
        <InfoCards>
          <div
            style={{
              fontSize: "12px",
              display: "grid",
              gridTemplateColumns: "4fr 1fr 4fr",
            }}
          >
            <Info tooltip="The total fee you are set to pay when selling GAIN. ">
              Seller Fee
            </Info>
            <p style={{ textAlign: "center" }}>
              {swapState.sellWhaleProtectionFee && appState.gainInBigNumber
                ? 3.5 +
                  swapState.sellWhaleProtectionFee
                    .mul(1000)
                    .div(appState.gainInBigNumber)
                    .toNumber() /
                    10
                : "3.5"}
              %
            </p>
            <p style={{ textAlign: "right" }}>
              {swapState.sellRewardFee &&
              swapState.sellHodlFee &&
              swapState.sellCharityFee &&
              swapState.sellWhaleProtectionFee
                ? `${formatGain(
                    swapState.sellRewardFee
                      .add(swapState.sellHodlFee)
                      .add(swapState.sellCharityFee)
                      .add(swapState.sellWhaleProtectionFee),
                    3
                  )} GAIN`
                : "Loading.."}
            </p>
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
            {!swapState.sellRewardFee ||
            !swapState.sellHodlFee ||
            !swapState.sellCharityFee ||
            !swapState.sellWhaleProtectionFee ? (
              <></>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "4fr 1fr 4fr",
                  width: "100%",
                  fontSize: "10px",
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
                  <p>3%</p>
                  <p>0.25%</p>
                  <p>0.25%</p>
                  <p>
                    {appState.gainInBigNumber
                      ? `${
                          swapState.sellWhaleProtectionFee
                            .mul(1000)
                            .div(appState.gainInBigNumber)
                            .toNumber() / 10
                        }%`
                      : "-"}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p>{formatGain(swapState.sellRewardFee, 2)} GAIN</p>
                  <p>{formatGain(swapState.sellHodlFee, 2)} GAIN</p>
                  <p>{formatGain(swapState.sellCharityFee, 2)} GAIN</p>
                  <p>{formatGain(swapState.sellWhaleProtectionFee, 2)} GAIN</p>
                </div>
              </div>
            )}
          </HidableBar>
        </InfoCards>
      )}
    </>
  );
};

export default TransactionsFees;
