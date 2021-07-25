import { formatEther, formatUnits } from "ethers/lib/utils";
import { useContext } from "react";
import { ExternalStateContext } from "../../context/ExternalState";
import { BuyOrSell, useAppContext } from "../../context/StateProvider";
import { formatGain, getPriceImpactString, useLiquidity } from "../../utils";
import Info from "../Info/Info";
import InfoCards from "../InfoCards/InfoCards";

const TransactionsInfos = () => {
  const { state: swapState } = useContext(ExternalStateContext);
  const { gain, bnb } = useLiquidity();
  const { state: appState } = useAppContext();
  return (
    <>
      {appState.toggleBuyOrSell === BuyOrSell.Buy ? (
        <InfoCards>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "5fr 4fr",
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
                {formatGain(
                  appState.gainInBigNumber
                    ? appState.gainInBigNumber?.sub(
                        appState.gainInBigNumber
                          ?.mul(parseFloat(appState.slippageTolerance) * 1000)
                          .div(100000)
                      )
                    : "0",
                  2
                )}{" "}
                GAIN
              </p>
              <p style={{ color: "#ECB42A" }}>
                {getPriceImpactString(appState.gainInBigNumber, gain)}
              </p>
              <p>
                {formatEther(
                  appState.bnbInBigNumber
                    ? appState.bnbInBigNumber
                        ?.mul(
                          parseInt(process.env.NEXT_PUBLIC_VARIABLE_2!) -
                            parseInt(process.env.NEXT_PUBLIC_VARIABLE_1!)
                        )
                        .div(process.env.NEXT_PUBLIC_VARIABLE_2!)
                    : "0"
                )}{" "}
                BNB
              </p>
            </div>
          </div>
        </InfoCards>
      ) : (
        <InfoCards>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "5fr 4fr",
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
                {formatEther(
                  appState.bnbInBigNumber
                    ? appState.bnbInBigNumber?.sub(
                        appState.bnbInBigNumber
                          ?.mul(parseFloat(appState.slippageTolerance) * 1000)
                          .div(100000)
                      )
                    : "0"
                )}{" "}
                BNB
              </p>
              <p style={{ color: "#ECB42A" }}>
                {getPriceImpactString(appState.bnbInBigNumber, bnb)}
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
