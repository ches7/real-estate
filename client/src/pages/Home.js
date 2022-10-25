import './Home.css';
import { useContext, useState } from "react";
import { SearchContext } from "../utils/SearchContext";
import { useNavigate } from "react-router-dom";


export default function Home() {
    const navigate = useNavigate();
    const { dispatch } = useContext(SearchContext);
    const [location, setLocation] = useState('');
    const [saleOrRent, setSaleOrRent] = useState('for-sale');

    const handleSearch = async (e) => {
        e.preventDefault();
        dispatch({ type:"NEW_SEARCH", payload: { location, saleOrRent } });
        if (saleOrRent === 'for-sale'){
            navigate("/for-sale/properties", { state: { location, saleOrRent }})
        } else {
            navigate("/to-rent/properties", { state: { location, saleOrRent }})
        }
    };

    const handleRadioChange = (e) => {
        setSaleOrRent(e.target.value);
      };


    return (
        <div className="background-image">
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
            <h1>We know what a home is really worth</h1>
            <h3 className="p-2">Find homes to buy or rent</h3>
            <div className="search-container">
                <form onSubmit={handleSearch} className="bg-light p-3 rounded shadow-lg">

                    <div className="d-flex justify-content-center">
                    <input 
                        type="radio" 
                        className="btn-check" 
                        name="sale-rent" 
                        id="for-sale" 
                        autoComplete="off" 
                        value="for-sale"
                        onChange={handleRadioChange}
                        checked
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

                    <div className="d-flex">
                    <input 
                        type="text" 
                        placeholder="Enter a location" 
                        name="search" 
                        className="flex-fill p-1 m-2"
                        onChange={(e) => setLocation(e.target.value)}
                        ></input>
                    <button type="submit" className="bg-dark text-white rounded m-2 py-1 px-3 border-0">Search</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
};