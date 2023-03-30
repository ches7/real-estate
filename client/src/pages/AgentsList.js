import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFound from "../NotFound";

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

  console.log(data);
  if (error) return <NotFound/>
return(
    <div className="d-flex justify-content-center">
      <div className="w-25">
      <h1 className="text-center">Agents</h1>

          {

        data.map((a, i) => (
          
                <div id='agent-card' className='border shadow-sm rounded m-3 p-2' key={i}>
              <div className='d-flex justify-content-start' >
                <div>
                  <h2>{a.agentName}</h2>
                  <p><Link to={`/agents/${a.id}`}>view agent properties</Link></p>
                </div>
                <div className="ms-auto mx-2">
                  <img src={a.agentPhoto || 'https://st.zoocdn.com/zoopla_static_agent_logo_(262107).png'} alt='agent logo' width="130" height="70"></img>
                </div>
              </div>
            </div>

            ))}
        </div>

            </div>
);
};