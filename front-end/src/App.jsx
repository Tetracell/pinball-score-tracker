import { Routes, Route } from "react-router";
import React from "react";

//Components
import { Navbar } from "./Components/Navbar";
import { Home } from "./Components/Home";
import { Tables } from "./Components/Tables";
import { Players } from "./Components/Players";
import { ShowTable } from "./Components/ShowTable";
import { TvDisplay } from "./Components/TvDisplay";
//import { ShowPlayer } from "./Components/ShowPlayer";
//import { AddPlayerDrawer } from "./Components/AddPlayerDrawer";
import("./App.css");

const API = process.env.REACT_APP_API_URL;

function App() {
  //const [addPlayerVisible, setAddPlayerVisible] = React.useState(false);
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/tables" element={<Tables API={API} />} />
        <Route path="/players" element={<Players API={API} />} />
        <Route path="/tables/:machineid" element={<ShowTable API={API} />} />
        <Route path="/tv-display" element={<TvDisplay API={API} />} />
      </Routes>
    </div>
  );
}

export default App;
