import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from 'react-router-dom'
import axios from "axios";
import PropertyCard from "../components/PropertyCard";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";

function List() {
    /***** DATA *****/
    const loc = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [location, setLocation] = useState(searchParams.get('location'));
    const [beds, setBeds] = useState(searchParams.get('beds'));
    const [price, setPrice] = useState(searchParams.get('price'));
    const [type, setType] = useState(searchParams.get('type'));
    const [radius, setRadius] = useState(searchParams.get('radius'));

    const [saleOrRent, setSaleOrRent] = useState(() => {
        if(loc.pathname === '/for-sale/properties' || '/for-sale/properties/'){
            return 'for-sale';
        }
            return 'to-rent';
        });

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`/api/properties?location=${searchParams.get('location')}&saleOrRent=${saleOrRent}&beds=${searchParams.get('beds')}&price=${searchParams.get('price')}&type=${searchParams.get('type')}&radius=${searchParams.get('radius')}`)
                .then(res => { if (res.status !== 200) { throw Error('could not fetch the data for that resource') } else { setData(res.data); console.log(res) } })
                .catch(err => { setError(err.message); setData(null); console.log(err) });
        }
        fetchData();
    }, [loc.key]);

    /***** PAGINATION *****/
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handleNext = () => {
        setCurrentPage(currentPage + 1);
        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };
    const handlePrev = () => {
        setCurrentPage(currentPage - 1);
        if ((currentPage - 1) % minPageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    /***** BANNER *****/
    let bannerSaleOrRent;
    if (saleOrRent === 'for-sale'){bannerSaleOrRent = 'for sale'} else {bannerSaleOrRent = 'to rent'}
    let banner;
    if (searchParams.get('location')) { banner = <h1>Property {bannerSaleOrRent} in {searchParams.get('location')}</h1> }

    return (
        <div>
            <Filters location={location} beds={beds} price={price} type={type} radius={radius} saleOrRent={saleOrRent}/>
            <div className="d-flex justify-content-center">
                {banner}
            </div>
            <div>
                {currentPosts.map((p, i) => (
                    <PropertyCard key={i} price={p.price} title={p.title} location={p.location} description={p.description} id={p._id}
                        beds={p.beds} baths={p.baths} receptions={p.receptions} type={p.type} photos={p.photos} />
                ))}
            </div>
            <Pagination postsPerPage={postsPerPage} totalPosts={data.length}
                paginate={paginate} pageNumberLimit={pageNumberLimit} currentPage={currentPage}
                maxPageNumberLimit={maxPageNumberLimit} minPageNumberLimit={minPageNumberLimit}
                handleNext={handleNext} handlePrev={handlePrev} />
        </div>
    );
};

export default List;