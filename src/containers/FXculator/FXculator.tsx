import * as React from "react";
import { connect } from "react-redux";
import "./FXculator.scss";
import FXRate from "../../components/FXculator/FXRate/FXRate";
import Calculator from "../../components/FXculator/Calculator/Calculator";
import { INPUT, INPUT_CALCULATOR, OUTPUT_CALCULATOR, CURRENCY_TO_UPDATE, UPDATE_ALL_CURRENCY_LIST, SELECT_NEW_CURRENCY } from "../../constans";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

interface StateProps {
  currencyList: any;
  currencyToUpdate: number;
  allCurrencyList: any[];
  fxRates: number[];
  allRates: any;
  input: string;
  outcome: string;
}

const mapStateToProps = (state: any): StateProps => {
  return {
    currencyList: state.FXRate.currencyList,
    currencyToUpdate: state.FXRate.currencyToUpdate,
    allCurrencyList: state.FXRate.allCurrencyList,
    fxRates: state.FXRate.fxRates,
    allRates: state.FXRate.allRates,
    input: state.Calculator.input,
    outcome: state.Calculator.outcome,
  };
};

interface DispatchProps {
  dispatchInput: any,
  dispatchcurrencyToUpdate: any,
  udpateAllCurrencyList: any,
  dispatchSelectNewCurrency:any,
  dispatchFX: any,
  sendInput: any,
  sendOutput: any,
}

const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    dispatchInput: (value: string) => dispatch({ type: INPUT, payload: value }),
    dispatchcurrencyToUpdate: (id:number) => dispatch({ type: CURRENCY_TO_UPDATE, payload: id }),
    udpateAllCurrencyList: (list:any)=> dispatch({ type: UPDATE_ALL_CURRENCY_LIST, payload: list }),
    dispatchSelectNewCurrency: (symbol:any)=> dispatch({ type: SELECT_NEW_CURRENCY, payload: symbol }),
    dispatchFX: (action: any) => dispatch({ type: action.type, payload: action.payload }),
    sendInput: (input: string) => dispatch({ type: INPUT_CALCULATOR, payload: input }),
    sendOutput: (outcome: string) => dispatch({ type: OUTPUT_CALCULATOR, payload: outcome }),
  };
}

interface Props extends StateProps, DispatchProps {
}

/**
 * * Only write code in React predefined function (render, componentDidMount,etc...)
 * componentWillMount(): run only 1 time before initial rendering of React component
 * render(): run everytime the states are updated
 * componentDidMount(): run only 1 time after Reat component initial rendering
 */
class FXculator extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/quyenaholic.com/projects/fxculator" render={() => {
            return <FXRate dispatchInput={this.props.dispatchInput} currencyList={this.props.currencyList}
              fxRates={this.props.fxRates} allRates={this.props.allRates} dispatchFX={this.props.dispatchFX} currencyToUpdate={this.props.currencyToUpdate} allCurrencyList={this.props.allCurrencyList}
              dispatchcurrencyToUpdate={this.props.dispatchcurrencyToUpdate} udpateAllCurrencyList={this.props.udpateAllCurrencyList} dispatchSelectNewCurrency={this.props.dispatchSelectNewCurrency}/>
          }} />
          <Route exact path="/quyenaholic.com/projects/fxculator/calculator" render={() => {
            return <Calculator input={this.props.input} outcome={this.props.outcome} sendInput={this.props.sendInput}
              sendOutput={this.props.sendOutput} />
          }} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FXculator);
