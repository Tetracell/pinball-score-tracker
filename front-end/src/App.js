import axios from "axios";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";

//Components
import { Navbar } from "./Components/Navbar";
import { Home } from "./Components/Home";
import { Tables } from "./Components/Tables";
import { Players } from "./Components/Players";
//import { ShowTable } from "./Components/ShowTable";
//import { ShowPlayer } from "./Components/ShowPlayer";
import("./App.css");

const API = process.env.REACT_APP_API_URL;

console.log(API);
function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/tables" element={<Tables />} />
        <Route path="/players" element={<Players />} />
      </Routes>
    </div>
  );
}

export default App;
