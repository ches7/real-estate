import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = '';
    const property = { title, location, description };
    axios({
        data: property,
        method: 'post',
        url: 'http://localhost:8080/properties',
    })
    .then(res => {
        id = res.data._id;
        navigate(`/properties/${id}`);
    })

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

        <label>Property description:</label>
        <input 
          type="text" 
          required 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add Property</button>
      </form>
    </div>
  );
}
 
export default Create;