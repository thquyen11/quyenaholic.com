import * as React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./CurrencySelection.scss";
import { currencyList } from "./assets/CurrencyList"
import { flags } from "./assets/FlagURL";

interface ICurrencySelection {
  currencyToUpdate: number;
  allCurrencyList: any[];
  allRates: any;
  currencyList: any;
  updateExistingRate: any;
  udpateAllCurrencyList: any;
  dispatchSelectNewCurrency: any;
  dispatchFX: any;
  toggleSelectBox: any;
}

class CurrencySelection extends React.Component<ICurrencySelection> {
  constructor(props: ICurrencySelection) {
    super(props);
  }

  private filterCurrencyList = (e: any) => {
    let input: string = e.target.value;
    if (input === "") {
      this.props.udpateAllCurrencyList(currencyList);
    }
    else {
      // const filteredList: any[] = currencyList.filter((data: any) => data.symbol.indexOf(input) !== -1 || data.name.indexOf(input) !== -1)
      const filteredList: any[] = currencyList.filter((data: any) => {
        input = input.toLowerCase();
        const symbol:string = data.symbol.toLowerCase();
        const name:string = data.name.toLowerCase();
        return symbol.indexOf(input) !== -1 || name.indexOf(input) !== -1;
      })
      this.props.udpateAllCurrencyList(filteredList);
    }
  }

  private onCurrencySelected = (e: any) => {
    e.preventDefault();
    try {
      const symbol: string = e.target.id;
      if (symbol !== null) {
        const flag: string = flags[symbol];
        this.props.dispatchSelectNewCurrency({ symbol: symbol, flag: flag });
        this.props.updateExistingRate(this.props.allRates, this.props.currencyList, this.props.dispatchFX);
        this.props.toggleSelectBox("hidden");
        this.props.udpateAllCurrencyList(currencyList);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  private closeWindow = () => {
    this.props.toggleSelectBox("hidden");
  }

  componentWillMount() {
    this.props.udpateAllCurrencyList(currencyList);
  }

  render() {
    const renderCurrencyList = this.props.allCurrencyList.map((data: any, index: number) => {
      return (
        <div className="row currency-card" key={index}>
          <img src={data.flag} id={data.symbol} onClick={this.onCurrencySelected} alt="country flag" />
          <div className="container col-9">
            <h6 className="currency-card-symbol">{data.symbol}</h6>
            <p>{data.name}</p>
          </div>
        </div>
      )
    })

    return (
      <div className="container" id="currency-selection-container">
        <div className="container" id="currency-selection">
          <div className="row">
            <div className="input-group mb-3 col-10" id="search-box">
              <input type="text" className="form-control" onChange={this.filterCurrencyList} placeholder="Currency" aria-label="search-box" aria-describedby="basic-addon1" autoFocus />
            </div>
            <div className="container col-2">
              <button type="button" className="close" id="btnClose" onClick={this.closeWindow} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <div className="container countries">
            {renderCurrencyList}
          </div>
        </div>
      </div>
    )
  }
}

export default CurrencySelection;