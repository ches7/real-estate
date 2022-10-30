import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Delete from './Delete';
import NotFound from '../NotFound';
import Carousel from 'react-bootstrap/Carousel';
import SaveProperty from '../components/SaveProperty';


function Property() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const params = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`/properties/${params.id}`)
        .then(res => { if (res.status !== 200) { throw Error('could not fetch the data for that resource') } else { setData(res.data); setPhotos(res.data.photos)} })
        .catch(err => { setError(err.message); setData(null) });
    }
    fetchData();
  }, [params.id]);

  if (error) {
    return (<NotFound />)
  } else
    return (
      <div>
        <div className='d-flex justify-content-center mt-5'>
          <div className='m-3'>
            {/* <img src="https://images.unsplash.com/photo-1621983209359-456e234c892a" alt="House" width="824" height="550"></img> */}
            <Carousel activeIndex={index} onSelect={handleSelect} interval={null} slide={false}>
            {photos.map((p, i) => (
                    <Carousel.Item key={i}>
                    <img
                    className="d-block" width={525} src={p}
                    /></Carousel.Item>
                ))}
            </Carousel>

            <div id='details'>
              <h1>£{data.price}</h1>
              <p>title {data.title}</p>
              <p>location {data.location}</p>
            </div>
          </div>
          <div>
            <div id='agent-card' className='border shadow-sm rounded m-3 p-2'>
              <div className='d-flex justify-content-start'>
                <div>
                  <h2>Agent</h2>
                  <h3>view agent properties</h3>
                </div>
                <div>
                  <img src='https://st.zoocdn.com/zoopla_static_agent_logo_(262107).png' alt='agent logo' width="130" height="70"></img>
                </div>
              </div>
              <SaveProperty id={params.id}/>

            </div>
          </div>
        </div>
        {/* <button><Link to={`/properties/${params.id}/edit`}>edit</Link></button>
      <Delete/> */}
        <div>
          map
        </div>
      </div>
    );
}

export default Property;