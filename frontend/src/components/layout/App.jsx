import SearchForm from "../SearchFrom";
import AddPet from "../AddPet";
import Details from "../Details";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header";
import Login from "../Login";
import Register from "../Register";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<SearchForm />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/pets/:id" element={<Details />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
