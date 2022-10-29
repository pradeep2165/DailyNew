import React from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import News from "./component/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const apikey = process.env.REACT_APP_NEWS_API;
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("in");
  const [darkMode, setDarkMode] = useState(false);
  function countryChange(e) {
    setCountry(e);
  }

  return (
    <BrowserRouter>
      <Navbar changeContry={countryChange} country={country} setSearch={setSearch} darkMode={darkMode} setDarkMode={setDarkMode}/>
      <Routes>
        <Route exact path="/" element={<News darkMode={darkMode} apikey={apikey} key="general" country={country} category="general" />} />
        <Route exact path="/home" element={<News darkMode={darkMode} apikey={apikey} key="general" country={country} category="general" />} />
        <Route exact path="/business" element={<News darkMode={darkMode} apikey={apikey} key="business" category="business" country={country} />} />
        <Route exact path="/entertainment" element={<News darkMode={darkMode} apikey={apikey} key="entertainment" category="entertainment" country={country} />} />
        <Route exact path="/general" element={<News darkMode={darkMode} apikey={apikey} key="general" category="general" country={country} />} />
        <Route exact path="/health" element={<News darkMode={darkMode} apikey={apikey} key="health" category="health" country={country} />} />
        <Route exact path="/science" element={<News darkMode={darkMode} apikey={apikey} key="science" category="science" country={country} />} />
        <Route exact path="/sports" element={<News darkMode={darkMode} apikey={apikey} key="sports" category="sports" country={country} />} />
        <Route exact path="/technology" element={<News darkMode={darkMode} apikey={apikey} key="technology" category="technology" country={country} />} />
        <Route exact path="/search" element={search ? <News darkMode={darkMode} apikey={apikey} key="search" search={search}/>: <News apikey={apikey} key="general" country={country} category="general" />}  />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
