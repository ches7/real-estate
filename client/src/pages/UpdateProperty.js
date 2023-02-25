import { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import Flash from "../components/Flash";

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
  const [agent, setAgent] = useState('');
  const [active, setActive] = useState(false);
  const [typeFlash, setTypeFlash] = useState("default");
  const [width, setWidth] = useState("default");
  const [position, setPosition] = useState("default");
  const [timer, setTimer] = useState(2000);
  const message = useRef("");

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(`/api/properties/${params.id}`);
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
      setAgent(response.data.agent);
    }
    fetchData();
  }, [params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const property = { title, location, description, price, beds, baths, receptions, type, saleOrRent, agent, photos };
    axios({
      data: property,
      method: 'patch',
      url: `/api/properties/${params.id}`,
      headers: {'Content-Type': 'multipart/form-data'} // change when adding update photo functionality
      // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      //headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {        
      message.current = 'Property updated';
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
  };

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
          required
          multiple
          name="photos"
          //value={photos}
          accept="image/*"
          onChange={handlePhotos}
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