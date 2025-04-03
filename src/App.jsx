import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./routes/home/home.component.jsx";
import Navigation from "./routes/navigation/navigation.component.jsx";
import Authentication from "./routes/authentication/authentication.component.jsx";

import "./App.css";

const Shop = () => {
  return <h1>Hi im shop!</h1>;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
