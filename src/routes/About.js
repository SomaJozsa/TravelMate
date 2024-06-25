import Hero from "../components/Hero";
import Navbar from "../components/Navbar"
import Img from "../photos/header_frontpage_2.jpg"
import Footer from "../components/Footer";
function About(){
    return(
        <>
            <Navbar />
            <Hero
            cName="hero-mid"
            heroImg={Img}
            title="About"
            btnClass="hide"
            />
            <Footer/>
        </>
    )
}

export default About;