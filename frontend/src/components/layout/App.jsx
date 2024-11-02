import SearchForm from "../SearchFrom";
import AddPet from "../AddPet";
import Details from "../Details";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <Link to={"/"}>
            <img src={"/logo.png"} className="App-logo" alt="logo" />
          </Link>
        </header>
      </div>
      <Routes>
        <Route path="/" element={<SearchForm />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/pets/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
