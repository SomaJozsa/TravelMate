import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Trip from '../components/Trip';

const Book = () => {
    const { destination } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useUser(); 
    const { img1, heading } = location.state || {};
    const formattedDestination = heading || destination.replace(/-/g, ' ').toUpperCase();
    const [prices, setPrices] = useState('');
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [bookingMessage, setBookingMessage] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const destinationToId = {
          maldives: 1,
          paris: 2,
          berlin: 3,
        };
        const destinationId = destinationToId[destination];
      
        if (destinationId) {
          const port = ':3001'; 
          const baseUrl = `${window.location.protocol}//${window.location.hostname}${port}`;
          fetch(`${baseUrl}/api/destination/description/${destinationId}`)
            .then(response => response.json())
            .then(data => setDescription(data.description))
            .catch(error => console.error('Error fetching description:', error));
          fetch(`${baseUrl}/api/destination/dates/${destinationId}`)
            .then(response => response.json())
            .then(data => {
              const dates = data.availableDates.map(date => new Date(date).toISOString().split('T')[0]);
              setAvailableDates(dates);
            })
            .catch(error => console.error('Error fetching dates:', error));
        } else {
          console.error(`Invalid destination: ${destination}`);
        }
      }, [destination]);

      const handleBooking = () => {
        if (!user) {
            setBookingMessage("Please sign in or sign up to book a trip.");
            return;
        }
       
        const destinationToId = {
          maldives: 1,
          paris: 2,
          berlin: 3,
        };
        const destinationId = destinationToId[destination.toLowerCase()]; 
    
        const bookingData = {
            customerId: user.id, 
            destinationId: destinationId,
            date: selectedDate,
            price: prices, 
        };
    
        const port = ':3001'; 
        const baseUrl = `${window.location.protocol}//${window.location.hostname}${port}`;
        fetch(`${baseUrl}/api/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.bookingId) { 
                const message = `Booking successful for ${user.name}! Destination: ${formattedDestination}, Date: ${selectedDate}, Price: ${prices}. Redirecting to home page...`;
                setBookingMessage(message);
                setBookingSuccess(true);
                setTimeout(() => {
                    navigate('/');
                }, 10000);
            } else {
                
                setBookingMessage("Booking failed. Please try again.");
            }
        })
        .catch(error => {
            console.error('Error booking trip:', error);
            setBookingMessage("Booking failed. Please try again.");
        });
    };

    return (
        <>
            <Navbar/>
            <Hero cName="hero-mid" heroImg={img1} title={formattedDestination} btnClass="hide"/>
            <div className="booking-options">
                <h2>Booking Options</h2>
                <p>Prices: {prices}</p>
                <select value={selectedDate} onChange={e => setSelectedDate(e.target.value)}>
                    <option value="">Select a date</option>
                    {availableDates.map(date => (
                        <option key={date} value={date}>{date}</option>
                    ))}
                </select>
                <button onClick={handleBooking}>Book Trip</button>
                {bookingMessage && <p>{bookingMessage}</p>}
            </div>
            <Trip/>
            <Footer/>
        </>
    );
}

export default Book;