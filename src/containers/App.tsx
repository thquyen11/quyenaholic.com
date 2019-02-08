import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DevSpace from './DevSpace/DevSpace';
import FXculator from "./FXculator/FXculator";
import LandingPage from "./LandingPage/LandingPage";
import Navbar from "../components/Navbar/Navbar";

class App extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="app-wraper">
                <div id="navbar-wraper">
                    <Navbar />
                </div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={LandingPage} />
                        <Route exact path='/projects/fxculator' component={FXculator} />
                        <Route exact path='/projects/devspace' component={DevSpace} />
                    </Switch>
                </BrowserRouter>
            </div>

        )
    }
}

export default App;