import { INPUT, FX_RATE, FX_ALL_RATES, FX_AMOUNT, INPUT_CALCULATOR, OUTPUT_CALCULATOR, CURRENCY_TO_UPDATE, UPDATE_ALL_CURRENCY_LIST, SELECT_NEW_CURRENCY } from "../../constans";
import {flags} from "../../components/FXculator/CurrencySelection/assets/FlagURL";

const initialFXRate = {
  currencyList: [
    {
      currency: "USD",
      amount: "0",
      flag: flags.USD,
    },
    {
      currency: "THB",
      amount: "0",
      flag: flags.THB,
    },
    {
      currency: "VND",
      amount: "0",
      flag: flags.VND,
    },
    {
      currency: "SGD",
      amount: "0",
      flag: flags.SGD,
    },
  ],
  currencyToUpdate: 0 as number,
  fxRates: [] as number[],
  allRates: {},
  allCurrencyList: [] as any[],
}

export const FXRate = (state: any = initialFXRate, action: any = {}) => {
  switch (action.type) {
    case FX_RATE:
      return Object.assign({}, state, { fxRates: action.payload });
    case FX_ALL_RATES:
      return Object.assign({}, state, { allRates: action.payload });
    case FX_AMOUNT:
      return Object.assign({}, state, { currencyList: action.payload });
    case INPUT:
      const temp: any = state.currencyList.slice(0);
      temp[0].amount = action.payload;
      return Object.assign({}, state, { currencyList: temp });
    case CURRENCY_TO_UPDATE:
      return Object.assign({}, state, { currencyToUpdate: action.payload });
    case UPDATE_ALL_CURRENCY_LIST:
      return Object.assign({}, state, { allCurrencyList: action.payload });
    case SELECT_NEW_CURRENCY:
      let tmp:any[] = state.currencyList;
      tmp[state.currencyToUpdate].currency = action.payload.symbol;
      tmp[state.currencyToUpdate].flag = action.payload.flag;
      return Object.assign({}, state, { currencyList: tmp });
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