import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFound from "../NotFound";
import "../styles/AgentsList.css"

export default function AgentsList() {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`/api/agents`)
        .then(res => { if (res.status !== 200) { throw Error('could not fetch the data for that resource') } else { setData(res.data); } })
        .catch(err => { setError(err.message); setData(null) });
    }
    fetchData();
  }, []);

  if (error) return <NotFound />
  return (
    <div className="d-flex justify-content-center">
      <div className="mt-3">
        <h1 className="text-center mb-3">Agents</h1>

        {

          data.map((a, i) => (

            <div id='agent-card' className='border shadow-sm rounded p-2 w-100 mb-2' key={i}>
              <div className='agentsflex' >
                <div className="agents-name-link">
                  <h2>{a.agentName}</h2>
                  <p><Link to={`/agents/${a.id}`}>view agent properties</Link></p>
                </div>
                {/* <div className="ms-auto mx-2"> */}
                <div className="agents-photo-container">
                  <img src={a.agentPhoto || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa'} alt='agent logo'
                  className="agents-photo-size"
                  ></img>
                </div>
              </div>
            </div>

          ))}
      </div>

    </div>
  );
};