import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Filters.css"

export default function Filters(props) {
    const navigate = useNavigate();
    const [location, setLocation] = useState(props.location);
    const [beds, setBeds] = useState(props.beds)
    const [price, setPrice] = useState(props.price)
    const [type, setType] = useState(props.type)
    const [radius, setRadius] = useState(props.radius);
    const [saleOrRent] = useState(props.saleOrRent);


    const handleBeds = (e) => {
        setBeds(e.target.value);
    };

    const handlePrice = (e) => {
        setPrice(e.target.value);
    };

    const handleType = (e) => {
        setType(e.target.value);
    };

    const handleRadius = (e) => {
        setRadius(e.target.value);
    };

    const handleSearch = async (e) => {
         e.preventDefault();
             navigate(`/${saleOrRent}/properties?location=${location}&price=${price}&type=${type}&beds=${beds}&radius=${radius}`);
         }

    let maxPrice;
    if(saleOrRent === 'for-sale'){
        maxPrice = 
        <div className="px-3 filteritemflex">
        <label htmlFor="price">Max price</label><br></br>
        <select name="price" id="price" className="bg-light border-0" value={price} onChange={handlePrice}>
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
    } else {
        maxPrice = 
        <div className="px-3 filteritemflex">
        <label htmlFor="price">Max price</label><br></br>
        <select name="price" id="price" className="bg-light border-0" value={price} onChange={handlePrice}>
        <option value="">No max</option>
        <option value="100">£100 pcm</option>
        <option value="250">£250 pcm</option>
        <option value="500">£500 pcm</option>
        <option value="750">£750 pcm</option>
        <option value="1000">£1000 pcm</option>
        <option value="1500">£1500 pcm</option>
        <option value="2000">£2000 pcm</option>
        <option value="2500">£2500 pcm</option>
        <option value="3000">£3000 pcm</option>
        </select>
        </div>
    }

    return (
        <div className="d-flex justify-content-center p-2 m-2">
                <form onSubmit={handleSearch} className="filterflex justify-content-center border rounded border-dark p-2">
                    <div className="px-3">
                    <label htmlFor="location" className="searchbarlabel">Search area</label><br></br>
                    <input 
                        className="searchbar"
                        type="text" 
                        id="location" 
                        placeholder="e.g. Oxford" 
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        ></input>
                    </div>

                    <div className="px-3 filteritemflex">
                    <label htmlFor="radius">Search radius</label><br></br>
                    <select name="radius" id="radius" className="bg-light border-0" onChange={handleRadius}>
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

                    <div className="px-3 filteritemflex">
                    <label htmlFor="beds">Bedrooms</label><br></br>
                    <select name="beds" id="beds" className="bg-light border-0" value={beds} onChange={handleBeds}>
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

                    {maxPrice}

                    <div className="px-3 filteritemflex">
                    <label htmlFor="type">Property type</label><br></br>
                    <select name="type" id="type" className="bg-light border-0" value={type} onChange={handleType}>
                    <option value="all">Show all</option>
                    <option value="house">Houses</option>
                    <option value="detached">Detached</option>
                    <option value="terraced">Terraced</option>
                    <option value="bungalow">Bungalow</option>
                    <option value="park-home">Park home</option>
                    <option value="semi-detached">Semi-detached</option>
                    <option value="flat">Flat</option>
                    <option value="farm-land">Farm/land</option>
                    </select>
                    </div>

                    <div className="align-self-center pt-2">
                    <button type="submit" className="bg-dark border-0 rounded text-white py-2 px-5 searchbutton">Search</button>
                    </div>
                </form>
            </div>
    );
};