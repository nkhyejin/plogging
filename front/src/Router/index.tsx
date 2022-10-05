import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "@components/Nav";

import Home from "./Home";
import About from "./About";
import Map from "./Map";
import Register from "./Register";

export default function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/map" element={<Map />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
