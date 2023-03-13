import React, { useState, useEffect } from 'react';
import axios from "axios";
import NotFound from '../NotFound';
import PropertyCard from '../components/PropertyCard';
import { useParams } from 'react-router-dom';


export default function AgentPage() {
  const params = useParams();

  const [agentData, setAgentData] = useState([]);
  const [agentError, setAgentError] = useState(null);
  const [properties, setProperties] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`/api/agents/${params.id}`)
        .then(res => { if (res.status !== 200) { throw Error('could not fetch the data for that resource') } else { setAgentData(res.data); } })
        .catch(err => { setAgentError(err.message); setAgentData(null) });
    }
    fetchData();
  }, [params.id]);

  useEffect(() => {
    const fetchPropertyData = async () => {
      await axios.get(`/api/properties?agent=${params.id}`)
        .then(res => {
          if (res.status !== 200) { throw Error('could not fetch the data for that resource') }
          // else { setProperties(oldArray => [...oldArray, res.data]) }
          else { setProperties(res.data) }
        })
        .catch(err => { setAgentError(err.message); setProperties(null) });
    }
    fetchPropertyData();
  }, [agentData])

  if (agentError) {
    return (<NotFound />);
  }
  if (properties.length === 0) {
    return (<div>
      <div className='d-flex justify-content-center p-3'>
        <h1>No properties for {agentData.agentName}</h1>
      </div>
    </div>);
  }
  else
    return (
      <div>
        <div className='d-flex justify-content-center p-3'>
          <h1>{agentData.agentName} properties</h1>
        </div>
        <div>
          {properties.map((p, i) => (
            <PropertyCard key={i} price={p.price} title={p.title} location={p.location} description={p.description} id={p._id}
              beds={p.beds} baths={p.baths} receptions={p.receptions} type={p.type} photos={p.photos} />
          ))}
        </div>
      </div>
    );
};