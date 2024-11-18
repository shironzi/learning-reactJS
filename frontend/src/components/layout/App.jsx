import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  parsePath,
} from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { Provider } from "react-redux";
import store from "../../store";
import ErrorBoundary from "../ErrorBoundary";
import Admin from "../admin/Dashboard";

const LazyLogin = React.lazy(() => import("../Login"));
const LazyRegister = React.lazy(() => import("../Register"));

const LazyHome = React.lazy(() => import("../Home"));
const LazyFavorites = React.lazy(() => import("../Favorites"));
const LazyDetails = React.lazy(() => import("../Details"));
const LazyAddPet = React.lazy(() => import("../AddPet"));
const LazyHeader = React.lazy(() => import("../Header"));
const LazyPetAdoptionReqeuest = React.lazy(() =>
  import("../admin/PetAdoptionRequset")
);

const LazyRequest = React.lazy(() => import("../AdoptionRequestList"));

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <MainRoutes />
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  );
}

function MainRoutes() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const currentPath = parsePath(window.location.pathname).pathname;

    if (currentPath === "/auth/login" || currentPath === "/auth/register") {
      return;
    } else if (!token) {
      dispatch({ type: "user/logout" });
      navigate("/auth/logout");
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
        <Route path="/adoption-request" element={<LazyRequest />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/requests" element={<LazyPetAdoptionReqeuest />} />
        <Route path="/auth/logout" element={<LazyLogin />} />
        <Route path="/auth/login" element={<LazyLogin />} />
        <Route path="/auth/register" element={<LazyRegister />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
