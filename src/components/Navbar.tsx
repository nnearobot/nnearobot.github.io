import React from 'react';

const Navbar = () => {   
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <a className="navbar-brand" href="/">Nnearobot</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse topNav" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item"><a className="nav-link" href="/#/about">About</a></li>
                        <li className="nav-item"><a className="nav-link" href="/#/body-health">Body Health</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;