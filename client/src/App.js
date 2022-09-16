import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Property from "./pages/Property";
import Edit from "./pages/Edit";
import Create from "./pages/Create";

import './App.css';
import Home from './pages/Home';
import List from "./pages/List";
import NotFound from "./NotFound";
import Navbar from "./components/Navbar";
import ForSale from "./pages/ForSale";
import ToRent from "./pages/ToRent";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import { UserContext } from "./utils/UserContext";
import { useState, useMemo } from "react";

import axios from "axios";
axios.defaults.withCredentials = true;

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null
};

function App() {

  const [user, setUser] = useState(INITIAL_STATE);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <>
    <Router>
    <UserContext.Provider value={value}>
    <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/for-sale" element={<ForSale/>}/>
          <Route path="/to-rent" element={<ToRent/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/properties" element={<List/>}/>
          <Route path="/properties/:id" element={<Property/>}/>
          <Route path="/properties/:id/edit" element={<Edit/>}/>
          <Route path="/properties/create" element={<Create/>}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
        </UserContext.Provider>
    </Router>
    </>
  );
}

export default App;
