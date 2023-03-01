import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faCouch } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { AuthContext } from "../utils/AuthContext";
import { useContext, useState, useRef } from "react";
import Flash from './Flash';

const DeleteButton = (props) => {

    const { user, loading, error, dispatch } = useContext(AuthContext);
    const [agent, setAgent] = useState(props.agent);
    const [active, setActive] = useState(false);
    const [typeFlash, setTypeFlash] = useState("default");
    const [width, setWidth] = useState("default");
    const [position, setPosition] = useState("default");
    const [timer, setTimer] = useState(2000);
    const message = useRef("");

    const handleDelete = async (e) => {
        e.preventDefault()
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        deleteData();
    }

    const deleteData = async () => {
        await axios({
            data: { agent },
            method: 'delete',
            url: `/api/properties/${props.id}`,
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {if (res.status !== 200) { throw Error('could not fetch the data for that resource') } else {afterDelete();}})
        .catch(err => {
            message.current = 'Something went wrong!'
            setTypeFlash('error');
            handleShowFlash();  })
    };

    const afterDelete = async (e) => {
        const res = await axios.get(`/api/users/${user.id}`)
        dispatch({ type: "REFRESH", payload: res.data });
        props.func(true);
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

    return (<div>
        <button onClick={handleDelete} className="btn btn-danger">delete</button>
        {active && (
            <Flash
                type={typeFlash}
                message={message.current}
                duration={3000}
                active={active}
                setActive={setActive}
                position={"bcenter"}
                width={"default"}
            />
        )}
    </div>
    )
};

export default DeleteButton;