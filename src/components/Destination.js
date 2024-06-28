import "./DestinationStyles.css"
import maldives1 from "../photos/maldives1.jpeg"
import maldives2 from "../photos/maldives2.jpeg"
import paris1 from "../photos/paris1.jpeg"
import paris2 from "../photos/paris2.webp"
import berlin1 from "../photos/berlin1.jpeg"
import berlin2 from "../photos/berlin2.jpeg"
import DestinationsData from "./DestinationData"
const Destination=()=>{
    return(
        <div className="destination">
            <h1>Popular destinations</h1>
            <p>Tours give you the oppurtunity to make some new memories.</p>
            <DestinationsData
                className="first-des"
                heading="Maldives"
                text="More text"
                img1={maldives1}
                img2={maldives2}
            />
            <DestinationsData
                className="first-des-reverse"
                heading="Paris"
                text="More text"
                img1={paris1}
                img2={paris2}
            />
            <DestinationsData
                className="first-des"
                heading="Berlin"
                text="More text"
                img1={berlin1}
                img2={berlin2}
            />
        </div>
    );
}

export default Destination;