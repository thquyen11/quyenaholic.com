import * as React from "react";
import { connect } from "react-redux";
import "./FXculator.scss";
import FXRate from "../../components/FXculator/FXRate/FXRate";
import "bootstrap/dist/css/bootstrap.min.css";
import { INPUT, FXRATE_UPDATE } from "../../constans";

interface StateProps {
	currencyList: any;
}

const mapStateToProps = (state: any): StateProps => {
	return {
		currencyList: state.FXRate.currencyList,
	};
};

interface DispatchProps {
	dispatchInput: any,
	dispatchFXRate: any,
}

const mapDispatchToProps = (dispatch: any): DispatchProps => {
	return {
		dispatchInput: (value: string) => dispatch({ type: INPUT, payload: value }),
		dispatchFXRate: (updated: any) => dispatch({ type: FXRATE_UPDATE, payload: updated })
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

	componentWillMount(){
		console.log('will mount');
	}

	componentDidMount(){
		console.log('did mount');
	}

	componentWillUpdate(){
		console.log('will update');
	}

	render() {
		console.log(this.props.currencyList);
		return (
			<FXRate dispatchInput={this.props.dispatchInput} currencyList={this.props.currencyList}
				dispatchFXRate={this.props.dispatchFXRate} />
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FXculator);
