import { SwapState, InitialStateType } from "../context/StateProvider";
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
}

type Payload = {
  [Types.gain]: {
    bnb: string;
    gain: string;
  };
  [Types.bnb]: {
    bnb: string;
    gain: string;
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
};

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

export const reducer = (state: InitialStateType, action: Actions) => {
  switch (action.type) {
    case "GAIN":
      return {
        ...state,
        gain: action.payload.gain,
        bnb: action.payload.bnb,
      };
    case "BNB":
      return {
        ...state,
        gain: action.payload.gain,
        bnb: action.payload.bnb,
      };
    case "TOLERANCE":
      return {
        ...state,
        slippageTolerance: action.payload.tolerance,
      };
    case "TRANSACTION_DEADLINE":
      return {
        ...state,
        transactionDeadline: action.payload.transactionDeadline,
      };
    case "TOGGLE_EXPERT_MODE":
      return {
        ...state,
        toggleExpertMode: action.payload.toggleExpertMode,
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
