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
      target: process.env.NEXT_PUBLIC_ICO_ADDRESS,
      call: ["collectedInRound(uint256)(uint256)", 0],
      returns: [["collected"]],
    },
    {
      target: process.env.NEXT_PUBLIC_ICO_ADDRESS,
      call: ["hardCapBNBJager()(uint256)"],
      returns: [["hardCap"]],
    },
    {
      target: process.env.NEXT_PUBLIC_ICO_ADDRESS,
      call: ["softCapBNBJager()(uint256)"],
      returns: [["softCap"]],
    },
    {
      target: process.env.NEXT_PUBLIC_ICO_ADDRESS,
      call: ["endTime()(uint256)"],
      returns: [["endTime"]],
    },
    {
      target: process.env.NEXT_PUBLIC_ICO_ADDRESS,
      call: ["startTime()(uint256)"],
      returns: [["startTime"]],
    },
    {
      target: process.env.NEXT_PUBLIC_ICO_ADDRESS,
      call: ["salePerBNB()(uint256)"],
      returns: [["salePerBNB"]],
    },
    {
      target: process.env.NEXT_PUBLIC_ICO_ADDRESS,
      call: ["isAcceptingContribution()(bool)"],
      returns: [["isAcceptingContribution"]],
    },
    {
      target: process.env.NEXT_PUBLIC_ICO_ADDRESS,
      call: ["minBuyBNBJager()(uint256)"],
      returns: [["minBuy"]],
    },
    {
      target: process.env.NEXT_PUBLIC_ICO_ADDRESS,
      call: ["maxBuyBNBJager()(uint256)"],
      returns: [["maxBuy"]],
    },
    {
      target: process.env.NEXT_PUBLIC_ICO_ADDRESS,
      call: ["offeredTokens()(uint256)"],
      returns: [["offeredTokens"]],
    },
    {
      target: process.env.NEXT_PUBLIC_ICO_ADDRESS,
      call: ["liquidityRatePerBNB()(uint256)"],
      returns: [["liquidityRatePerBNB"]],
    },
    {
      target: process.env.NEXT_PUBLIC_ICO_ADDRESS,
      call: ["salePerBNB()(uint256)"],
      returns: [["salePerBNB"]],
    },
    {
      target: process.env.NEXT_PUBLIC_GP_ADDRESS,
      call: ["totalSupply()(uint256)"],
      returns: [["totalSupply"]],
    },
  ];
  if (account) {
    calls.push({
      target: process.env.NEXT_PUBLIC_ICO_ADDRESS,
      call: ["contributionOf(uint256,address)(uint256)", 0, account],
      returns: [["contribution"]],
    });
    calls.push({
      target: undefined,
      call: ["getEthBalance(address)(uint256)", account],
      returns: [["balance"]],
    });
  }

  const watcher = useWatcher(calls);

  return (
    <ExternalStateContext.Provider value={{ state: watcher }}>
      {children}
    </ExternalStateContext.Provider>
  );
};
