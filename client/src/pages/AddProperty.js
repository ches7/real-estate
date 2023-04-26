import { useState, useContext, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import Flash from "../components/Flash";

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
  const [photos, setPhotos] = useState([]);
  const [saleOrRent, setSaleOrRent] = useState('for-sale');
  const [agent] = useState(`${user.id}`);
  const [active, setActive] = useState(false);
  const [typeFlash, setTypeFlash] = useState("default");
  const [timer] = useState(2000);
  const message = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const property = { title, location, description, price, beds, baths, receptions, type, photos, saleOrRent, agent };
    console.log(property)
    axios({
      data: property,
      method: 'post',
      url: '/api/properties',
      headers: {'Content-Type': 'multipart/form-data'}
    })
      .then(res => {
        message.current = 'Property added';
        setTypeFlash('success');
        handleShowFlash();
        setTimeout(() => {navigate(`/properties/${res.data._id}`);}, 2000);
      })
      .catch(err => { 
        console.log(err)
        message.current = 'Something went wrong!'
        setTypeFlash('error');
        handleShowFlash();
       })
  }

  const handlePhotos = (e) => {
    let photosArray = [];
    for(let i = 0; i < e.target.files.length; i++){
      photosArray.push(e.target.files[i])
    }
    setPhotos(photosArray)
    console.log(photosArray)
  }

  const hideFlash = () => {
    setActive(false);
};

const handleShowFlash = () => {
    hideFlash();
    if (message) {
        setActive(true);
        window.setTimeout(hideFlash, timer);
    }
};

  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex flex-column">
      <h2 className="mt-3 mx-1">Add a New Property</h2>
      <form onSubmit={handleSubmit} className='d-flex flex-column mx-1'>
        <label>Property title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-3 w-100"
        />

        <label>Property location:</label>
        <input
          type="text"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mb-3 w-100"
        />

        <label>Price:</label>
        <input
          type="number"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mb-3 w-100"
        />

        <label>Property description:</label>
        <input
          type="text"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-3 w-100"
        />

        <label>Number of beds:</label>
        <input
          type="number"
          required
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
          className="mb-3 w-100"
        />

        <label>Number of bathrooms:</label>
        <input
          type="number"
          required
          value={baths}
          onChange={(e) => setBaths(e.target.value)}
          className="mb-3 w-100"
        />

        <label>Number of receptions:</label>
        <input
          type="number"
          required
          value={receptions}
          onChange={(e) => setReceptions(e.target.value)}
          className="mb-3 w-100"
        />

        <label>Photos</label>
        <input
          type="file"
          required
          multiple
          name="photos"
          accept="image/*"
          onChange={handlePhotos}
          className="mb-3 w-100"
        />

        <label htmlFor="type">Property type</label>
        <select name="type" id="type" className="bg-light border-0 mb-3 w-100" onChange={(e) => setType(e.target.value)}>
          <option value="detached">Detached</option>
          <option value="terraced">Terraced</option>
          <option value="bungalow">Bungalow</option>
          <option value="park-home">Park home</option>
          <option value="semi-detached">Semi-detached</option>
          <option value="flat">Flat</option>
          <option value="farm-land">Farm/land</option>
        </select>

        <label htmlFor="saleOrRent">For sale or to rent</label>
        <select name="saleOrRent" id="saleOrRent" className="bg-light border-0 mb-3 w-100" onChange={(e) => setSaleOrRent(e.target.value)}>
          <option value="for-sale">For sale</option>
          <option value="to-rent">To rent</option>
        </select>


        <button className="btn btn-dark w-100">Add Property</button>
      </form>
      </div>
      {active && (
                    <Flash
                        type={typeFlash}
                        message={message.current}
                        duration={3000}
                        active={active}
                        setActive={setActive}
                        position={"bcenter"}
                        width={"default"}
                    />
                )}
    </div>
  );
};