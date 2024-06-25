import Hero from "../components/Hero";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import Img from "../photos/107178919-1673854215895-gettyimages-669463000-shutterstock_621020393.jpeg"
function Service(){
    return(
        <>
        <Navbar />
            <Hero
            cName="hero-mid"
            heroImg={Img}
            title="Service"
            btnClass="hide"
            />
            <Footer/>
        </>
    )
}

export default Service;