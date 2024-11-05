import Details from "../Details";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";

import "./App.css";

import Header from "../Header";
import Login from "../Login";
import Register from "../Register";
import Home from "../Home";

const LazyAddPet = React.lazy(() => import("../AddPet"));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-pet" element={<LazyAddPet />} />
          <Route path="/pets/:id" element={<Details />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
