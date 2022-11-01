import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Property from "./pages/Property";
import Edit from "./pages/Edit";

import './App.css';
import Home from './pages/Home';
import ListRent from "./pages/ListRent";
import ListSale from "./pages/ListSale";
import NotFound from "./NotFound";
import Navbar from "./components/Navbar";
import SearchForSale from "./pages/SearchForSale";
import SearchToRent from "./pages/SearchToRent";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Account from "./pages/Account";

import axios from "axios";
import RegisterAsAgent from "./pages/RegisterAsAgent";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "./utils/AuthContext"
import AddProperty from "./pages/AddProperty";
import AgentPage from "./pages/AgentPage";

axios.defaults.withCredentials = true;

function App() {

  const { loading, error, dispatch } = useContext(AuthContext);

  const refreshPage = ()=>{
    window.location.reload();  }

  

  // useEffect(() => {
  //   dispatch({ type: "SIGNOUT" });
  // }, [window.onbeforeunload]);


  //deleting user from localstorage when changing page
  // window.onbeforeunload = function(){
  //   dispatch({ type: "SIGNOUT" });
  // };

  return (
    <>
    <Router>
    <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/for-sale" element={<SearchForSale/>}/>
          <Route path="/to-rent" element={<SearchToRent/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/register-as-agent" element={<RegisterAsAgent/>}/>
          <Route path="/account" element={<Account/>}/>
          <Route path="/agents/:id" element={<AgentPage/>}/>
          <Route path="/for-sale/properties" element={<ListSale/>}/>
          <Route path="/to-rent/properties" element={<ListRent/>}/>
          <Route path="/properties/:id" element={<Property/>}/>
          <Route path="/properties/:id/edit" element={<Edit/>}/>
          <Route path="/add-property" element={<AddProperty/>}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
    </Router>
    </>
  );
}

export default App;
