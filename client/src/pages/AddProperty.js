import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import { useContext } from "react";

export default function AddProperty() {
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [receptions, setReceptions] = useState('');
  const [type, setType] = useState('detached');
  const [photos, setPhotos] = useState('');
  const [saleOrRent, setSaleOrRent] = useState('for-sale');
  const [agent, setAgent] = useState(`${user._id}`);

  const handleType = (e) => {
    setType(e.target.value);
  }

  const handleSaleOrRent = (e) => {
    setSaleOrRent(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = '';
    const property = { title, location, description, price, beds, baths, receptions, type, photos, saleOrRent, agent };
    axios({
        data: property,
        method: 'post',
        url: '/properties',
    })
    .then(res => {
        id = res.data._id;
        navigate(`/properties/${id}`);
    })
    .catch(err => {console.log(err)})

  }

  return (
    <div className="create">
      <h2>Add a New Property</h2>
      <form onSubmit={handleSubmit}>
        <label>Property title:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <label>Property location:</label>
        <input 
          type="text" 
          required 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

<label>Price:</label>
        <input 
          type="number" 
          required 
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label>Property description:</label>
        <input 
          type="text" 
          required 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

<label>Number of beds:</label>
        <input 
          type="number" 
          required 
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
        />

        <label>Number of bathrooms:</label>
        <input 
          type="number" 
          required 
          value={baths}
          onChange={(e) => setBaths(e.target.value)}
        />

<label>Number of receptions:</label>
        <input 
          type="number" 
          required 
          value={receptions}
          onChange={(e) => setReceptions(e.target.value)}
        />
                  
                  <label>Photos URL:</label>
        <input 
          type="string" 
          required 
          value={photos}
          onChange={(e) => setPhotos(e.target.value)}
        />

<label htmlFor="type">Property type</label>
                    <select name="type" id="type" className="bg-light border-0" onChange={handleType}>
                    <option value="detached">Detached</option>
                    <option value="terraced">Terraced</option>
                    <option value="bungalow">Bungalow</option>
                    <option value="park-home">Park home</option>
                    <option value="semi-detached">Semi-detached</option>
                    <option value="flat">Flat</option>
                    <option value="farm-land">Farm/land</option>
                    </select>

                    <label htmlFor="saleOrRent">For sale or to rent</label>
                    <select name="saleOrRent" id="saleOrRent" className="bg-light border-0" onChange={handleSaleOrRent}>
                    <option value="for-sale">For sale</option>
                    <option value="to-rent">To rent</option>
                    </select>
          

        <button>Add Property</button>
      </form>
    </div>
  );
};