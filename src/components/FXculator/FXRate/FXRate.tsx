import * as React from "react";
import "./FXRate.scss";
import "bootstrap/dist/css/bootstrap.min.css";

interface IFXRate {
  currencyList: any;
  activeOne: number;
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

  fetchFXRate = (currencies: any) => {
    const ACCESS_API: string = "6109904b3d6580717ada26c59fdc6e4a";
    fetch(`http://data.fixer.io/api/latest?access_key=${ACCESS_API}&symbols=${currencies[0]},${currencies[1]},${currencies[2]},${currencies[3]}`)
      .then((res: any) => res.json())
      .then((data: any) => {
        const result: any = [];
        for (let key in data.rates) {
          result.push(data.rates[key]);
        }
        console.log(result);
        return result;
      })
      .catch((err: any) => {
        console.log(err);
      })
  }

  updateFXRate = (currencyList: any, baseAmount:number) => {
    let fxRates = currencyList.map((data: any, index: number) => {
      return data.currency;
    })

    // TODO: get this async fetch return to fxRates
    // fxRates = this.fetchFXRate(fxRates);
    fxRates = [35, 10, 20, 40];
    console.log('fxRates ', fxRates);

    // Calculate FX rate of each currencies
    for (let i: number = 0; i < currencyList.length; i++) {
      currencyList[i].amount = baseAmount*([activeOne] * 1 / (fxRates[i]));
    }

    console.log('list ', currencyList);
    return currencyList;
  }

  onInput = (event: any) => {
    // update input value
    this.props.dispatchInput(event.target.value);

    // calculate FX exchange rate
    const { currencyList } = this.props;
    this.props.dispatchFXRate(this.updateFXRate(currencyList));
  }

  render() {
    const { currencyList } = this.props;
    return (
      <div className="container col-sm-3" id="FXculator-container">
        <div className="container" id="screen">
          <div className="row">
            <div className="container col-2">Flag</div>
            <div className="container col-2">Currency</div>
            <div className="amount col-6 text-right" id="0">{currencyList[0].amount}</div>
            <div className="container col-2">Graph</div>
          </div>
          <div className="row">
            <div className="container col-2">Flag</div>
            <div className="container col-2">Currency</div>
            <div className="amount col-6 text-right" id="1">{currencyList[1].amount}</div>
            <div className="container col-2">Graph</div>
          </div>
          <div className="row">
            <div className="container col-2">Flag</div>
            <div className="container col-2">Currency</div>
            <div className="amount col-6 text-right" id="2">{currencyList[2].amount}</div>
            <div className="container col-2">Graph</div>
          </div>
          <div className="row">
            <div className="container col-2">Flag</div>
            <div className="container col-2">Currency</div>
            <div className="amount col-6 text-right" id="3">{currencyList[3].amount}</div>
            <div className="container col-2">Graph</div>
          </div>
        </div>
        <div className="container text-center mt-5" id="keys">
          <div className="row justify-content-center">
            <button className="btn btn-dark" value="C" id="clear" onClick={this.onInput}>C</button>
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
