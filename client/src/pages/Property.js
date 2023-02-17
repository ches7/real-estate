import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import NotFound from '../NotFound';
import Carousel from 'react-bootstrap/Carousel';
import SaveProperty from '../components/SaveProperty';
//import './Property.css';
import '../index.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_TOKEN}`;

function Property() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const params = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [photos, setPhotos] = useState([]);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(undefined);
  const [lat, setLat] = useState(undefined);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`/api/properties/${params.id}`)
        .then(res => { if (res.status !== 200) { throw Error('could not fetch the data for that resource') } else { setData(res.data); setPhotos(res.data.photos)} })
        .catch(err => { setError(err.message); setData(null) });
    }
    fetchData();
  }, [params.id]);

  let imageLink = 'https://st.zoocdn.com/zoopla_static_agent_logo_(262107).png';

  useEffect(() => {
    if (data.geometry === undefined) return;
    if (lng === data.geometry.coordinates[0]) return;
    setLng(data.geometry.coordinates[0]);
    setLat(data.geometry.coordinates[1]);
  }, [data])

  useEffect(() => {
    if (lng === undefined) return;
    if (lat === undefined) return;
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
  }, [lng]);


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
                  <h2>Agent {data.agent}</h2>
                  <h3><Link to={`/agents/${data.agent}`}>view agent properties</Link></h3>
                </div>
                <div>
                  <img src={imageLink} alt='agent logo' width="130" height="70"></img>
                </div>
              </div>
              <SaveProperty id={params.id}/>

            </div>
          </div>
        </div>
        {/* <button><Link to={`/properties/${params.id}/edit`}>edit</Link></button>
      <Delete/> */}
        <div>
<div ref={mapContainer} className="map-container" />
</div>
      </div>
    );
}

export default Property;