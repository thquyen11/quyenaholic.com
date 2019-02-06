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

interface IFXRate {
  currencyList: any;
  currencyToUpdate: number;
  allCurrencyList: any[];
  udpateAllCurrencyList: any;
  fxRates : number[];
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

  private saveRate=(storeName: string, rates: any, date:string)=>{
    const todayRates:any = {};
    todayRates[date] = rates;
    localStorage.setItem(storeName, todayRates);
    console.log(localStorage.getItem(storeName));
  }

  private getExistingRate=(storeName: string, date:string):any=>{
    if(storeName in localStorage){
      const rates:any = localStorage.getItem(storeName);
      return date in rates ? rates[date] : {}
    } else{
      return {};
    }
  }

  private fetchAllRates = () => {
    const allRates:any = {};
    const today:string = (new Date()).toISOString().slice(0, 10);
    const quotes:any = this.getExistingRate("fxRates", today);
    console.log(quotes);

    if(quotes === {}){
      console.log('get fx rate from api');

      const symbols: string = (currencyList.map((data: any) => data.symbol)).join(",");
      const ACCESS_API: string = "5f6996e69e469cf7e5352ab2a7f2b244";
      fetch(`http://data.fixer.io/api/live?access_key=${ACCESS_API}&symbols=${symbols}`)
        .then((res: any) => res.json())
        .then((data: any) => {
          for (let key in data.quotes) {
            allRates[key.substring(3)] = parseFloat(data.quotes[key]);
          }
          this.props.dispatchFX({ type: FX_ALL_RATES, payload: allRates });
          this.updateExistingRate (allRates, this.props.currencyList, this.props.dispatchFX);
              this.saveRate("fxRates", allRates, today);
        })
        .catch((err: any) => {
          console.log(err);
        })
    } else{
      console.log('load from existing fx rate');

      for (let key in quotes) {
        allRates[key.substring(3)] = parseFloat(quotes[key]);
      }
      this.props.dispatchFX({ type: FX_ALL_RATES, payload: allRates });
      this.updateExistingRate (allRates, this.props.currencyList, this.props.dispatchFX);
    }


    // TODO correct this condition to load from file
    // let allRates: any = {};
    // if (symbols === "") {
    //   console.log('get fx rate from api');
    //   const ACCESS_API: string = "5f6996e69e469cf7e5352ab2a7f2b244";
    //   fetch(`http://data.fixer.io/api/live?access_key=${ACCESS_API}&symbols=${symbols}`)
    //     .then((res: any) => res.json())
    //     .then((data: any) => {
    //       for (let key in data.quotes) {
    //         allRates[key.substring(3)] = parseFloat(data.quotes[key]);
    //       }
    //       this.props.dispatchFX({ type: FX_ALL_RATES, payload: allRates });
    //       this.updateExistingRate (allRates, this.props.currencyList, this.props.dispatchFX);
    //     })
    //     .catch((err: any) => {
    //       console.log(err);
    //     })
    // } else {
    //   console.log('get fx rate from file');
    //   const quotes:any = existingRate ["2019-02-05"];
    //   for (let key in quotes) {
    //     allRates[key.substring(3)] = parseFloat(quotes[key]);
    //   }
    //   this.props.dispatchFX({ type: FX_ALL_RATES, payload: allRates });
    //   this.updateExistingRate (allRates, this.props.currencyList, this.props.dispatchFX);
    // }
  }

  private updateExistingRate  = (allRates: any, currencyList: any, dispatch:any) => {
    console.log('updateExistingRate  currencyList ', currencyList);
    const existingRate : number[] = [];
    (currencyList.map((data: any, index: number) => data.currency)).map((currency: string) => {
      const find: number = allRates[currency];
      if (find !== undefined) existingRate .push(find);
    })
    console.log(existingRate );
    dispatch({ type: FX_RATE, payload: existingRate  });

    this.updateFXAmount(currencyList, this.props.fxRates , this.props.dispatchFX);
  }

  /**
   * calculate FX converted amount based on existingRate 
   * then store in currencyList to appear on screen
   */
  private updateFXAmount(currencyList: any[], existingRate : any, dispatch:any) {
    console.log('fxAmount existingRate  ', existingRate );
    for (let i: number = 1; i < currencyList.length; i++) {
      // base currency USD
      // Calculation: If currencyList[0] = GBP and currencyList[i] = THB
      // convertTHB amount =  GBP amount * USD/THB divide USD/GBP
      const convertedAmount = parseFloat(currencyList[0].amount) * existingRate [i] / existingRate [0];
      currencyList[i].amount = (Math.round(convertedAmount * 100) / 100).toString();
    }
    dispatch({ type: FX_AMOUNT, payload: currencyList });
  }

  private onInput = (userInput: string) => {
    let { currencyList } = this.props;
    console.log(currencyList[0].amount);
    const input: string = inputHandler(userInput, currencyList[0].amount, 24);

    if (input !== "") {
      this.props.dispatchInput(input);
      console.log('input fxRates  ', this.props.fxRates );
      this.updateFXAmount(currencyList, this.props.fxRates , this.props.dispatchFX);
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
    console.log(e.target);
    const id: number = parseInt(e.target.getAttribute("id"));
    console.log('id ', id);
    try {
      this.props.dispatchcurrencyToUpdate(id);
      this.toggleSelectBox("visible");
    } catch (err) {
      console.log(err);
    }
  }

  // private writeexistingRate ToFile = (rates: any) => {
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
            <p className="container col-2" id="1" onClick={this.selectCurrency}>{currencyList[1].currency}</p>
            <div className="amount col-6 text-right" id="1"><p>{currencyList[1].amount === "NaN" ? "0" : currencyList[1].amount}</p></div>
            <div className="container col-2">Graph</div>
          </div>
          <div className="row">
            <div className="container col-2">Flag</div>
            <p className="container col-2" id="2" onClick={this.selectCurrency}>{currencyList[2].currency}</p>
            <div className="amount col-6 text-right" id="2"><p>{currencyList[2].amount === "NaN" ? "0" : currencyList[2].amount}</p></div>
            <div className="container col-2">Graph</div>
          </div>
          <div className="row">
            <div className="container col-2">Flag</div>
            <p className="container col-2" id="3" onClick={this.selectCurrency}>{currencyList[3].currency}</p>
            <div className="amount col-6 text-right" id="3"><p>{currencyList[3].amount === "NaN" ? "0" : currencyList[3].amount}</p></div>
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

            <button className="btn btn-dark" value="refresh" id="refresh" onClick={() => this.updateExistingRate (this.props.allRates, this.props.currencyList, this.props.dispatchFX)}>
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
            allCurrencyList={this.props.allCurrencyList} dispatchSelectNewCurrency={this.props.dispatchSelectNewCurrency} dispatchFX={this.props.dispatchFX}
            updateExistingRate ={this.updateExistingRate} allRates={this.props.allRates} currencyList={this.props.currencyList}/>
        </div>
      </div>
    );
  }
}

export default FXRate;