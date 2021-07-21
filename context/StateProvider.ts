import { createContext, useContext } from "react";
import { BigNumber } from "ethers";

export enum Theme {
  Dark = "Dark",
  Light = "Light",
}
export enum SwapState {
  Buy = "Buy",
  Sell = "Sell",
}

export type ThemeContextType = {
  theme: Theme;
  setTheme: (Theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.Dark,
  setTheme: (theme) => console.warn("no theme provider"),
});
export const useTheme = () => useContext(ThemeContext);

const AppContext = createContext({});

type InitialStateType = {
  gainInString: string;
  buyInString: string;
  gainInBigNumber: BigNumber;
  buyInBigNumber: BigNumber;
  swapState: SwapState;
  slippageTolerance: string;
  transactionDeadline: string;
  toggleExpertMode: boolean;
};

const initialState = {};
