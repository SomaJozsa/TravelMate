// Trip.js
import React from 'react';
import "./TripStyle.css";
import TripData from "./TripData";
import img1 from "../photos/GettyImages-1556365204.jpg";
import img2 from "../photos/how_to_take_great_travel_photos.jpg";
import img3 from "../photos/e08d6ef241b50288b469bbf38df15984.jpg";

function Trip() {
    return (
        <div className="trip">
            <h1>Recent Trips</h1>
            <p>You can discover the destination using Google Maps</p>
            <div className="tripcard">
                <TripData image={img1} heading="Croatia" text="Explore the beautiful beaches and historic sites of Croatia." />
                <TripData image={img2} heading="Norway" text="Discover Norway's stunning fjords, northern lights, and hiking trails." />
                <TripData image={img3} heading="Paris" text="Visit the romantic city of Paris for its art, cuisine, and the Eiffel Tower." />
            </div>
        </div>
    );
}

export default Trip;     