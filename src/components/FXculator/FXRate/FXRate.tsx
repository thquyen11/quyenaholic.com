import * as React from "react";
import "./FXRate.scss";
import { Link } from "react-router-dom";
import inputHandler from "../CalculatorInputHandle";
import CurrencySelection from "../../../components/FXculator/CurrencySelection/CurrencySelection";
import "bootstrap/dist/css/bootstrap.min.css";
import { FX_AMOUNT, FX_RATE, FX_ALL_RATES } from "../../../constans";
import "../../../fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { currencyList } from "../../../components/FXculator/CurrencySelection/assets/CurrencyList";
import {FXRATES} from "../../../temp/FXRates";

interface IFXRate {
  currencyList: any;
  currencyToUpdate: number;
  allCurrencyList: any[];
  udpateAllCurrencyList: any;
  fxRates: number[];
  allRates: {};
  dispatchInput: any;
  dispatchFX: any;
  dispatchcurrencyToUpdate: any;
  dispatchSelectNewCurrency: any;
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

  private fetchAllRates = () => {
    const symbols: string = (currencyList.map((data: any) => data.symbol)).join(",");
    console.log(symbols);

    // TODO correct this condition to load from file
    let allRates: any = {};
    if (symbols === "") {
      const ACCESS_API: string = "5f6996e69e469cf7e5352ab2a7f2b244";
      fetch(`http://data.fixer.io/api/live?access_key=${ACCESS_API}&symbols=${symbols}`)
        .then((res: any) => res.json())
        .then((data: any) => {
          for (let key in data.quotes) {
            allRates[key.substring(3)] = parseFloat(data.quotes[key]);
          }
          this.props.dispatchFX({ type: FX_ALL_RATES, payload: allRates });
          this.updateFXRates(allRates);
        })
        .catch((err: any) => {
          console.log(err);
        })
    } else {
      const quotes:any = FXRATES["2019-02-05"];
      for (let key in quotes) {
        allRates[key.substring(3)] = parseFloat(quotes[key]);
      }
      this.props.dispatchFX({ type: FX_ALL_RATES, payload: allRates });
      this.updateFXRates(allRates);
    }
  }

  private updateFXRates = (allRates: any) => {
    const fxRates: number[] = [];
    (this.props.currencyList.map((data: any, index: number) => data.currency)).map((currency: string) => {
      const find: number = allRates[currency];
      if (find !== undefined) fxRates.push(find);
    })
    console.log(fxRates);
    this.props.dispatchFX({ type: FX_RATE, payload: fxRates });
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

  private toggleSelectBox = (status: string) => {
    try {
      const currencySelection: HTMLElement | null = document.querySelector("#currency-select-wrapper");
      if (currencySelection !== null) {
        currencySelection.style.visibility = status;
      } else {
        console.log("#currency-select-wrapper node not exist in HTML DOM");
      }
    } catch (err) {
      console.log(err);
    }
  }

  private selectCurrency = (e: any) => {
    const id: number = parseInt(e.target.getAttribute("id"));
    try {
      this.props.dispatchcurrencyToUpdate(id);
      this.toggleSelectBox("visible");
    } catch (err) {
      console.log(err);
    }
  }

  // private writeFXRatesToFile = (rates: any) => {
  //   fs.writeFile("../../../temp/fx-rates.txt", JSON.stringify(rates), (err: any) => {
  //     console.log(err)
  //   })
  // }

  componentDidMount() {
    this.fetchAllRates();
  }

  render() {
    const { currencyList, currencyToUpdate } = this.props;
    return (
      <div className="container col-sm-3" id="FXculator-container">
        <div className="container" id="screen">
          <div className="row" id="base-currency">
            <div className="container col-2">Flag</div>
            <p className="container col-2" id="0" onClick={this.selectCurrency}>{currencyList[0].currency}</p>
            <div className="amount col-6 text-right"><p>{currencyList[0].amount}</p></div>
            <div className="container col-2">Graph</div>
          </div>
          <div className="row">
            <div className="container col-2">Flag</div>
            <div className="container col-2" id="1"><p>{currencyList[1].currency}</p></div>
            <div className="amount col-6 text-right" id="1"><p>{currencyList[1].amount}</p></div>
            <div className="container col-2">Graph</div>
          </div>
          <div className="row">
            <div className="container col-2">Flag</div>
            <div className="container col-2" id="2"><p>{currencyList[2].currency}</p></div>
            <div className="amount col-6 text-right" id="2"><p>{currencyList[2].amount}</p></div>
            <div className="container col-2">Graph</div>
          </div>
          <div className="row">
            <div className="container col-2">Flag</div>
            <div className="container col-2" id="3"><p>{currencyList[3].currency}</p></div>
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

            <button className="btn btn-dark" value="refresh" id="refresh" onClick={() => this.updateFXRates(this.props.allRates)}>
              <FontAwesomeIcon icon={["fas", "sync-alt"]} size="1x" />
            </button>
            <button className="btn btn-dark" value="0" id="zero" onClick={(e: any) => this.onInput(e.target.value)}>0</button>
            <button className="btn btn-dark" value="." id="decimal" onClick={(e: any) => this.onInput(e.target.value)}>.</button>
            <button className="btn btn-dark" value="undo" id="undo" onClick={(e: any) => this.clickUndo()}>
              <FontAwesomeIcon icon={["fas", "backspace"]} size="1x" />
            </button>
          </div>
        </div>
        <div className="container" id="currency-select-wrapper" style={{ visibility: "hidden", position: "absolute", zIndex: 20, top: "10px" }}>
          <CurrencySelection currencyToUpdate={currencyToUpdate} udpateAllCurrencyList={this.props.udpateAllCurrencyList} toggleSelectBox={this.toggleSelectBox}
            allCurrencyList={this.props.allCurrencyList} dispatchSelectNewCurrency={this.props.dispatchSelectNewCurrency}
            updateFXRates={this.updateFXRates} allRates={this.props.allRates}/>
        </div>
      </div>
    );
  }
}

export default FXRate;
