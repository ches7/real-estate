import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FiltersSale(props) {
    const navigate = useNavigate();
    const [location, setLocation] = useState(props.location);
    const [beds, setBeds] = useState('')
    const [price, setPrice] = useState('')
    const [type, setType] = useState('')


    const handleBeds = (e) => {
        setBeds(e.target.value);
    };

    const handlePrice = (e) => {
        setPrice(e.target.value);
    };

    const handleType = (e) => {
        setType(e.target.value);
    };

     const handleSearch = async (e) => {
         e.preventDefault();
             navigate(`/for-sale/properties?location=${location}&price=${price}&type=${type}&beds=${beds}`);
         }
    
    return (
        <div className="search-container d-flex justify-content-center p-2 m-2">
                <form onSubmit={handleSearch} className="d-inline-flex justify-content-center border rounded border-dark p-2">
                    <div className="px-3">
                    <label htmlFor="location">Search area</label><br></br>
                    <input 
                        type="text" 
                        id="location" 
                        placeholder="e.g. Oxford" 
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        ></input>
                    </div>

                    <div className="px-3">
                    <label htmlFor="radius">Search radius</label><br></br>
                    <select name="radius" id="radius" className="bg-light border-0">
                    <option value="only">This area only</option>
                    <option value="0.25">+0.25 miles</option>
                    <option value="0.5">+0.5 miles</option>
                    <option value="1">+1 miles</option>
                    <option value="3">+3 miles</option>
                    <option value="5">+5 miles</option>
                    <option value="10">+10 miles</option>
                    <option value="15">+15 miles</option>
                    <option value="20">+20 miles</option>
                    <option value="30">+30 miles</option>
                    <option value="40">+40 miles</option>                    
                    </select>
                    </div>

                    <div className="px-3">
                    <label htmlFor="bedrooms">Bedrooms</label><br></br>
                    <select name="bedrooms" id="bedrooms" className="bg-light border-0" onChange={handleBeds}>
                    <option value="">Any beds</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                    <option value="6">6+</option>
                    <option value="7">7+</option>
                    <option value="8">8+</option>
                    <option value="9">9+</option>
                    <option value="10">10+</option>
                    </select>
                    </div>

                    <div className="px-3">
                    <label htmlFor="max-price">Max price</label><br></br>
                    <select name="max-price" id="max-price" className="bg-light border-0" onChange={handlePrice}>
                    <option value="">No max</option>
                    <option value="10000">£10,000</option>
                    <option value="50000">£50,000</option>
                    <option value="100000">£100,000</option>
                    <option value="250000">£250,000</option>
                    <option value="500000">£500,000</option>
                    <option value="750000">£750,000</option>
                    <option value="1000000">£1,000,000</option>
                    <option value="5000000">£5,000,000</option>
                    <option value="10000000">£10,000,000</option>
                    </select>
                    </div>

                    <div className="px-3">
                    <label htmlFor="type">Property type</label><br></br>
                    <select name="type" id="type" className="bg-light border-0" onChange={handleType}>
                    <option value="">Show all</option>
                    <option value="detached">Detached</option>
                    <option value="terraced">Terraced</option>
                    <option value="bungalow">Bungalow</option>
                    <option value="park-home">Park home</option>
                    <option value="semi-detached">Semi-detached</option>
                    <option value="flat">Flat</option>
                    <option value="farm-land">Farm/land</option>
                    </select>
                    </div>

                    <div className="align-self-center px-3">
                    <button type="submit" className="bg-dark border-0 rounded text-white py-2 px-5">Search</button>
                    </div>
                </form>
            </div>
    );
};