import { Link } from "react-router-dom"

const ServerError = () => {
  return (
    <div className="not-found">
      <h1>500</h1>
      <h2>Woops!</h2>
      <p>Something went wrong</p>
      <Link to="/">Back to the homepage...</Link>
    </div>
  );
}
 
export default ServerError;