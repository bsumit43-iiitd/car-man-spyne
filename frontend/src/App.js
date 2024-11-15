import React from "react";
import "./App.css";
import "./Table.scss";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import CarList from "./components/CarList";
import CarDetail from "./components/CarDetail";
import EditCar from "./components/EditCar";
import Login from "./components/Login";
import Signup from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/car/:id" element={<CarDetail />} />
          <Route exact path="/edit-car/:id" element={<EditCar />} />
          <Route exact path="/" element={<CarList />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
