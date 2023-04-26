import axios from "axios";
import { AuthContext } from "../utils/AuthContext";
import { useContext, useState, useRef } from "react";
import Flash from "./Flash";

const SaveProperty = (props) => {

    const { user, dispatch } = useContext(AuthContext);

    const checkStorage = JSON.parse(localStorage.getItem("real_estate_app_ches_user"));

    const [saved, setSaved] = useState(() => {
        if (checkStorage == null){return false} else {
        for (let i = 0; i < checkStorage.savedProperties.length; i++){
        if (checkStorage.savedProperties[i] == props.id) {
            return true;
        }};}})
    const [active, setActive] = useState(false);
    const [type, setType] = useState("default");
    const [timer] = useState(2000);
    const message = useRef("");

    const handleSave = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if (!user){
            message.current = 'Sign in to save properties';
            setType('warning');
            handleShowFlash();
            return;
        }
        try {
            const res = await axios.post("/api/users/saveproperty", {
            "id":`${user.id}`,
            "property":`${props.id}`
            });
            
            //update sessionstorage with user data
            const res2 = await axios.get(`/api/users/${user.id}`)
            dispatch({ type: "REFRESH", payload: res2.data });

            setSaved(true);

        } catch (err) {
            console.log(err)
        }
    };

    const handleUnsave = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if(!user) return;
        try {
            const res = await axios.post("/api/users/unsaveproperty", {
            "id":`${user.id}`,
            "property":`${props.id}`
            });

            //update sessionstorage with user data
            const res2 = await axios.get(`/api/users/${user.id}`)
            dispatch({ type: "REFRESH", payload: res2.data });

            setSaved(false);

            if (window.location.pathname == '/account'){
                window.location.reload();
            }

        } catch (err) {
            console.log(err)
        }
    };

    const hideFlash = () => {
        setActive(false);
    };

    const handleShowFlash = () => {
        hideFlash();
        if (message) {
            setActive(true);
            window.setTimeout(hideFlash, timer);
        }
    };

  return (
    <div>
        {saved ? <button onClick={handleUnsave} className="btn btn-dark">unsave</button> :  <button onClick={handleSave} className="btn btn-dark">save</button>}
        {active && (
                    <Flash
                        type={type}
                        message={message.current}
                        duration={3000}
                        active={active}
                        setActive={setActive}
                        position={"bcenter"}
                        width={"default"}
                    />
                )}
    </div>
  );
};

export default SaveProperty;