import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import { formatEther, formatUnits } from "ethers/lib/utils";
import React from "react";
import useWatcher from "../hooks/useWatcher";
import { useAppContext } from "./StateProvider";
interface StateVars {
  reserves0?: BigNumber;
  reserves1?: BigNumber;
  token0?: BigNumber;
  whaleProtectionPercentFromLP?: BigNumber;
  dailyTransfersOf?: BigNumber;
  lockedBalanceOf?: BigNumber;
  allowance?: BigNumber;

  buyLiquidityFee?: BigNumber;
  buySweepstakeFee?: BigNumber;
  buyTeamFee?: BigNumber;
  buyCharityFee?: BigNumber;
  buyRewardFee?: BigNumber;
  buyHodlFee?: BigNumber;
  buyWhaleProtectionFee?: BigNumber;

  sellLiquidityFee?: BigNumber;
  sellSweepstakeFee?: BigNumber;
  sellTeamFee?: BigNumber;
  sellCharityFee?: BigNumber;
  sellRewardFee?: BigNumber;
  sellHodlFee?: BigNumber;
  sellWhaleProtectionFee?: BigNumber;

  balance?: BigNumber;
  GPBalance?: BigNumber;
  txLimit?: BigNumber;
}
export const ExternalStateContext = React.createContext<{ state: StateVars }>({
  state: {},
});

export const ExternalStateProvider: React.FC = ({ children }) => {
  const { account } = useWeb3React<Web3Provider>();
  const { state: AppState, dispatch } = useAppContext();
  const calls = [
    {
      target: process.env.NEXT_PUBLIC_GP_ADDRESS,
      call: ["maxTxAmount()(uint256)"],
      returns: [["txLimit"]],
    },
    {
      target: process.env.NEXT_PUBLIC_PAIR_ADDRESS,
      call: ["getReserves()(uint256,uint256,uint256)"],
      returns: [["reserves0"], ["reserves1"], ["timeStamp"]],
    },
    {
      target: process.env.NEXT_PUBLIC_PAIR_ADDRESS,
      call: ["token0()(uint256)"],
      returns: [["token0"]],
    },
    {
      target: process.env.NEXT_PUBLIC_GP_ADDRESS,
      call: ["whaleProtectionPercentFromLP()(uint256)"],
      returns: [["whaleProtectionPercentFromLP"]],
    },
  ];
  if (account) {
    calls.push({
      target: process.env.NEXT_PUBLIC_GP_ADDRESS,
      call: ["dailyTransfersOf(address)(uint256)", account],
      returns: [["dailyTransfersOf"]],
    });
    calls.push({
      target: process.env.NEXT_PUBLIC_GP_ADDRESS,
      call: ["lockedBalanceOf(address)(uint256)", account],
      returns: [["lockedBalanceOf"]],
    });

    if (process.env.NEXT_PUBLIC_ROUTER_ADDRESS) {
      calls.push({
        target: process.env.NEXT_PUBLIC_GP_ADDRESS,
        call: [
          "allowance(address,address)(uint256)",
          account,
          process.env.NEXT_PUBLIC_ROUTER_ADDRESS,
        ],
        returns: [["allowance"]],
      });
    }
    if (
      process.env.NEXT_PUBLIC_PAIR_ADDRESS &&
      AppState.gainInBigNumber &&
      !AppState.gainInBigNumber.eq(0)
    ) {
      calls.push({
        target: process.env.NEXT_PUBLIC_GP_ADDRESS,
        call: [
          "calculateFees(address,address,uint256)(uint256,uint256,uint256,uint256,uint256,uint256,uint256)",
          process.env.NEXT_PUBLIC_PAIR_ADDRESS,
          account,
          AppState.gainInBigNumber.toString(),
        ],
        returns: [
          ["buyLiquidityFee"],
          ["buySweepstakeFee"],
          ["buyTeamFee"],
          ["buyCharityFee"],
          ["buyRewardFee"],
          ["buyHodlFee"],
          ["buyWhaleProtectionFee"],
        ],
      });
      calls.push({
        target: process.env.NEXT_PUBLIC_GP_ADDRESS,
        call: [
          "calculateFees(address,address,uint256)(uint256,uint256,uint256,uint256,uint256,uint256,uint256)",
          account,
          process.env.NEXT_PUBLIC_PAIR_ADDRESS,
          AppState.gainInBigNumber.toString(),
        ],
        returns: [
          ["sellLiquidityFee"],
          ["sellSweepstakeFee"],
          ["sellTeamFee"],
          ["sellCharityFee"],
          ["sellRewardFee"],
          ["sellHodlFee"],
          ["sellWhaleProtectionFee"],
        ],
      });
    }
    calls.push({
      target: undefined,
      call: ["getEthBalance(address)(uint256)", account],
      returns: [["balance"]],
    });
    calls.push({
      target: process.env.NEXT_PUBLIC_GP_ADDRESS,
      call: ["balanceOf(address)(uint256)", account],
      returns: [["GPBalance"]],
    });
  }

  const watcher = useWatcher(calls);

  return (
    <ExternalStateContext.Provider value={{ state: watcher }}>
      {children}
    </ExternalStateContext.Provider>
  );
};
