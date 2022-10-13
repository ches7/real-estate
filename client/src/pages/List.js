import { useContext, useState } from "react";
import { useLocation } from 'react-router-dom'
import Filters from "../components/Filters";
import PropertyCard from "../components/PropertyCard";
import useFetch from "../hooks/useFetch";
import Pagination from "../components/Pagination";
import { SearchContext } from "../utils/SearchContext";

function List() {
    //const loc = useLocation();
    //const [location, setLocation] = useState(loc.state.location);
    const { location } = useContext(SearchContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    // useEffect(() => {
    //     const fetchData = async () => {
    //     await axios.get(`http://localhost:8080/properties?location=${location}`)
    //       .then(res => {if (res.status !== 200){throw Error('could not fetch the data for that resource')} else { setData(res.data); }})
    //       .catch(err => {setError(err.message); setData(null)});
    //     } 
    //     fetchData();
    //   }, []);

    const { data, loading, error } = useFetch(
        `/properties?location=${location}`
    );

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handleNext = () => {
        setCurrentPage(currentPage + 1);
        if(currentPage + 1 > maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };
    const handlePrev = () => {
        setCurrentPage(currentPage - 1);
        if((currentPage - 1) % minPageNumberLimit === 0){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };


    return (
        <div>
            <Filters />
            <div className="d-flex justify-content-center">
                <h1>Property for sale in xyz</h1>
            </div>
            {/* <button><Link to={`/properties/create`}>Create new property</Link></button> */}
            <div>
                {currentPosts.map((p, i) => (
                    <PropertyCard key={i} price={p.price} title={p.title} location={p.location} description={p.description} id={p._id}
                        beds={p.beds} baths={p.baths} receptions={p.receptions} type={p.type} />
                    // <li key={i}><Link to={`/properties/${p._id}`}>{p.location}</Link></li>
                ))}
            </div>
            <Pagination postsPerPage={postsPerPage} totalPosts={data.length} 
            paginate={paginate} pageNumberLimit={pageNumberLimit} currentPage={currentPage}
            maxPageNumberLimit={maxPageNumberLimit} minPageNumberLimit={minPageNumberLimit}
            handleNext={handleNext} handlePrev={handlePrev}/>
        </div>
    );
};

export default List;