import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchForSale() {
    const navigate = useNavigate();
    const [location, setLocation] = useState('');
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
        <div id="page-container" className="d-flex justify-content-center">
        <div id="photo-container" className="position-absolute top-50 start-50 translate-middle d-flex justify-content-start h-75 w-75 border">
            <div id="search-container" className="border d-flex flex-column m-5 p-3">
                <form onSubmit={handleSearch}>
                    <h1>Properties for sale</h1>
                    <p>Search flats and houses for sale across the UK</p>
                    <div className="">
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

                    <div className="border py-3 d-flex">
                    <div className="position-relative top-0 start-0 w-50">
                    <label htmlFor="bedrooms">Bedrooms</label>
                    <br></br>
                    <select name="bedrooms" id="bedrooms" onChange={handleBeds}>
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

                    <div className="border d-flex justify-content-start w-50">
                    <div>
                    <label htmlFor="max-price">Max price</label>
                    <br></br>
                    <select name="max-price" id="max-price" onChange={handlePrice}>
                    <option value="">No max</option>
                    <option value="100000">£10,000</option>
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
                    </div>                    
                    </div>

                    <div className="">
                    <label className="">Property type</label>
                    <div className="d-flex">
                    <div className="w-50 border">
                    <input type="radio" id="all" name="type" value="" onChange={handleType}></input>
                    <label htmlFor="all" className="m-2">Show all</label>
                    </div>
                    <div className="w-50 d-flex border justify-content-start">
                    <div className="">
                    <input type="radio" id="house" name="type" value="house" onChange={handleType}></input>
                    <label htmlFor="house" className="m-2">Houses</label>
                    </div>
                    </div>
                    </div>
                    <input type="radio" id="flat" name="type" value="flat" onChange={handleType}></input>
                    <label htmlFor="flat" className="m-2">Flats</label>
                    </div>
                    
                    <div className="border">
                    <button type="submit" className="w-100">Search</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
};