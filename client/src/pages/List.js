import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import Filters from "../components/Filters";
import PropertyCard from "../components/PropertyCard";

    function List(){
        const [data, setData] = useState([]);
        const [error, setError] = useState(null);

        useEffect(() => {
            const fetchData = async () => {
            await axios.get('http://localhost:8080/properties')
              .then(res => {if (res.status !== 200){throw Error('could not fetch the data for that resource')} else { setData(res.data); }})
              .catch(err => {setError(err.message); setData(null)});
            } 
            fetchData();
          }, []);

        return (
            <div>
                <Filters/>
                <div className="d-flex justify-content-center">
                <h1>Property for sale in xyz</h1>
                </div>
                {/* <button><Link to={`/properties/create`}>Create new property</Link></button> */}
                 <div>
                    {data.map((p, i) => (
                        <PropertyCard key={i} price={p.price} title={p.title} location={p.location} description={p.description} id={p._id} />
                        // <li key={i}><Link to={`/properties/${p._id}`}>{p.location}</Link></li>
                    ))}
                </div> 
            </div>
        );
};

export default List;