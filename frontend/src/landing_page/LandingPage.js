import {Component} from "react";
import axios from "axios";
import {Routes, Route, Link} from "react-router-dom";

import "./LandingPage.css";

import RsrcLogo from "../resources/logo_transparant.svg";

class LandingPage extends Component {

    componentDidMount() {
        document.title = "Filmer: Where people find their favourite movies!";
    }

    render() {
        return (
            <div className="cover-container d-flex h-100 p-3 mx-auto flex-column text-center">
                <header className="masthead mb-auto">
                    <img src={RsrcLogo} width="100px"/>
                </header>
                <main role="main" className="mb-5">
                    <h1 className="cover-heading">Where people find their favourite movies!</h1>
                    <div className="mt-5">
                        <Link to="/signup">
                            <button type="button" className="btn btn-light m-1">Sign up</button>
                        </Link>
                        <Link to="/login">
                            <button type="button" className="btn btn-light m-1">Log in</button>
                        </Link>
                    </div>
                </main>
                <footer className="mastfoot mt-auto">
                    <div className="inner">
                        <p><a href="">Terms of Service</a> - <a href="">Privacy Policy</a> - <a href="">Cookie
                            Policy</a> - <a href="">About</a> - <a href="">Developers</a></p>
                        <p>(c) 2022 filmer inc.</p>
                    </div>
                </footer>
            </div>
        );
    }

}

export default LandingPage;

