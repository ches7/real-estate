import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
    } else {
        maxPrice = 
        <div className="border d-flex justify-content-start w-50">
        <div>
        <label htmlFor="max-price">Max price</label>
        <br></br>
        <select name="max-price" id="max-price" onChange={handlePrice}>
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
        // console.log(saleOrRent);
        if (saleOrRent === 'for-sale'){bannerSaleOrRent = 'for sale'} else {bannerSaleOrRent = 'to rent'}
        let banner;
        {banner = <div>
        <h1>Properties {bannerSaleOrRent}</h1>
                    <p>Search flats and houses {bannerSaleOrRent} across the UK</p>
                    </div>
    }
    
    return (
        <div id="page-container" className="d-flex justify-content-center">
        <div id="photo-container" className="position-absolute top-50 start-50 translate-middle d-flex justify-content-start h-75 w-75 border">
            <div id="search-container" className="border d-flex flex-column m-5 p-3">
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

                    {maxPrice}
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