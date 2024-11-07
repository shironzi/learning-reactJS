import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import React, { Suspense, useEffect } from "react";

import "./App.css";
import Header from "../Header";
import { useDispatch } from "react-redux";
import { getToken, logout } from "../../apis/auth";

const LazyHome = React.lazy(() => import("../Home"));
const LazyDetails = React.lazy(() => import("../Details"));
const LazyLogin = React.lazy(() => import("../Login"));
const LazyRegister = React.lazy(() => import("../Register"));
const LazyAddPet = React.lazy(() => import("../AddPet"));

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      dispatch(logout());
      navigate("/auth/login");
    }
  }, [navigate, dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LazyHome />} />
          <Route path="/add-pet" element={<LazyAddPet />} />
          <Route path="/pets/:id" element={<LazyDetails />} />
          <Route path="/auth/login" element={<LazyLogin />} />
          <Route path="/auth/register" element={<LazyRegister />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
