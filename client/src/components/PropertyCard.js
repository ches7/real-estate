import '../styles/PropertyCard.css';
import { useState, useContext } from "react";
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faCouch } from "@fortawesome/free-solid-svg-icons";
import SaveProperty from "./SaveProperty";
import { AuthContext } from '../utils/AuthContext';
import DeleteButton from "./DeleteButton";
import UpdateButton from "./UpdateButton";

const PropertyCard = (props) => {
    const [index, setIndex] = useState(0);
    const [deleted, setDeleted] = useState(false);

    const { user, dispatch } = useContext(AuthContext);

  const handleSelect = (selectedIndex, e) => {
    e.preventDefault()
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setIndex(selectedIndex);
  };
 
  const getDeletedStateFromChild = async (data) => {
    await props.func(true);
    setDeleted(data);
  }

  const handleClick = () => {
    window.location.href = `/properties/${props.id}`;
  }

  let deleteButton;
  if (user && (user.id == props.agent)) { deleteButton = <DeleteButton id={props.id} agent={props.agent} func={getDeletedStateFromChild}/> }

  let updateButton;
  if (user && (user.id == props.agent)) { updateButton = <UpdateButton id={props.id}/> }

  if (deleted) return; 
    return (
        <div className="d-flex justify-content-center">
        <div className="border rounded m-4 cardwidth" /*w-50*/  onClick={handleClick} style={{cursor: "pointer"}}>
        <div className="cardflex">
        
    <Carousel activeIndex={index} onSelect={handleSelect} interval={null} slide={false} className="w-100">
       {props.photos.map((p, i) => (
                    <Carousel.Item key={i} className="">
                    <img
                    className="w-100" /*width={525}*/ src={p}
                    /></Carousel.Item>
                ))}
    </Carousel>

        <div key={props.i} className="m-3 flex-column w-100">
        <div className="update-delete-price-container">
        <h2 className="me-auto">£{props.price}</h2>
        {updateButton}
        {deleteButton}
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
        </div>
        </div>
    )
};

export default PropertyCard;