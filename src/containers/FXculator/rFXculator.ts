import { INPUT, FX_RATE, FX_AMOUNT, INPUT_CALCULATOR, OUTPUT_CALCULATOR } from "../../constans";

const initialFXRate = {
  currencyList: [
    {
      currency: "USD",
      amount: "0",
    },
    {
      currency: "THB",
      amount: "0",
    },
    {
      currency: "VND",
      amount: "0",
    },
    {
      currency: "SGD",
      amount: "0",
    },
  ],
  fxRates: [] as number[],
}

export const FXRate = (state: any = initialFXRate, action: any = {}) => {
  switch (action.type) {
    case FX_RATE:
      return Object.assign({}, state, { fxRates: action.payload });
    case FX_AMOUNT:
      return Object.assign({}, state, { currencyList: action.payload });
    case INPUT:
      const temp:any = state.currencyList.slice(0);
      temp[0].amount=action.payload;
      return Object.assign({}, state, { currencyList: temp });
    default:
      return state;
  }
}


const initialCalculator = {
  input: "0",
  outcome: "0",
}

export const Calculator = (state: any = initialCalculator, action: any = {}) => {
  switch (action.type) {
    case INPUT_CALCULATOR:
      return Object.assign({}, state, { input: action.payload });
    case OUTPUT_CALCULATOR:
      return Object.assign({}, state, { outcome: action.payload });
    default:
      return state;
  }
}