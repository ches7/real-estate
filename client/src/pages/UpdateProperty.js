import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

export default function AddProperty() {
  const navigate = useNavigate();
  const params = useParams();


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

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(`/properties/${params.id}`);
      setTitle(response.data.title);
      setLocation(response.data.location);
      setDescription(response.data.description);
      setPrice(response.data.price);
      setBeds(response.data.beds);
      setBaths(response.data.baths);
      setReceptions(response.data.receptions);
      setType(response.data.type);
      setPhotos(response.data.photos);
      setSaleOrRent(response.data.saleOrRent);
    }
    fetchData();
  }, [params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //const property = { title, location, description, price, beds, baths, receptions, type, photos, saleOrRent, agent };
    const property = { title, location, description, price, beds, baths, receptions, type, saleOrRent };
    axios({
      data: property,
      method: 'patch',
      url: `http://localhost:8080/properties/${params.id}`,
      //headers: {'Content-Type': 'multipart/form-data'} // change when adding update photo functionality
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        navigate(`/properties/${res.data._id}`)
      })
      .catch(err => { console.log(err) })
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
          type="file"
          //required
          //value={photos}
          accept="image/*"
          onChange={(e) => setPhotos(e.target.files[0])}
        />

        <label htmlFor="type">Property type</label>
        <select name="type" id="type" className="bg-light border-0" onChange={(e) => setType(e.target.value)}>
          <option value="detached">Detached</option>
          <option value="terraced">Terraced</option>
          <option value="bungalow">Bungalow</option>
          <option value="park-home">Park home</option>
          <option value="semi-detached">Semi-detached</option>
          <option value="flat">Flat</option>
          <option value="farm-land">Farm/land</option>
        </select>

        <label htmlFor="saleOrRent">For sale or to rent</label>
        <select name="saleOrRent" id="saleOrRent" className="bg-light border-0" onChange={(e) => setSaleOrRent(e.target.value)}>
          <option value="for-sale">For sale</option>
          <option value="to-rent">To rent</option>
        </select>


        <button>Add Property</button>
      </form>
    </div>
  );
};