import { INPUT, FXRATE_UPDATE } from "../../constans";

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
}

export const FXRate = (state: any = initialFXRate, action: any = {}) => {
  switch (action.type) {
    case FXRATE_UPDATE:
      return Object.assign({}, state, { currencyList: action.payload });
    case INPUT:
      if (action.payload === "clear") {
        const temp = state.currencyList.map((currency: any) => {
          currency.amount = "0";
          return currency;
        })
        return Object.assign({}, state, { currencyList: temp });;
      } else if (action.payload === "undo") {
        const temp = new Array(...state.currencyList);
        console.log('temp ', temp);
        if (temp[0].amount.length === 1) {
          temp[0].amount = "0";
        } else {
          temp[0].amount=temp[0].amount.slice(0, temp[0].amount.length - 1);
        }
        return Object.assign({}, state, { currencyList: temp });;
      } else {
        const temp = new Array(...state.currencyList);
        if (state.currencyList[0].amount === "0") {
          temp[0].amount = action.payload;
        } else {
          temp[0].amount += action.payload;
        }
        return Object.assign({}, state, { currencyList: temp });
      }
    default:
      return state;
  }
}