import React from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import News from "./component/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const apikey = process.env.REACT_APP_NEWS_API;
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<News apikey={apikey} key="general" />} />
        <Route exact path="/business" element={<News apikey={apikey} key="business" category="business" />} />
        <Route exact path="/entertainment" element={<News apikey={apikey} key="entertainment" category="entertainment" />} />
        <Route exact path="/general" element={<News apikey={apikey} key="general" category="" />} />
        <Route exact path="/health" element={<News apikey={apikey} key="health" category="health" />} />
        <Route exact path="/science" element={<News apikey={apikey} key="science" category="science" />} />
        <Route exact path="/sports" element={<News apikey={apikey} key="sports" category="sports" />} />
        <Route exact path="/technology" element={<News apikey={apikey} key="technology" category="technology" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
