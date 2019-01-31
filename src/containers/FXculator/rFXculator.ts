import { INPUT, FXRATE_UPDATE } from "../../constans";

const initialFXRate = {
  currencyList: [
    {
      currency: "USD",
      amount: 0,
    },
    {
      currency: "SGD",
      amount: 0,
    },
    {
      currency: "VND",
      amount: 0,
    },
    {
      currency: "TWD",
      amount: 0,
    },
  ],
  input: "",
  baseCurrency: "THB",
}

export const FXRate = (state: any = initialFXRate, action: any = {}) => {
  switch (action.type) {
    case FXRATE_UPDATE:
      return Object.assign({}, state, { currencyList: action.payload });
    case INPUT:
      switch (action.payload) {
        case "C":
          return Object.assign({}, state, { input: "" });
        case "undo":
        return Object.assign({}, state, { input: state.input.slice(0, state.input.length-1) });
        case "0":
          return Object.assign({}, state, { input: state.input + action.payload });
        case "1":
          return Object.assign({}, state, { input: state.input + action.payload });
        case "2":
          return Object.assign({}, state, { input: state.input + action.payload });
        case "3":
          return Object.assign({}, state, { input: state.input + action.payload });
        case "4":
          return Object.assign({}, state, { input: state.input + action.payload });
        case "5":
          return Object.assign({}, state, { input: state.input + action.payload });
        case "6":
          return Object.assign({}, state, { input: state.input + action.payload });
        case "7":
          return Object.assign({}, state, { input: state.input + action.payload });
        case "8":
          return Object.assign({}, state, { input: state.input + action.payload });
        case "9":
          return Object.assign({}, state, { input: state.input + action.payload });
        case ".":
          return Object.assign({}, state, { input: state.input + action.payload });
      }
    default:
      return state;
  }
}