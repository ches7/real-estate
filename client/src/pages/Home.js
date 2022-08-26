import { Link } from "react-router-dom";
const Home = () => {
    return (
        <div>
            <h1>Real Estate</h1>
            <Link to='/properties'>view properties</Link>
        </div>
    );
};

export default Home;