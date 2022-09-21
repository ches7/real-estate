import { useState } from "react";
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faCouch } from "@fortawesome/free-solid-svg-icons";
import SaveProperty from "./SaveProperty";


const PropertyCard = (props) => {
    const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    e.preventDefault()
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setIndex(selectedIndex);
  };

  const handleClick = () => {
    window.location.href = `http://localhost:3000/properties/${props.id}`;
  }


    return (
        <div className="d-flex justify-content-center">
        <div className="border rounded w-50 m-4"  onClick={handleClick} style={{cursor: "pointer"}}>
        {/* <Link to={`/properties/${props.id}`} className="text-decoration-none text-black"> */}
        <div className="d-flex">
        
    <Carousel activeIndex={index} onSelect={handleSelect} interval={null} slide={false}>
      <Carousel.Item>
        <img
        className="d-block"
        width={525}
        height={350}
          src="https://lid.zoocdn.com/645/430/6700c3436801f274518d92769ff3498f2cbac155.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
        className="d-block"
        width={525}
        height={350}
          src="https://lid.zoocdn.com/u/1024/768/893f9a2de48fa750d06b928a6eb267f3263054ec.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
        className="d-block"
        width={525}
        height={350}
          src="https://lid.zoocdn.com/u/1024/768/3b5c2f5c999ecfe7a50deb08b231e316bacefb0b.jpg:p"
          alt="Third slide"
        />
      </Carousel.Item>
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