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
    <div className="mb-1 me-1">
      <button onClick={handleUpdate} className="btn btn-warning">update</button>
    </div>
  )
};

export default UpdateButton;