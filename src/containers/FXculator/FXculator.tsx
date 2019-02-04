import * as React from "react";
import { connect } from "react-redux";
import "./FXculator.scss";
import FXRate from "../../components/FXculator/FXRate/FXRate";
import Calculator from "../../components/FXculator/Calculator/Calculator";
import "bootstrap/dist/css/bootstrap.min.css";
import { INPUT, INPUT_CALCULATOR, OUTPUT_CALCULATOR } from "../../constans";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

interface StateProps {
	currencyList: any;
	fxRates: number[];
	input: string;
	outcome: string;
}

const mapStateToProps = (state: any): StateProps => {
	return {
		currencyList: state.FXRate.currencyList,
		fxRates: state.FXRate.fxRates,
		input: state.Calculator.input,
		outcome: state.Calculator.outcome,
	};
};

interface DispatchProps {
	dispatchInput: any,
	dispatchFX: any,
	sendInput: any,
	sendOutput: any,
}

const mapDispatchToProps = (dispatch: any): DispatchProps => {
	return {
		dispatchInput: (value: string) => dispatch({ type: INPUT, payload: value }),
		dispatchFX: (action: any) => dispatch({ type: action.type, payload: action.payload }),
		sendInput: (input:string) => dispatch({ type: INPUT_CALCULATOR, payload: input }),
		sendOutput: (outcome:string) => dispatch({ type: OUTPUT_CALCULATOR, payload: outcome }),
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
		console.log('FXculator rendering');
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/projects/fxculator" render={() => {
						return <FXRate dispatchInput={this.props.dispatchInput} currencyList={this.props.currencyList}
							fxRates={this.props.fxRates} dispatchFX={this.props.dispatchFX} />
					}} />
					<Route exact path="/projects/fxculator/calculator" render={() => {
						return <Calculator input={this.props.input} outcome={this.props.outcome} sendInput={this.props.sendInput}
						sendOutput={this.props.sendOutput} />
					}} />
				</Switch>
			</BrowserRouter>

		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FXculator);
