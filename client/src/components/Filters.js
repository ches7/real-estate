const Filters = () => {
    return (
        <div className="search-container d-flex justify-content-center p-2 m-2">
                <form action="" className="d-inline-flex justify-content-center border rounded border-dark p-2">
                    <div className="px-3">
                    <label htmlFor="search-area">Search area</label><br></br>
                    <input type="text" id="search-area" placeholder="e.g. Oxford" name="search-area"></input>
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
                    <select name="bedrooms" id="bedrooms" className="bg-light border-0">
                    <option value="any">Any beds</option>
                    <option value="studio">Studio+</option>
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
                    <select name="max-price" id="max-price" className="bg-light border-0">
                    <option value="no">No max</option>
                    <option value="10000">£10,000</option>
                    <option value="10000">£50,000</option>
                    <option value="10000">£100,000</option>
                    <option value="10000">£250,000</option>
                    <option value="10000">£500,000</option>
                    <option value="10000">£750,000</option>
                    <option value="10000">£1,000,000</option>
                    <option value="10000">£5,000,000</option>
                    <option value="10000">£10,000,000</option>
                    </select>
                    </div>

                    <div className="px-3">
                    <label htmlFor="property-type">Property type</label><br></br>
                    <select name="property-type" id="property-type" className="bg-light border-0">
                    <option value="all">Show all</option>
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

export default Filters;