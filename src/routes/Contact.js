import Hero from "../components/Hero";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import Img from "../photos/Argentina-GettyImages-1146497849.jpg.webp"
import ContactForm from "../components/ContactForm.js"
function Contact(){
    return(
        <>
            <Navbar />
            <Hero
            cName="hero-mid"
            heroImg={Img}
            title="Contact Us"
            btnClass="hide"
            />
            <ContactForm/>
            <Footer/>
        </>
    )
}

export default Contact;