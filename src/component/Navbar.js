import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { countryName, countryObject } from "./CountryName";

const Navbar = (props) => {
const links = ["Home", "Business", "Entertainment", "General", "Health", "Science", "Sports", "Technology"];  
const navigate = useNavigate();
const [search, setSearch] = useState('');
const searchHandler=(e)=>{
  e.preventDefault();
  props.setSearch(search);
  navigate("/search");
}

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
              {links.map((link)=>(
                <li className="nav-item" key={link}>
                <Link className="nav-link " aria-current="page" to={`/${link.toLowerCase()}`}>
                  {link}
                </Link>
              </li>
              ))}             
              
            </ul>
            <ul className="navbar-nav me-right mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {countryObject[props.country]}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

                  {countryName.map((x)=>(
                  <li key={x.countryName}>
                    <button className="dropdown-item" onClick={() => props.changeContry(x.countrySortName)}>
                      {x.countryName}
                    </button>
                  </li>
                  ))}

                </ul>
              </li>
            </ul>

            <form className="d-flex" role="search" onSubmit={searchHandler}>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setSearch(e.target.value)}/>
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
