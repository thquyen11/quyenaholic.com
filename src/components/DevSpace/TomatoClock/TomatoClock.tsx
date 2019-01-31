import * as React from "react";
import "./TomatoClock.scss";
import { SESSION_INCREASE, SESSION_DECREASE, BREAK_INCREASE, BREAK_DECREASE } from "../../../constans";

interface ITomatoClock {
  clockProps: any,
  dispatchClockSetting: any,
  updateRunStatus: any,
  dispatchRemainSeconds: any,
  dispatchTimeoutId: any,
}

class TomatoClock extends React.Component<ITomatoClock> {
  private clockStatus: string;
  constructor(props: ITomatoClock) {
    super(props);
    this.clockStatus = "session";
  }

  updateClockSetting = (event: any) => {
    if (event.target.id === "session-increase" && this.props.clockProps.sessionSetting < 90) {
      return this.props.dispatchClockSetting(SESSION_INCREASE, 1);
    }

    if (event.target.id === "session-decrease" && this.props.clockProps.sessionSetting > 1) {
      return this.props.dispatchClockSetting(SESSION_DECREASE, 1);
    }

    if (event.target.id === "break-increase" && this.props.clockProps.breakSetting < 20) {
      return this.props.dispatchClockSetting(BREAK_INCREASE, 1);
    }

    if (event.target.id === "break-decrease" && this.props.clockProps.breakSetting > 1) {
      return this.props.dispatchClockSetting(BREAK_DECREASE, 1);
    }
  };

  buzze = () => {
    const beep: any = document.querySelector("#break-time-notify");
    let playTime:number = 5;
    do{
      beep.play();
      playTime--;
    }while(playTime>0);
  }
  startCountDown = (seconds: number) => {
    this.props.dispatchRemainSeconds(seconds);

    const timeoutId: any = setTimeout(() => {
      if (seconds > 0) {
        seconds--;
        this.startCountDown(seconds);
      } else {
        if (this.clockStatus === "session") {
          this.buzze();
          this.clockStatus = "break";
          this.startCountDown(this.props.clockProps.breakSetting * 60);
        } else {
          this.clockStatus = "session";
          this.startCountDown(this.props.clockProps.sessionSetting * 60);
        }
      }
    }, 1000)

    this.props.dispatchTimeoutId(timeoutId);
  }

  stopCountDown = (idList: number[]) => {
    idList.map((id: any) => {
      clearTimeout(id);
    })
    this.props.dispatchRemainSeconds(this.props.clockProps.sessionSetting * 60);
    this.clockStatus = "session";
  }

  controlCountDown = (event: any) => {
    if (event.target.id === "start") {
      this.props.updateRunStatus(event);
      this.startCountDown(this.props.clockProps.sessionSetting * 60);
    } else {
      this.stopCountDown(this.props.clockProps.timeoutId);
      this.props.updateRunStatus(event);
    }
  }

  render() {
    const { sessionSetting, breakSetting, isRun, remainSeconds } = this.props.clockProps;
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
          <h4>Tomato Clock</h4>
          <div className="container col-md-6" id="clock-container">
            <h1>{Math.floor(remainSeconds / 60) < 10 ? ("0" + Math.floor(remainSeconds / 60)) : Math.floor(remainSeconds / 60)}
              : {remainSeconds % 60 < 10 ? ("0" + remainSeconds % 60) : remainSeconds % 60}</h1>
          </div>
        </div>
        <div className="container col-md-6 text-center">
          {isRun ?
            <button type="button" className="btn btn-dark" id="stop" onClick={(event: any) => this.controlCountDown(event)}>Stop</button>
            : <button type="button" className="btn btn-info" id="start" onClick={(event: any) => this.controlCountDown(event)}>Start</button>
          }
        </div>
        <audio id="break-time-notify">
          <source src="https://goo.gl/65cBl1" type="audio/wav"></source>
        </audio>
      </div>
    )
  }
}

export default TomatoClock;