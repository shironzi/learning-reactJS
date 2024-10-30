import SearchForm from "./SearchFrom";
import AddPet from "./AddPet";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <button>
            <img src={"/logo.png"} className="App-logo" alt="logo" />
          </button>
        </header>
      </div>
      <Routes>
        <Route path="/" element={<SearchForm />} />
        <Route path="/add" element={<AddPet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
