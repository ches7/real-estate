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

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/properties" element={<List/>}/>
          <Route path="/properties/:id" element={<Property/>}/>
          <Route path="/properties/:id/edit" element={<Edit/>}/>
          <Route path="/properties/create" element={<Create/>}/>
        </Routes>
    </Router>
  );
}

export default App;
