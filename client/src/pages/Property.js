import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import NotFound from '../NotFound';
import Carousel from 'react-bootstrap/Carousel';
import SaveProperty from '../components/SaveProperty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faCouch } from "@fortawesome/free-solid-svg-icons";
import '../styles/Property.css';
import '../styles/index.css';
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
  const [agent, setAgent] = useState([]);
  const [agentError, setAgentError] = useState(null)

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(undefined);
  const [lat, setLat] = useState(undefined);
  const [zoom] = useState(12);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`/api/properties/${params.id}`)
        .then(res => { if (res.status !== 200) { throw Error('could not fetch the data for that resource') } else { setData(res.data); setPhotos(res.data.photos)} })
        .catch(err => { setError(err.message); setData(null) });
    }
    fetchData();
  }, [params.id]);

  let imageLink = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa';

  useEffect(() => {
    if (data === null) return;
    if (data.geometry === undefined) return;
    if (lng === data.geometry.coordinates[0]) return;
    setLng(data.geometry.coordinates[0]);
    setLat(data.geometry.coordinates[1]);
  }, [data])

  useEffect(() => {
    if (data === null) return;
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

  useEffect(() => {
    if (data === null) return;
    if (data.agent === undefined) return;
    const fetchData = async () => {
      await axios.get(`/api/agents/${data.agent}`)
        .then(res => { if (res.status !== 200) { throw Error('could not fetch the data for that resource') } else { setAgent(res.data); } })
        .catch(err => { setAgentError(err.message); setAgent(null) });
    }
    fetchData();
  }, [data]);

  if (error) {
    return (<NotFound />)
  } else
    return (
      <div>
        <div className='property-flex'>
          <div className='m-3'>
            <Carousel activeIndex={index} onSelect={handleSelect} interval={null} slide={false} className='property-carousel'>
            {photos.map((p, i) => (
                    <Carousel.Item key={i}>
                    <img
                    className="d-block" width={525} src={p}
                    /></Carousel.Item>
                ))}
            </Carousel>

            <div id='details'>
              <h1>£{data.price}</h1>
              <div className="d-flex">
        <FontAwesomeIcon icon={faBed} className="m-2"/>
        <p className="mt-1 me-2">{data.beds}</p>
        <FontAwesomeIcon icon={faBath} className="m-2"/>
        <p className="mt-1 me-2">{data.baths}</p>
        <FontAwesomeIcon icon={faCouch} className="m-2"/>
        <p className="mt-1 me-2">{data.receptions}</p>
        </div>
              <p>location: {data.location}</p>
              <p>{data.title}</p>              
              <p>{data.description}</p>
            </div>
            
          </div>
          <div>
            <div id='agent-card' className='border shadow-sm rounded m-3 p-2 agent-card-size'>
              <div className='property-agent-card-flex'>
                <div>
                  <h2>{agent.agentName || 'default agent'}</h2>
                  <p><Link to={`/agents/${data.agent}` || null}>view agent properties</Link></p>
                </div>
                <div>
                  <img src={agent.agentPhoto || imageLink} alt='agent logo' className='property-agent-photo'></img>
                </div>
              </div>
              <SaveProperty id={params.id}/>
            </div>
          </div>
        </div>
        <div>
<div ref={mapContainer} className="map-container" />
</div>
      </div>
    );
}

export default Property;