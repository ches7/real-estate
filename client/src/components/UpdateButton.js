import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faCouch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


const UpdateButton = (props) => {
  const navigate = useNavigate();


const handleUpdate = async (e) => {
    e.preventDefault()
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    navigate(`/properties/${props.id}/update`);
  }
    

    return (
      <div>
        <button onClick={handleUpdate} className="btn btn-warning">update</button>
        </div>
    )
};

export default UpdateButton;