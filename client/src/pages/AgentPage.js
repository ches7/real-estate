import React, { useState, useEffect } from 'react';
import axios from "axios";
import NotFound from '../NotFound';
import PropertyCard from '../components/PropertyCard';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';


export default function AgentPage() {
  const navigate = useNavigate();
  const params = useParams();

  const [agentData, setAgentData] = useState([]);
  const [agentError, setAgentError] = useState(null);
  const [properties, setProperties] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`/agents/${params.id}`)
        .then(res => { if (res.status !== 200) { throw Error('could not fetch the data for that resource') } else { setAgentData(res.data); } })
        .catch(err => { setAgentError(err.message); setAgentData(null) });
    }
    fetchData();
  }, [params.id]);

  useEffect(() => {
        const fetchPropertyData = async () => {
          await axios.get(`/properties?agent=${params.id}`)
            .then(res => {
              if (res.status !== 200) { throw Error('could not fetch the data for that resource') }
             // else { setProperties(oldArray => [...oldArray, res.data]) }
             else { setProperties(res.data) }
            })
            .catch(err => { setAgentError(err.message); setProperties(null) });
        }
        fetchPropertyData();
  }, [agentData])

  //console.log(agentData)
  if (agentError) {
    return (<NotFound />)
  } else
    return (
      <div>
        <h1>Agent properties</h1>

        <div>
          {properties.map((p, i) => (
            <PropertyCard key={i} price={p.price} title={p.title} location={p.location} description={p.description} id={p._id}
              beds={p.beds} baths={p.baths} receptions={p.receptions} type={p.type} photos={p.photos}/>
          ))}
        </div>
      </div>


    );
};