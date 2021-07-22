import { formatUnits } from "ethers/lib/utils";
import { useContext } from "react";
import { ExternalStateContext } from "../../context/ExternalState";
import { BuyOrSell, useAppContext } from "../../context/StateProvider";
import Info from "../Info/Info";
import InfoCards from "../InfoCards/InfoCards";

const TransactionsInfos = () => {
  const { state: swapState } = useContext(ExternalStateContext);
  const { state: appState } = useAppContext();
  return (
    <>
      {appState.toggleBuyOrSell === BuyOrSell.Buy ? (
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
              <p>
                {formatUnits(
                  appState.gainInBigNumber
                    ? appState.gainInBigNumber?.sub(
                        appState.gainInBigNumber
                          ?.mul(appState.slippageTolerance)
                          .div(100)
                      )
                    : "0",
                  9
                )}{" "}
                GAIN
              </p>
              <p style={{ color: "#ECB42A" }}>
                {"<"}
                {parseFloat(
                  formatUnits(
                    appState.gainInBigNumber && swapState.reserves0
                      ? appState.gainInBigNumber
                          ?.div(swapState.reserves0)
                          .mul(100)
                      : "0",
                    9
                  )
                ).toFixed(2)}
                %
              </p>
              <p>
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
              <p>
                {formatUnits(
                  appState.gainInBigNumber
                    ? appState.gainInBigNumber?.sub(
                        appState.gainInBigNumber
                          ?.mul(appState.slippageTolerance)
                          .div(100)
                      )
                    : "0",
                  9
                )}{" "}
                GAIN
              </p>
              <p style={{ color: "#ECB42A" }}>
                {"<"}
                {formatUnits(
                  appState.gainInBigNumber && swapState.reserves0
                    ? appState.gainInBigNumber
                        ?.div(swapState.reserves0)
                        .mul(100)
                    : "0",
                  9
                )}
                %
              </p>
              <p>
                {" "}
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
        </InfoCards>
      )}
    </>
  );
};

export default TransactionsInfos;
