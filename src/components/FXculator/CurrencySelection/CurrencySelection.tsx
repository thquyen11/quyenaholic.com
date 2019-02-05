import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CurrencySelection.scss";
import { currencyList } from "./assets/CurrencyList"

interface ICurrencySelection {
  currencyToUpdate: number;
  allCurrencyList: any[];
  allRates: any;
  updateFXRates: any;
  udpateAllCurrencyList: any;
  dispatchSelectNewCurrency: any;
  toggleSelectBox: any;
}

class CurrencySelection extends React.Component<ICurrencySelection> {
  constructor(props: ICurrencySelection) {
    super(props);
  }

  private filterCurrencyList = (e: any) => {
    const input: string = e.target.value;
    console.log('input ', input);
    if (input === "") {
      this.props.udpateAllCurrencyList(currencyList);
    }
    else {
      const filteredList: any[] = currencyList.filter((data: any) => data.symbol.indexOf(input) !== -1 || data.name.indexOf(input) !== -1)
      this.props.udpateAllCurrencyList(filteredList);
    }
  }

  private onCurrencySelected = (e: any) => {
    e.preventDefault();
    try {
      const previousNode: Element = e.target.previousSibling;
      previousNode.children[0].textContent;
      const symbol: string|null = previousNode.children[0].textContent;
      if (symbol !== null) {
        this.props.dispatchSelectNewCurrency(symbol);
        this.props.updateFXRates(this.props.allRates);
        this.props.toggleSelectBox("hidden");
        this.props.udpateAllCurrencyList(currencyList);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  componentWillMount() {
    this.props.udpateAllCurrencyList(currencyList);
  }

  render() {
    const renderCurrencyList = this.props.allCurrencyList.map((data: any) => {
      return (
        <div className="row currency-card">
          <div className="container col-1">{data.icon}</div>
          <div className="container col-9">
            <h6 className="currency-card-symbol">{data.symbol}</h6>
            <p>{data.name}</p>
          </div>
          <input type="radio" onClick={this.onCurrencySelected} aria-label="Radio button for following text input"></input>
        </div>
      )
    })

    return (
      <div className="container col-11" id="currency-selection">
        <div className="input-group mb-3 col-10" id="search-box">
          <input type="text" className="form-control" onChange={this.filterCurrencyList} placeholder="Currency" aria-label="search-box" aria-describedby="basic-addon1" autoFocus />
        </div>
        <div className="container">
          {renderCurrencyList}
        </div>
      </div>
    )
  }
}

export default CurrencySelection;