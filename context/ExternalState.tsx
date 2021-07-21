import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import React from "react";
import useWatcher from "../hooks/useWatcher";

export const ExternalStateContext = React.createContext({
  state: {} as any,
});

export const ExternalStateProvider: React.FC = ({ children }) => {
  const { account } = useWeb3React<Web3Provider>();
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
    calls.push({
      target: undefined,
      call: ["getEthBalance(address)(uint256)", account],
      returns: [["balance"]],
    });
    if (process.env.NEXT_PUBLIC_PAIR_ADDRESS) {
      calls.push({
        target: process.env.NEXT_PUBLIC_GP_ADDRESS,
        call: [
          "calculateFees(address,address,uint256)(uint256,uint256,uint256,uint256,uint256,uint256,uint256)",
          account,
          process.env.NEXT_PUBLIC_PAIR_ADDRESS,
          "0x01e0390d36804cc8dd6b",
        ],
        returns: [
          ["buyliquidityFee"],
          ["buysweepstakeFee"],
          ["buyteamFee"],
          ["buycharityFee"],
          ["buyrewardFee"],
          ["buyhodlFee"],
          ["buywhaleProtectionFee"],
        ],
      });
      calls.push({
        target: process.env.NEXT_PUBLIC_GP_ADDRESS,
        call: [
          "calculateFees(address,address,uint256)(uint256,uint256,uint256,uint256,uint256,uint256,uint256)",
          account,
          process.env.NEXT_PUBLIC_PAIR_ADDRESS,
          "0x01e0390d36804cc8dd6b",
        ],
        returns: [
          ["sellliquidityFee"],
          ["sellsweepstakeFee"],
          ["sellteamFee"],
          ["sellcharityFee"],
          ["sellrewardFee"],
          ["sellhodlFee"],
          ["sellwhaleProtectionFee"],
        ],
      });
    }
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
