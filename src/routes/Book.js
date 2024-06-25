import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Trip from '../components/Trip';

const Book = () => {
    const { destination } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { img1, heading } = location.state || {};
    const formattedDestination = heading || destination.replace(/-/g, ' ').toUpperCase();
    const [description, setDescription] = useState('');
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [bookingSuccess, setBookingSuccess] = useState(false);

    useEffect(() => {
        const destinationToId = {
            maldives: 1,
            paris: 2,
            berlin: 3,
        };
        const destinationId = destinationToId[destination];
    
        if (destinationId) {
            fetch(`/api/destination/text/${destinationId}`)
                .then(response => response.json())
                .then(data => setDescription(data.description))
                .catch(error => console.error('Error fetching description:', error));

            // ha nem megy a database ez van helyette
            const staticDates = [
                '2024-08-01', '2024-08-15', '2024-08-29',
                '2024-09-12', '2024-09-26'
            ];
            setAvailableDates(staticDates);
        } else {
            console.error(`Invalid destination: ${destination}`);
        }
    }, [destination]);

    const handleBooking = () => {
        setBookingSuccess(true);
        setTimeout(() => {
            navigate('/');
        }, 10000);
    };

    return (
        <>
            <Navbar/>
            <Hero cName="hero-mid" heroImg={img1} title={formattedDestination} btnClass="hide"/>
            <div className="destination-description">
                {description}
                <select value={selectedDate} onChange={e => setSelectedDate(e.target.value)}>
                    <option value="">Select a date</option>
                    {availableDates.map(date => (
                        <option key={date} value={date}>{date}</option>
                    ))}
                </select>
                <button onClick={handleBooking}>Book Trip</button>
                {bookingSuccess && <p>Booking successful! Redirecting to home page...</p>}
            </div>
            <Trip/>
            <Footer/>
        </>
    );
}

export default Book;