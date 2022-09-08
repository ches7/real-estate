const ToRent = () => {
    return (
        <div id="photo-container">
            <div className="search-container">
                <form action="">
                    <h1>Properties for sale</h1>
                    <p>Search houses and flats to rent across the UK</p>
                    <label htmlFor="search-area">Search area</label>
                    <input type="text" id="search-area" placeholder="e.g. Oxford" name="search-area"></input>

                    <label htmlFor="bedrooms">Bedrooms</label>
                    <select name="bedrooms" id="bedrooms">
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

                    <label htmlFor="max-price">Max price</label>
                    <select name="max-price" id="max-price">
                    <option value="no">No max</option>
                    <option value="10000">£100 pcm</option>
                    <option value="10000">£250 pcm</option>
                    <option value="10000">£500 pcm</option>
                    <option value="10000">£750 pcm</option>
                    <option value="10000">£1,000 pcm</option>
                    <option value="10000">£2,500 pcm</option>
                    <option value="10000">£5,000 pcm</option>
                    <option value="10000">£10,000 pcm</option>
                    </select>

                    <p>Property type</p>
                    <input type="radio" id="all" name="property-type" value="all"></input>
                    <label htmlFor="all">Show all</label>
                    <input type="radio" id="flats" name="property-type" value="flats"></input>
                    <label htmlFor="flats">Flats</label>
                    <input type="radio" id="houses" name="property-type" value="houses"></input>
                    <label htmlFor="houses">Houses</label>


                    <button type="submit">Search</button>
                </form>
            </div>
        </div>
    );
};

export default ToRent;