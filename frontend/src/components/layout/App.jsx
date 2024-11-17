import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getToken } from "../../apis/auth";
import "./App.css";
import { Provider } from "react-redux";
import store from "../../store";
import ErrorBoundary from "../ErrorBoundary";
import Admin from "../admin/Dashboard";

const LazyHome = React.lazy(() => import("../Home"));
const LazyFavorites = React.lazy(() => import("../Favorites"));
const LazyDetails = React.lazy(() => import("../Details"));
const LazyLogin = React.lazy(() => import("../Login"));
const LazyRegister = React.lazy(() => import("../Register"));
const LazyAddPet = React.lazy(() => import("../AddPet"));
const LazyHeader = React.lazy(() => import("../Header"));
const LazyPetAdoptionReqeuest = React.lazy(() =>
  import("../admin/PetAdoptionRequset")
);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <MainRoutes />
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
}

function MainRoutes() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      dispatch({ type: "user/logout" });
      navigate("/auth/login");
    }
  }, [navigate, dispatch]);

  return (
    <>
      <LazyHeader />
      <Routes>
        <Route path="/" element={<LazyHome />} />
        <Route path="/favorites" element={<LazyFavorites />} />
        <Route path="/add-pet" element={<LazyAddPet />} />
        <Route path="/pets/:id" element={<LazyDetails />} />
        <Route path="/auth/login" element={<LazyLogin />} />
        <Route path="/auth/register" element={<LazyRegister />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/requests" element={<LazyPetAdoptionReqeuest />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
