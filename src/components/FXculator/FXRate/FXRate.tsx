import * as React from "react";
import "./FXRate.scss";
import "bootstrap/dist/css/bootstrap.min.css";

interface IFXRate {
  currencyList: any;
  // activeOne: number;
  dispatchInput: any,
  dispatchFXRate: any,
}

/**
 * * Only write code in React predefined function (render, componentDidMount,etc...)
 * componentWillMount(): run only 1 time before initial rendering of React component
 * render(): run everytime the states are updated
 * componentDidMount(): run only 1 time after Reat component initial rendering
 */
class FXRate extends React.Component<IFXRate> {
  constructor(props: IFXRate) {
    super(props);
  }

  updateFXRate = (currencyList: any) => {
    let currencies = currencyList.map((data: any, index: number) => {
      return data.currency;
    })

    // fetch the fx rate API
    const ACCESS_API: string = "6109904b3d6580717ada26c59fdc6e4a";
    fetch(`http://data.fixer.io/api/latest?access_key=${ACCESS_API}&symbols=${currencies[0]},${currencies[1]},${currencies[2]},${currencies[3]}`)
      .then((res: any) => res.json())
      .then((data: any) => {
        const fxRates: any = [];
        for (let key in data.rates) {
          fxRates.push(data.rates[key]);
        }
        // Calculate FX rate of each currencies
        for (let i: number = 1; i < currencyList.length; i++) {
          const convert = parseFloat(currencyList[0].amount) * (parseFloat(fxRates[i])/parseFloat(fxRates[0]));
          currencyList[i].amount = (Math.round(convert*10000)/10000).toString();
        }
        this.props.dispatchFXRate(currencyList);
      })
      .catch((err: any) => {
        console.log(err);
      })
  }

  onInput = (event: any) => {
    // input base currency amount
    if (this.props.currencyList[0].amount === "0" && event.target.value === "0") {
      console.log("Base amount is 0 now, should not input more 0 lol");
    } else {
      const { currencyList } = this.props;
      this.props.dispatchInput(event.target.value);

      // calculate FX exchange rate
      console.log(currencyList)
      this.updateFXRate(currencyList);
    }
  }

  render() {
    const { currencyList } = this.props;
    return (
      <div className="container col-sm-3" id="FXculator-container">
        <div className="container" id="screen">
          <div className="row" id="base-currency">
            <div className="container col-2">Flag</div>
            <div className="container col-2"><p>{currencyList[0].currency}</p></div>
            <div className="amount col-6 text-right" id="0"><p>{currencyList[0].amount}</p></div>
            <div className="container col-2">Graph</div>
          </div>
          <div className="row">
            <div className="container col-2">Flag</div>
            <div className="container col-2"><p>{currencyList[1].currency}</p></div>
            <div className="amount col-6 text-right" id="1"><p>{currencyList[1].amount}</p></div>
            <div className="container col-2">Graph</div>
          </div>
          <div className="row">
            <div className="container col-2">Flag</div>
            <div className="container col-2"><p>{currencyList[2].currency}</p></div>
            <div className="amount col-6 text-right" id="2"><p>{currencyList[2].amount}</p></div>
            <div className="container col-2">Graph</div>
          </div>
          <div className="row">
            <div className="container col-2">Flag</div>
            <div className="container col-2"><p>{currencyList[3].currency}</p></div>
            <div className="amount col-6 text-right" id="3"><p>{currencyList[3].amount}</p></div>
            <div className="container col-2">Graph</div>
          </div>
        </div>
        <div className="container text-center mt-5" id="keys">
          <div className="row justify-content-center">
            <button className="btn btn-dark" value="clear" id="clear" onClick={this.onInput}>C</button>
            <button className="btn btn-dark" value="7" id="seven" onClick={this.onInput}>7</button>
            <button className="btn btn-dark" value="8" id="eight" onClick={this.onInput}>8</button>
            <button className="btn btn-dark" value="9" id="nine" onClick={this.onInput}>9</button>
          </div>
          <div className="row justify-content-center">
            <button className="btn btn-dark" value="calculator" id="calculator" onClick={this.onInput}>Cal</button>
            <button className="btn btn-dark" value="4" id="four" onClick={this.onInput}>4</button>
            <button className="btn btn-dark" value="5" id="five" onClick={this.onInput}>5</button>
            <button className="btn btn-dark" value="6" id="six" onClick={this.onInput}>6</button>
          </div>
          <div className="row justify-content-center">
            <button className="btn btn-dark" value="" id=""></button>
            <button className="btn btn-dark" value="1" id="one" onClick={this.onInput}>1</button>
            <button className="btn btn-dark" value="2" id="two" onClick={this.onInput}>2</button>
            <button className="btn btn-dark" value="3" id="three" onClick={this.onInput}>3</button>
          </div>
          <div className="row justify-content-center">
            <button className="btn btn-dark" value="" id=""></button>
            <button className="btn btn-dark" value="0" id="zero" onClick={this.onInput}>0</button>
            <button className="btn btn-dark" value="." id="decimal" onClick={this.onInput}>.</button>
            <button className="btn btn-dark" value="undo" id="undo" onClick={this.onInput}>Undo</button>
          </div>
        </div>
      </div>
    );
  }
}

export default FXRate;
