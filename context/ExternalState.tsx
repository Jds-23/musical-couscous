import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import { formatEther, formatUnits } from "ethers/lib/utils";
import React from "react";
import useWatcher from "../hooks/useWatcher";
import { useAppContext } from "./StateProvider";

export const ExternalStateContext = React.createContext({
  state: {} as any,
});

export const ExternalStateProvider: React.FC = ({ children }) => {
  const { account } = useWeb3React<Web3Provider>();
  const { state: AppState, dispatch } = useAppContext();
  const calls = [
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
    // if (
    //   process.env.NEXT_PUBLIC_PAIR_ADDRESS &&
    //   AppState.gainInString &&
    //   !AppState.gainInString.eq(0)
    // ) {
    //   calls.push({
    //     target: process.env.NEXT_PUBLIC_GP_ADDRESS,
    //     call: [
    //       "calculateFees(address,address,uint256)(uint256,uint256,uint256,uint256,uint256,uint256,uint256)",
    //       process.env.NEXT_PUBLIC_PAIR_ADDRESS,
    //       account,
    //       formatUnits(AppState.gainInString, 9),
    //     ],
    //     returns: [
    //       ["buyliquidityFee"],
    //       ["buysweepstakeFee"],
    //       ["buyteamFee"],
    //       ["buycharityFee"],
    //       ["buyrewardFee"],
    //       ["buyhodlFee"],
    //       ["buywhaleProtectionFee"],
    //     ],
    //   });
    //   calls.push({
    //     target: process.env.NEXT_PUBLIC_GP_ADDRESS,
    //     call: [
    //       "calculateFees(address,address,uint256)(uint256,uint256,uint256,uint256,uint256,uint256,uint256)",
    //       account,
    //       process.env.NEXT_PUBLIC_PAIR_ADDRESS,
    //       formatUnits(AppState.gainInString, 9),
    //     ],
    //     returns: [
    //       ["sellliquidityFee"],
    //       ["sellsweepstakeFee"],
    //       ["sellteamFee"],
    //       ["sellcharityFee"],
    //       ["sellrewardFee"],
    //       ["sellhodlFee"],
    //       ["sellwhaleProtectionFee"],
    //     ],
    //   });
    // }
    calls.push({
      target: undefined,
      call: ["getEthBalance(address)(uint256)", account],
      returns: [["balance"]],
    });
    calls.push({
      target: process.env.NEXT_PUBLIC_GP_ADDRESS,
      call: ["balanceOf(address)(uint256)", account],
      returns: [["GPbalance"]],
    });
  }

  const watcher = useWatcher(calls);

  return (
    <ExternalStateContext.Provider value={{ state: watcher }}>
      {children}
    </ExternalStateContext.Provider>
  );
};
