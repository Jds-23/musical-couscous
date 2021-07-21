import { ethers } from "ethers";
import { useContext, useState } from "react";
import { ExternalStateContext } from "../../context/ExternalState";
import { BuyOrSell, useAppContext } from "../../context/StateProvider";
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
            {!swapState.buyliquidityFee ||
            !swapState.buyteamFee ||
            !swapState.buysweepstakeFee ? (
              <></>
            ) : (
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
                  <p>
                    {ethers.utils.formatUnits(swapState.buyliquidityFee, 9)}{" "}
                    GAIN
                  </p>
                  <p>
                    {ethers.utils.formatUnits(swapState.buyteamFee, 9)} GAIN
                  </p>
                  <p>
                    {ethers.utils.formatUnits(swapState.buysweepstakeFee, 9)}{" "}
                    GAIN
                  </p>
                </div>
              </div>
            )}
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
            {!swapState.sellrewardFee ||
            !swapState.sellhodlFee ||
            !swapState.sellcharityFee ||
            !swapState.sellwhaleProtectionFee ? (
              <></>
            ) : (
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
                  <p>
                    {ethers.utils.formatUnits(swapState.sellrewardFee, 9)} GAIN
                  </p>
                  <p>
                    {ethers.utils.formatUnits(swapState.sellhodlFee, 9)} GAIN
                  </p>
                  <p>
                    {ethers.utils.formatUnits(swapState.sellcharityFee, 9)} GAIN
                  </p>
                  <p>
                    {ethers.utils.formatUnits(
                      swapState.sellwhaleProtectionFee,
                      9
                    )}{" "}
                    GAIN
                  </p>
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
