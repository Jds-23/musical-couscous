import { BigNumber } from "ethers";
import { BuyOrSell, InitialStateType } from "../context/StateProvider";
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  gain = "GAIN",
  bnb = "BNB",
  tolerance = "TOLERANCE",
  transactionDeadline = "TRANSACTION_DEADLINE",
  toggleExpertMode = "TOGGLE_EXPERT_MODE",
  updatePrice = "UPDATE_PRICE",
  toggleBuyOrSell = "TOGGLE_BUY_OR_SELL",
}

type Payload = {
  [Types.gain]: {
    bnb: BigNumber | undefined;
    gain: BigNumber | undefined;
  };
  [Types.bnb]: {
    bnb: BigNumber | undefined;
    gain: BigNumber | undefined;
  };
  [Types.tolerance]: {
    tolerance: string;
  };
  [Types.transactionDeadline]: {
    transactionDeadline: string;
  };
  [Types.toggleExpertMode]: {
    toggleExpertMode: boolean;
  };
  [Types.updatePrice]: {
    gainPerBNB: string;
    bnbPerGAIN: string;
  };
  [Types.toggleBuyOrSell]: {
    toggleBuyOrSell: BuyOrSell;
  };
};

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

export const reducer = (state: InitialStateType, action: Actions) => {
  switch (action.type) {
    case "GAIN":
      return {
        ...state,
        gainInBigNumber: action.payload.gain,
        bnbInBigNumber: action.payload.bnb,
      };
    case "BNB":
      return {
        ...state,
        gain: action.payload.gain,
        bnb: action.payload.bnb,
      };
    case "TOLERANCE":
      if (
        action.payload.tolerance === "" ||
        parseFloat(action.payload.tolerance) < 0.1
      ) {
        return {
          ...state,
          slippageTolerance: "0.1",
        };
      }
      return {
        ...state,
        slippageTolerance: action.payload.tolerance,
      };
    case "TRANSACTION_DEADLINE":
      if (
        action.payload.transactionDeadline === "" ||
        parseFloat(action.payload.transactionDeadline) < 1
      ) {
        return {
          ...state,
          transactionDeadline: "1",
        };
      }
      return {
        ...state,
        transactionDeadline: action.payload.transactionDeadline,
      };
    case "TOGGLE_EXPERT_MODE":
      return {
        ...state,
        toggleExpertMode: action.payload.toggleExpertMode,
      };
    case "TOGGLE_BUY_OR_SELL":
      return {
        ...state,
        toggleBuyOrSell: action.payload.toggleBuyOrSell,
      };
    case "UPDATE_PRICE":
      return {
        ...state,
        gainPerBNB: action.payload.gainPerBNB,
        bnbPerGAIN: action.payload.bnbPerGAIN,
      };
    default:
      return state;
  }
};
