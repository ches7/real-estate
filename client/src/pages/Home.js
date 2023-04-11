import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/index.css';
import '../styles/Home.css';

export default function Home() {
    const navigate = useNavigate();
    const [location, setLocation] = useState('');
    const [saleOrRent, setSaleOrRent] = useState('for-sale');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (saleOrRent === 'for-sale'){
            navigate(`/for-sale/properties?location=${location}`)
        } else {
            navigate(`/to-rent/properties?location=${location}`)
        }
    };

    const handleRadioChange = (e) => {
        setSaleOrRent(e.target.value);
      };


    return (
        <div className="home-image d-flex justify-content-center align-items-center">
        <div className="text-center text-white">
            <h1 className="mx-3 home-title">We know what a home is really worth</h1>
            <h3 className="p-2 mx-3 home-subtitle">Find homes to buy or rent</h3>
            <div>
                <form onSubmit={handleSearch} className="bg-light p-3 rounded shadow-lg mx-2">

                    <div className="d-flex justify-content-center">
                    <input 
                        type="radio" 
                        className="btn-check" 
                        name="sale-rent" 
                        id="for-sale" 
                        autoComplete="off" 
                        value="for-sale"
                        onChange={handleRadioChange}
                        defaultChecked
                        ></input>
                    <label className="btn btn-outline-dark mx-1" htmlFor="for-sale">For sale</label>

                    <input 
                        type="radio" 
                        className="btn-check" 
                        name="sale-rent" 
                        id="to-rent" 
                        autoComplete="off"
                        value="to-rent"
                        onChange={handleRadioChange}
                        ></input>
                    <label className="btn btn-outline-dark mx-1" htmlFor="to-rent">To Rent</label>
                    </div>

                    <div className="home-search-flex">
                    <input 
                        type="text" 
                        placeholder="Enter a location" 
                        name="search" 
                        className="home-search-bar p-1 m-2"
                        onChange={(e) => setLocation(e.target.value)}
                        ></input>
                    <button type="submit" className="bg-dark text-white rounded m-2 py-1 px-3 border-0 home-search-button">Search</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
};