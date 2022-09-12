import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from 'react-router-dom'
import Filters from "../components/Filters";
import PropertyCard from "../components/PropertyCard";
import useFetch from "../hooks/useFetch";

    function List(){
        const loc = useLocation();
        const [location, setLocation] = useState(new URLSearchParams(loc.search).get('location'));

        // useEffect(() => {
        //     const fetchData = async () => {
        //     await axios.get(`http://localhost:8080/properties?location=${location}`)
        //       .then(res => {if (res.status !== 200){throw Error('could not fetch the data for that resource')} else { setData(res.data); }})
        //       .catch(err => {setError(err.message); setData(null)});
        //     } 
        //     fetchData();
        //   }, []);

        const { data, loading, error } = useFetch(
            `http://localhost:8080/properties?location=${location}`
          );

        return (
            <div>
                <Filters/>
                <div className="d-flex justify-content-center">
                <h1>Property for sale in xyz</h1>
                </div>
                {/* <button><Link to={`/properties/create`}>Create new property</Link></button> */}
                 <div>
                    {data.map((p, i) => (
                        <PropertyCard key={i} price={p.price} title={p.title} location={p.location} description={p.description} id={p._id} 
                        beds={p.beds} baths={p.baths} receptions={p.receptions} type={p.type}/>
                        // <li key={i}><Link to={`/properties/${p._id}`}>{p.location}</Link></li>
                    ))}
                </div> 
            </div>
        );
};

export default List;