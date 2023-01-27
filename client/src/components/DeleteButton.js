import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faCouch } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { AuthContext } from "../utils/AuthContext";
import { useContext } from "react";

const DeleteButton = (props) => {

const { user, loading, error, dispatch } = useContext(AuthContext);

const deleteData = async () => {
    await axios.delete(`http://localhost:8080/properties/${props.id}`)
        .then(res => { if (res.status !== 200) { throw Error('could not fetch the data for that resource') } else { console.log('deleted') } })
        .catch(err => { console.log(err.message); });
}

const handleDelete = async (e) => {
    e.preventDefault()
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    deleteData();
    //TODO: rerender page
    const res = await axios.get(`/users/${user._id}`)
    dispatch({ type: "REFRESH", payload: res.data });
    dispatch({ type: "REFRESH", payload: res.data });
  }
    

    return (
        <button onClick={handleDelete}>delete</button>
    )
};

export default DeleteButton;