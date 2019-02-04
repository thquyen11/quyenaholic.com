import * as React from "react";
import "./FXRate.scss";
import { Link } from "react-router-dom";
import inputHandler from "../CalculatorInputHandle";
import "bootstrap/dist/css/bootstrap.min.css";
import { FX_AMOUNT, FX_RATE } from "../../../constans";
import "../../../fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IFXRate {
  currencyList: any;
  fxRates: number[];
  dispatchInput: any;
  dispatchFX: any;
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

  private updateFXRates = () => {
    let currencySymbol = this.props.currencyList.map((data: any, index: number) => {
      return data.currency;
    })

    const ACCESS_API: string = "6109904b3d6580717ada26c59fdc6e4a";
    fetch(`http://data.fixer.io/api/latest?access_key=${ACCESS_API}&symbols=${currencySymbol[0]},${currencySymbol[1]},${currencySymbol[2]},${currencySymbol[3]}`)
      .then((res: any) => res.json())
      .then((data: any) => {
        const fxRates: number[] = [];
        for (let key in data.rates) {
          fxRates.push(parseFloat(data.rates[key]));
        }
        this.props.dispatchFX({ type: FX_RATE, payload: fxRates });
      })
      .catch((err: any) => {
        console.log(err);
      })
  }

  /**
   * calculate FX converted amount based on FXRates
   * then store in currencyList to appear on screen
   */
  private updateFXAmount(currencyList: any[]) {
    for (let i: number = 1; i < currencyList.length; i++) {
      const convertedAmount = parseFloat(currencyList[0].amount) * this.props.fxRates[i] / this.props.fxRates[0];
      currencyList[i].amount = (Math.round(convertedAmount * 100) / 100).toString();
    }
    this.props.dispatchFX({ type: FX_AMOUNT, payload: currencyList });
  }

  private onInput = (userInput: string) => {
    let { currencyList } = this.props;
    console.log(currencyList[0].amount);
    const input: string = inputHandler(userInput, currencyList[0].amount, 24);

    if (input !== "") {
      this.props.dispatchInput(input);
      this.updateFXAmount(currencyList);
    }
  }

  private clickUndo = () => {
    const btnUndo: any = document.querySelector("#undo");
    this.onInput(btnUndo.value);
  }

  componentDidMount() {
    // TODO
    // this.updateFXRates();
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
            <button className="btn btn-dark" value="clear" id="clear" onClick={(e: any) => this.onInput(e.target.value)}>C</button>
            <button className="btn btn-dark" value="7" id="seven" onClick={(e: any) => this.onInput(e.target.value)}>7</button>
            <button className="btn btn-dark" value="8" id="eight" onClick={(e: any) => this.onInput(e.target.value)}>8</button>
            <button className="btn btn-dark" value="9" id="nine" onClick={(e: any) => this.onInput(e.target.value)}>9</button>
          </div>
          <div className="row justify-content-center">
            <Link to="/projects/fxculator/calculator">
              <button className="btn btn-dark" value="calculator" id="calculator">
                <FontAwesomeIcon icon={["fas", "calculator"]} size="1x" />
              </button>
            </Link>
            <button className="btn btn-dark" value="4" id="four" onClick={(e: any) => this.onInput(e.target.value)}>4</button>
            <button className="btn btn-dark" value="5" id="five" onClick={(e: any) => this.onInput(e.target.value)}>5</button>
            <button className="btn btn-dark" value="6" id="six" onClick={(e: any) => this.onInput(e.target.value)}>6</button>
          </div>
          <div className="row justify-content-center">
            <button className="btn btn-dark" value="" id=""></button>
            <button className="btn btn-dark" value="1" id="one" onClick={(e: any) => this.onInput(e.target.value)}>1</button>
            <button className="btn btn-dark" value="2" id="two" onClick={(e: any) => this.onInput(e.target.value)}>2</button>
            <button className="btn btn-dark" value="3" id="three" onClick={(e: any) => this.onInput(e.target.value)}>3</button>
          </div>
          <div className="row justify-content-center">

            <button className="btn btn-dark" value="refresh" id="refresh" onClick={() => this.updateFXRates()}>
              <FontAwesomeIcon icon={["fas", "sync-alt"]} size="1x" />
            </button>
            <button className="btn btn-dark" value="0" id="zero" onClick={(e: any) => this.onInput(e.target.value)}>0</button>
            <button className="btn btn-dark" value="." id="decimal" onClick={(e: any) => this.onInput(e.target.value)}>.</button>
            <button className="btn btn-dark" value="undo" id="undo" onClick={(e: any) => this.clickUndo()}>
              <FontAwesomeIcon icon={["fas", "backspace"]} size="1x" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FXRate;
