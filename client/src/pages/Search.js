import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../styles/Search.css';
import '../styles/index.css';

export default function Search() {
    const navigate = useNavigate();
    const loc = useLocation();
    const [location, setLocation] = useState('');
    const [beds, setBeds] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');

    let saleOrRent;
    if(loc.pathname === '/for-sale' || loc.pathname === '/for-sale/'){
        saleOrRent = 'for-sale';
    } else {
        saleOrRent = 'to-rent';
    };

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
             navigate(`/${saleOrRent}/properties?location=${location}&price=${price}&type=${type}&beds=${beds}`);
         }

    let maxPrice;
    if(saleOrRent === 'for-sale'){
        maxPrice = 
        <div className="d-flex justify-content-start w-50">
        <div>
        <label htmlFor="max-price">Max price</label>
        <br></br>
        <select name="max-price" id="max-price" onChange={handlePrice} className="bg-light border-0">
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
    } else {
        maxPrice = 
        <div className="d-flex justify-content-start w-50">
        <div>
        <label htmlFor="max-price">Max price</label>
        <br></br>
        <select name="max-price" id="max-price" onChange={handlePrice} className="bg-light border-0">
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
        </div>                    
    }

        /***** BANNER *****/
        let bannerSaleOrRent;
        if (saleOrRent === 'for-sale'){bannerSaleOrRent = 'for sale'} else {bannerSaleOrRent = 'to rent'}
        let banner;
        {banner = <div>
        <h1>Properties {bannerSaleOrRent}</h1>
                    <p>Search flats and houses {bannerSaleOrRent} across the UK</p>
                    </div>
    }
    
    return (
        <div id="page-container" className="d-flex justify-content-center">
        <div id="photo-container" className="search-image mt-5 mx-3 rounded">
            <div id="search-container" className="bg-white d-flex flex-column m-5 p-3 rounded search-container">
                <form onSubmit={handleSearch}>
                    {banner}
                    <div className="">
                    <label htmlFor="location">Search area</label><br></br>
                    <input 
                        type="text" 
                        id="location" 
                        placeholder="e.g. Oxford" 
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-100"
                        ></input>
                    </div>

                    

                    <div className="py-3 d-flex w-100">
                    <div className="position-relative top-0 start-0 w-50">
                    <label htmlFor="bedrooms">Bedrooms</label>
                    <br></br>
                    <select name="bedrooms" id="bedrooms" onChange={handleBeds} className="bg-light border-0">
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
                    </div>



                    <div className="w-100">
                    <label className="">Property type</label>
                    <div className="d-flex">
                    <div className="w-50">
                    <input type="radio" id="all" name="type" value="" onChange={handleType} defaultChecked></input>
                    <label htmlFor="all" className="m-2">Show all</label>
                    </div>
                    <div className="w-50 d-flex justify-content-start">
                    <div className="">
                    <input type="radio" id="house" name="type" value="house" onChange={handleType}></input>
                    <label htmlFor="house" className="m-2">Houses</label>
                    </div>
                    </div>
                    </div>
                    <input type="radio" id="flat" name="type" value="flat" onChange={handleType}></input>
                    <label htmlFor="flat" className="m-2">Flats</label>
                    </div>
                    
                    <div className="">
                    <button type="submit" className="w-100 btn btn-dark">Search</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
};