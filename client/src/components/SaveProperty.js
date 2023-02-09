import axios from "axios";
import { AuthContext } from "../utils/AuthContext";
import { useContext, useState } from "react";


const SaveProperty = (props) => {

    const { user, loading, error, dispatch } = useContext(AuthContext);

    const checkStorage = JSON.parse(sessionStorage.getItem("user"));
    //check storage null when not signed in ?


    const [saved, setSaved] = useState(() => {
        if (checkStorage === null){return false} else {
        for (let i = 0; i < checkStorage.savedProperties.length; i++){
        if (checkStorage.savedProperties[i] === props.id) {
            return true;
        }};}})


    const handleSave = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if (checkStorage === null){return}else{
        try {
            const res = await axios.post("/users/saveproperty", {
            "id":`${user._id}`,
            "property":`${props.id}`
            });
            // console.log(res);
            // console.log(props.id);

            //update sessionstorage with user data
            const res2 = await axios.get(`/users/${user._id}`)
            dispatch({ type: "REFRESH", payload: res2.data });

            setSaved(true);

        } catch (err) {
            console.log(err)
        }
    }
    };

    const handleUnsave = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        try {
            const res = await axios.post("/users/unsaveproperty", {
            "id":`${user._id}`,
            "property":`${props.id}`
            });
            // console.log(res);
            // console.log(props.id);

            //update sessionstorage with user data
            const res2 = await axios.get(`/users/${user._id}`)
            dispatch({ type: "REFRESH", payload: res2.data });

            setSaved(false);

        } catch (err) {
            console.log(err)
        }
    };

  return (
    <div>
        {saved ? <button onClick={handleUnsave} className="btn btn-dark">unsave</button> :  <button onClick={handleSave} className="btn btn-dark">save</button>
}
    </div>
  );
};

export default SaveProperty;