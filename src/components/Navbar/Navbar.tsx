import * as React from "react";
import "./Navbar.scss";

class Navbar extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <nav id="navbar" className="navbar navbar-expand-lg navbar-inverse">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/quyenaholic.com/">01 : Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/quyenaholic.com/#projects-card">02 : Projects</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/quyenaholic.com/#works-card">03 : Work Experiences</a>
                        </li>
                        <li className="nav-item" id="nav-item-last">
                            <a className="nav-link" href="/quyenaholic.com/#contact-card">04 : Contact</a>
                        </li>
                    </ul>
                </div>
            </nav>

        )
    }
}

export default Navbar;