import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DevSpace from './DevSpace/DevSpace';
import FXculator from "./FXculator/FXculator";
import LandingPage from "./LandingPage/LandingPage";

class App extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={LandingPage} />
                    <Route exact path='/projects/fxculator' component={FXculator} />
                    <Route exact path='/projects/devspace' component={DevSpace} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;