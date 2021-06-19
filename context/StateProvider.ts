import { createContext, useContext } from "react";

export type WalletAddressContextType = {
  address: string;
  setAddress: (arg0: string) => void;
};

export const WalletAddressContext = createContext<WalletAddressContextType>({
  address: "",
  setAddress: (arg0) => {
    console.log("hello");
  },
});
export const useWalletAddress = () => useContext(WalletAddressContext);
