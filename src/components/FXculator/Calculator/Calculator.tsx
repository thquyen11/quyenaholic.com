import * as React from "react";
import "./Calculator.scss";
import "fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import inputHandler from "../CalculatorInputHandle";

interface ICalculator {
  input: string;
  outcome: string;
  sendInput: any;
  sendOutput: any;
}

class Calculator extends React.Component<ICalculator> {
  constructor(props: ICalculator) {
    super(props);
  }

  private onInput = (userInput: string) => {
    const input: string = inputHandler(userInput, this.props.input, 30);
    if (input !== "") {
      if (userInput === "=") {
        this.props.sendOutput(input);
        this.props.sendInput(input);
      } else {
        this.props.sendInput(input);
      }
    }
  }

  private clickUndo = () => {
    const btnUndo: any = document.querySelector("#undo");
    this.onInput(btnUndo.value);
  }

  componentDidUpdate() {
    console.log('component did update');
    if (this.props.input === "0") {
      this.props.sendOutput("0");
    }
  }

  render() {
    return (
      <div className="container col-sm-3" id="fxcualtor-calculator">
        <div className="container" id="screen">
          <div className="container text-right" id="input">
            <p>{this.props.input}</p>
          </div>
          <div className="container text-right" id="output">
            <p>{this.props.outcome}</p>
          </div>
        </div>
        <div className="container text-center mt-5" id="keys">
          <div className="row justify-content-center">
            <button className="btn btn-dark" value="+" id="plus" onClick={(e: any) => this.onInput(e.target.value)}>+</button>
            <button className="btn btn-dark" value="-" id="minus" onClick={(e: any) => this.onInput(e.target.value)}>-</button>
            <button className="btn btn-dark" value="*" id="times" onClick={(e: any) => this.onInput(e.target.value)}>x</button>
            <button className="btn btn-dark" value="/" id="divide" onClick={(e: any) => this.onInput(e.target.value)}>/</button>
          </div>
          <div className="row justify-content-center">
            <button className="btn btn-dark" value="clear" id="clear" onClick={(e: any) => this.onInput(e.target.value)}>C</button>
            <button className="btn btn-dark" value="7" id="seven" onClick={(e: any) => this.onInput(e.target.value)}>7</button>
            <button className="btn btn-dark" value="8" id="eight" onClick={(e: any) => this.onInput(e.target.value)}>8</button>
            <button className="btn btn-dark" value="9" id="nine" onClick={(e: any) => this.onInput(e.target.value)}>9</button>
          </div>
          <div className="row justify-content-center">
            <Link to="/projects/fxculator">
              <button className="btn btn-dark" id="exchange"><FontAwesomeIcon icon={["fas", "dollar-sign"]} size="1x" /></button>
            </Link>
            <button className="btn btn-dark" value="4" id="four" onClick={(e: any) => this.onInput(e.target.value)}>4</button>
            <button className="btn btn-dark" value="5" id="five" onClick={(e: any) => this.onInput(e.target.value)}>5</button>
            <button className="btn btn-dark" value="6" id="six" onClick={(e: any) => this.onInput(e.target.value)}>6</button>
          </div>
          <div className="row justify-content-center">
            <button className="btn btn-dark" value="refresh" id="refresh" onClick={(e: any) => this.onInput(e.target.value)}></button>
            <button className="btn btn-dark" value="1" id="one" onClick={(e: any) => this.onInput(e.target.value)}>1</button>
            <button className="btn btn-dark" value="2" id="two" onClick={(e: any) => this.onInput(e.target.value)}>2</button>
            <button className="btn btn-dark" value="3" id="three" onClick={(e: any) => this.onInput(e.target.value)}>3</button>
          </div>
          <div className="row justify-content-center">
            <button className="btn btn-dark" value="=" id="equal" onClick={(e: any) => this.onInput(e.target.value)}>=</button>
            <button className="btn btn-dark" value="0" id="zero" onClick={(e: any) => this.onInput(e.target.value)}>0</button>
            <button className="btn btn-dark" value="." id="decimal" onClick={(e: any) => this.onInput(e.target.value)}>.</button>
            <button className="btn btn-dark" value="undo" id="undo" onClick={() => this.clickUndo()}>
              <FontAwesomeIcon icon={["fas", "backspace"]} size="1x" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Calculator;