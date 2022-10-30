import { useState } from "react";
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faCouch } from "@fortawesome/free-solid-svg-icons";
import SaveProperty from "./SaveProperty";


const PropertyCard = (props) => {
    const [index, setIndex] = useState(0);
    const [photos, setPhotos] = useState(props.photos);

  const handleSelect = (selectedIndex, e) => {
    e.preventDefault()
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setIndex(selectedIndex);
  };

  //TODO 
  const handleClick = () => {
    window.location.href = `http://localhost:3000/properties/${props.id}`;
  }


    return (
        <div className="d-flex justify-content-center">
        <div className="border rounded w-50 m-4"  onClick={handleClick} style={{cursor: "pointer"}}>
        {/* <Link to={`/properties/${props.id}`} className="text-decoration-none text-black"> */}
        <div className="d-flex">
        
    <Carousel activeIndex={index} onSelect={handleSelect} interval={null} slide={false}>
       {photos.map((p, i) => (
                    <Carousel.Item key={i}>
                    <img
                    className="d-block" width={525} src={p}
                    /></Carousel.Item>
                ))}
    </Carousel>

        <div key={props.i} className="m-3">
        <h2>£{props.price}</h2>

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