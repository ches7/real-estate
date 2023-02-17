import { Link } from "react-router-dom";

export default function AgentsList() {

return(
    <div>
<div id='agent-card' className='border shadow-sm rounded m-3 p-2'>
              <div className='d-flex justify-content-start'>
                <div>
                  <h2>Agent</h2>
                  {/* <h2>Agent {data.agent}</h2> */}
                  <h3>view agent properties</h3>
                  {/* <h3><Link to={`/agents/${data.agent}`}>view agent properties</Link></h3> */}
                </div>
                <div>
                  <img src='https://st.zoocdn.com/zoopla_static_agent_logo_(262107).png' alt='agent logo' width="130" height="70"></img>
                </div>
              </div>
            </div>
            </div>
);
};