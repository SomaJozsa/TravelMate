import React from "react";
import { Link, useNavigate } from 'react-router-dom'; 
import "./DestinationStyles.css";

const DestinationsData = (props) => {
    const navigate = useNavigate(); 

    const handleClick = (e, img1) => {
        e.preventDefault();
        navigate(`/book/${props.heading.toLowerCase().replace(/\s+/g, '-')}`, { state: { img1: img1, heading: props.heading } }); 
    }

    const destinationUrl = `/book/${props.heading.toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <div className={props.className}>
            <div className="des-text">
                <Link to={destinationUrl} onClick={(e) => handleClick(e, props.img1)}><h2>{props.heading}</h2></Link>
                <p>{props.text}</p>
            </div>
            <div className="image">
                <Link to={destinationUrl} onClick={(e) => handleClick(e, props.img1)}><img alt="img" src={props.img1}/></Link>
                <Link to={destinationUrl} onClick={(e) => handleClick(e, props.img2)}><img alt="img" src={props.img2}/></Link>
            </div>
        </div>
    );
}

export default DestinationsData;