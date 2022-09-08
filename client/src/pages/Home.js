import { Link } from "react-router-dom";
import './Home.css';

const Home = () => {
    return (
        <div className="background-image">
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
            <h1>We know what a home is really worth</h1>
            <h3 className="p-2">Find homes to buy or rent</h3>
            <div className="search-container">
                <form action="" className="bg-light p-3 rounded shadow-lg">
                    <button className="bg-light border-0"><Link to={`/for-sale`}>For sale</Link></button>
                    <button className="bg-light border-0"><Link to={`/to-rent`}>To rent</Link></button><br></br>
                    <div className="d-flex">
                    <input type="text" placeholder="Enter a location" name="search" className="flex-fill p-1 m-2"></input>
                    <button type="submit" className="bg-dark text-white rounded m-2 py-1 px-3 border-0">Search</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
};

export default Home;