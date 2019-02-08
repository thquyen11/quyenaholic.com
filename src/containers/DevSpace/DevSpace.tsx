import * as React from "react";
import { connect } from "react-redux";
import "./DevSpace.scss";
// import "bootstrap/dist/css/bootstrap.min.css";
import TomatoClock from "../../components/DevSpace/TomatoClock/TomatoClock";
import QuotesBox from "../../components/DevSpace/QuotesBox/QuotesBox";
import { TIMEOUT_ID, REMAIN_SECONDS } from "../../constans";

interface StateProps {
  clockProps: any;
  quoteProps: any;
}

const mapStateToProps = (state: any): StateProps => {
  return {
    clockProps: {
      sessionSetting: state.Clock.sessionSetting,
      breakSetting: state.Clock.breakSetting,
      timeoutId: state.Clock.timeoutId,
      isRun: state.Clock.isRun,
      remainSeconds: state.Clock.remainSeconds,
    },
    quoteProps: {
      quoteContent: state.QuotesBox.quoteContent,
      quoteAuthor: state.QuotesBox.quoteAuthor,
    }
  };
};

interface DispatchProps {
  dispatchClockSetting: any,
  updateRunStatus: any,
  dispatchTimeoutId: any,
  dispatchRemainSeconds: any,
  dispatchQuotes: any,
}

const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    dispatchClockSetting: (type: any, payload: number) => dispatch({ type: type, payload: payload }),
    updateRunStatus: (event: any) => dispatch({ type: event.target.id, payload: {} }),
    dispatchTimeoutId: (id: number) => dispatch({ type: TIMEOUT_ID, payload: id }),
    dispatchRemainSeconds: (seconds: number) => dispatch({ type: REMAIN_SECONDS, payload: seconds }),
    dispatchQuotes: (type: string, payload: any) => dispatch({ type: type, payload: payload }),
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

  _onReady(event: any) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  componentWillMount() {
  }

  render() {

    return (
      <div className="container col-md-6" id="DevSpace-container">
        <div className="container">
          <TomatoClock clockProps={this.props.clockProps} dispatchClockSetting={this.props.dispatchClockSetting}
            updateRunStatus={this.props.updateRunStatus} dispatchRemainSeconds={this.props.dispatchRemainSeconds}
            dispatchTimeoutId={this.props.dispatchTimeoutId} />
        </div>
        <div className="container">
          <QuotesBox quoteProps={this.props.quoteProps} dispatchQuotes={this.props.dispatchQuotes} />
        </div>
        <div className="container" id="youtube-container">
          <div className="embed-responsive embed-responsive-16by9">
            <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/vAKtNV8KcWg?controls=1&loop=1"></iframe>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DevSpace);
