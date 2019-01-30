import * as React from "react";
import "./TomatoClock.scss";

interface ITomatoClock {
    clockProps: any,
    dispatchClockSetting: any,
    updateRunStatus: any,
    updateRunTime: any,
    dispatchTimeoutId: any,
}

class TomatoClock extends React.Component<ITomatoClock> {
    constructor(props: ITomatoClock) {
        super(props);
    }

    updateClockSetting = (event: any) => {
        if (event.target.id === "session-increase" || event.target.id === "session-decrease") {
            return this.props.dispatchClockSetting(event, this.props.clockProps.sessionSetting);
        } else {
            return this.props.dispatchClockSetting(event, this.props.clockProps.breakSetting);
        }
    };

    buzze = () => {

    }
    startCountDown = (sessionLen: number, breakLen: number) => {
        const timeoutId: any = setTimeout((sessionLen, breakLen) => {
            sessionLen--;
            console.log('timing ', sessionLen);
            if (sessionLen > 0) {
                this.startCountDown(sessionLen, breakLen);
            } else {
                this.buzze();
                setTimeout(() => this.startCountDown(breakLen, sessionLen), 1000)
            }
        }, 1000)

        console.log('timeoutID ', timeoutId);
        this.props.dispatchTimeoutId(timeoutId);
    }

    stopCountDown = (id: number) => {
        clearTimeout(id);
    }

    controlCountDown = (event: any) => {
        if (event.target.id === "start") {
            console.log('countdown ', event.target.id);
            this.props.updateRunStatus(event);
            this.props.updateRunTime(this.props.clockProps.sessionSetting, this.props.clockProps.breakSetting);
            this.startCountDown(this.props.clockProps.sessionRun, this.props.clockProps.breakRun);
        } else {
            console.log('countdown ', event.target.id);
            this.props.updateRunStatus(event);
            this.stopCountDown(this.props.clockProps.timeoutId);
        }
    }

    render() {
        const { sessionSetting, breakSetting, isRun } = this.props.clockProps;
        return (
            <div className="container" id="tomato-clock">
                <div className="row">
                    <div className="container col-sm-3 text-center" id="session">
                        <h5>Session Length</h5>
                        <div>
                            <h5>{sessionSetting}</h5>
                        </div>
                        <button type="button" className="btn btn-dark" id="session-decrease" onClick={(e: any) => this.updateClockSetting(e)}>-</button>
                        <button type="button" className="btn btn-dark" id="session-increase" onClick={(e: any) => this.updateClockSetting(e)}>+</button>
                    </div>
                    <div className="container col-sm-3 text-center" id="break">
                        <h5>Break Length</h5>
                        <div>
                            <h5>{breakSetting}</h5>
                        </div>
                        <button type="button" className="btn btn-dark" id="break-decrease" onClick={(e: any) => this.updateClockSetting(e)}>-</button>
                        <button type="button" className="btn btn-dark" id="break-increase" onClick={(e: any) => this.updateClockSetting(e)}>+</button>
                    </div>
                </div>
                <div className="container col-md-6 text-center">
                    <h4>Work Session</h4>
                    <div className="container col-md-6" id="clock-container">
                        <h1>20:00</h1>
                    </div>
                </div>
                <div className="container col-md-6 text-center">
                    {isRun ?
                        <button type="button" className="btn btn-dark" id="stop" onClick={(event: any) => this.controlCountDown(event)}>Stop</button>
                        : <button type="button" className="btn btn-dark" id="start" onClick={(event: any) => this.controlCountDown(event)}>Start</button>
                    }
                </div>
            </div>
        )
    }
}

export default TomatoClock;