import { createContext, useContext, useReducer } from "react";
import { reducer, Actions } from "../reducer/reducer";
import React from "react";
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

export type InitialStateType = {
  gainInString: BigNumber | undefined;
  bnbInString: BigNumber | undefined;
  swapState: SwapState;
  slippageTolerance: string;
  transactionDeadline: string;
  toggleExpertMode: boolean;
  gainPerBNB: string;
  bnbPerGAIN: string;
};

const initialState = {
  gainInString: undefined,
  bnbInString: undefined,
  swapState: SwapState.Buy,
  slippageTolerance: "3",
  transactionDeadline: "20",
  toggleExpertMode: false,
  gainPerBNB: "",
  bnbPerGAIN: "",
};

export const AppContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
