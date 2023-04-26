import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Property from "./pages/Property";
import UpdateProperty from "./pages/UpdateProperty";

import './styles/App.css';
import Home from './pages/Home';
import List from "./pages/List";
import NotFound from "./NotFound";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Account from "./pages/Account";

import axios from "axios";
import RegisterAsAgent from "./pages/RegisterAsAgent";
import AddProperty from "./pages/AddProperty";
import AgentPage from "./pages/AgentPage";
import AgentsList from "./pages/AgentsList";
import UpdateUserDetails from "./pages/UpdateUserDetails";
import ChangePassword from "./pages/ChangePassword";
import { useEffect } from "react";
import { AuthContext } from "./utils/AuthContext";
import { useContext } from "react";


axios.defaults.withCredentials = true;


function App() {

  const { dispatch } = useContext(AuthContext);

  let value_or_null = (document.cookie.match(/^(?:.*;)?\s*real_estate_app_ches_active\s*=\s*([^;]+)(?:.*)?$/) || [, null])[1]
  useEffect(() => {
    if (value_or_null !== 'true') {
      dispatch({ type: "SIGNOUT" });
    }
  }, [])


  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/for-sale" element={<Search />} />
          <Route path="/to-rent" element={<Search />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-as-agent" element={<RegisterAsAgent />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/update" element={<UpdateUserDetails />} />
          <Route path="/account/change-password" element={<ChangePassword />} />
          <Route path="/agents" element={<AgentsList />} />
          <Route path="/agents/:id" element={<AgentPage />} />
          <Route path="/for-sale/properties" element={<List />} />
          <Route path="/to-rent/properties" element={<List />} />
          <Route path="/properties/:id" element={<Property />} />
          <Route path="/properties/:id/update" element={<UpdateProperty />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
