import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Delete() {

    const navigate = useNavigate();
    const params = useParams();

    const handleClick = (e) => {
        e.preventDefault();
        axios({
            method: 'delete',
            url: `/properties/${params.id}`,
        }).then(navigate('/properties'));

    }

    return (
        <div className="delete">
            <button onClick={handleClick}>Delete</button>
        </div>
    );
}

export default Delete;