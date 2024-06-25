import Destination from "../components/Destination";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar"
import Trip from "../components/Trip";
function Home(){
    return(
        <>
            <Navbar />
            <Hero
            cName="hero"
            heroImg="https://travelprnews.com/wp-content/uploads/2021/11/https___specials-images.forbesimg.com_imageserve_920377840_0x0.jpg"
            title="Your Journey Your Story"
            text="Choose your favourite destination"
            url="/"
            btnClass="show"
            buttonText="Travel Plan"/>

            <Destination/>
            <Trip/>
            <Footer/>

        </>
    )
}

export default Home;