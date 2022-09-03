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

function App() {
  return (
    <>
    <Router>
    <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/properties" element={<List/>}/>
          <Route path="/properties/:id" element={<Property/>}/>
          <Route path="/properties/:id/edit" element={<Edit/>}/>
          <Route path="/properties/create" element={<Create/>}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
    </Router>
    </>
  );
}

export default App;
