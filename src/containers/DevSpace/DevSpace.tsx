import * as React from "react";
import { connect } from "react-redux";
import "./DevSpace.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import TomatoClock from "../../components/DevSpace/TomatoClock/TomatoClock";
// import QuotesBox from "../../components/DevSpace/QuotesBox/QuotesBox";
import { INITIATE_RUNTIME, TIMEOUT_ID } from "../../constans";

interface StateProps {
    clockProps: any
}

const mapStateToProps = (state: any): StateProps => {
    return {
        clockProps: {
            sessionSetting: state.Clock.sessionSetting,
            sessionRun: state.Clock.sessionRun,
            breakSetting: state.Clock.breakSetting,
            breakRun: state.Clock.breakRun,
            timeoutId: state.Clock.timeoutId,
            isRun: state.Clock.isRun,
        }
    };
};

interface DispatchProps {
    dispatchClockSetting: any,
    updateRunStatus: any,
    updateRunTime: any,
    dispatchTimeoutId: any,
}

const mapDispatchToProps = (dispatch: any): DispatchProps => {
    return {
        dispatchClockSetting: (event: any, payload: number) => dispatch({ type: event.target.id, payload: payload }),
        updateRunStatus: (event: any) => dispatch({ type: event.target.id, payload: {} }),
        updateRunTime: (sessionLen: number, breakLen: number) => dispatch({ type: INITIATE_RUNTIME, payload: { sessionLen: sessionLen, breakLen: breakLen } }),
        dispatchTimeoutId: (id: number) => dispatch({ type: TIMEOUT_ID, payload: id })
    }
}

interface Props extends StateProps, DispatchProps {
}

/**
 * * Only write code in React predefined function (render, componentDidMount,etc...)
 * componentWillMount(): run only 1 time before initial rendering of React component
 * render(): run everytime the states are updated
 * componentDidMount(): run only 1 time after Reat component initial rendering
 */
class DevSpace extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <main>
                <TomatoClock clockProps={this.props.clockProps} dispatchClockSetting={this.props.dispatchClockSetting}
                    updateRunStatus={this.props.updateRunStatus} updateRunTime={this.props.updateRunTime} dispatchTimeoutId={this.props.dispatchTimeoutId} />
                <br />
                {/* <QuotesBox /> */}
            </main>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DevSpace);
