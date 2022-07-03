import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            DailyNews
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/business">
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/entertainment">
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/general">
                  General
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/health">
                  Health
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/science">
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/sports">
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/technology">
                  Technology
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav me-right mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Choose Country
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <button className="dropdown-item" onClick={() => props.changeContry("us")}>
                      Usa
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => props.changeContry("in")}>
                      India
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => props.changeContry("ch")}>
                      Switzerland
                    </button>
                  </li>
                </ul>
              </li>
            </ul>

            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
