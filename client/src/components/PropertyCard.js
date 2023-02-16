import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faCouch } from "@fortawesome/free-solid-svg-icons";
import SaveProperty from "./SaveProperty";
import { AuthContext } from '../utils/AuthContext';
import { useContext } from 'react';
import DeleteButton from "./DeleteButton";
import UpdateButton from "./UpdateButton";

const PropertyCard = (props) => {
    const [index, setIndex] = useState(0);

    const { user, dispatch } = useContext(AuthContext);

  const handleSelect = (selectedIndex, e) => {
    e.preventDefault()
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setIndex(selectedIndex);
  };
 
  const handleClick = () => {
    window.location.href = `/properties/${props.id}`;
  }

  let deleteButton;
  if (user && user.id === props.agent) { deleteButton = <DeleteButton id={props.id}/> }

  let updateButton;
  if (user && user.id === props.agent) { updateButton = <UpdateButton id={props.id}/> }

    return (
        <div className="d-flex justify-content-center">
        <div className="border rounded w-50 m-4"  onClick={handleClick} style={{cursor: "pointer"}}>
        {/* <Link to={`/properties/${props.id}`} className="text-decoration-none text-black"> */}
        <div className="d-flex">
        
    <Carousel activeIndex={index} onSelect={handleSelect} interval={null} slide={false}>
       {props.photos.map((p, i) => (
                    <Carousel.Item key={i}>
                    <img
                    className="d-block" width={525} src={p}
                    /></Carousel.Item>
                ))}
    </Carousel>

        <div key={props.i} className="m-3">
        <div className="d-flex">
        <h2>£{props.price}</h2>
        {deleteButton}
        {updateButton}
        </div>

        <div className="d-flex">
        <FontAwesomeIcon icon={faBed} className="m-2"/>
        <p className="mt-1 me-2">{props.beds}</p>
        <FontAwesomeIcon icon={faBath} className="m-2"/>
        <p className="mt-1 me-2">{props.baths}</p>
        <FontAwesomeIcon icon={faCouch} className="m-2"/>
        <p className="mt-1 me-2">{props.receptions}</p>
        </div>

                
                <h4>{props.title}</h4>
                <p>{props.location}</p>
                <p>{props.type}</p>
                <p>{props.description}</p>
                <SaveProperty id={props.id}/>
            </div>
            </div>
            {/* </Link> */}
        </div>
        </div>
    )
};

export default PropertyCard;