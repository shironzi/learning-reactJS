import SearchForm from "../SearchFrom";
import AddPet from "../AddPet";
import Details from "../Details";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
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
