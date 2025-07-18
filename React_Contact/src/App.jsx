import { useState } from "react";

import "./App.css";
import Signup from "./components/Signup";
import { Route, Routes } from "react-router-dom";
import Login1 from "./components/Login1";
import AllContact from "./components/AllContact";
import AddNewContact from "./components/AddNewContact";
import EditContact from "./components/EditContact";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Login1 />} />
      <Route path="/allcontact" element={<AllContact />} />
      <Route path="/addnewcontact" element={<AddNewContact />} />
      <Route path="/edit" element={<EditContact />} />
    </Routes>
  );
}

export default App;
