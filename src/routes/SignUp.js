// SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; 
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import SignUpImg from "../photos/signup_image.jpg";

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { setUser } = useUser(); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') setUsername(value);
        else if (name === 'email') setEmail(value);
        else if (name === 'password') setPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const port = ':3001';
        const baseUrl = `${window.location.protocol}//${window.location.hostname}${port}`;
        const apiUrl = `${baseUrl}/api/signup`;
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Signup successful', data);
            setUser({ name: username }); 
            setSuccessMessage(`Thank you, ${username}, for the registration!`);
            setTimeout(() => navigate('/'), 3000);
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <>
            <Navbar />
            <Hero cName="hero-mid" heroImg={SignUpImg} title="Sign Up" btnClass="hide" />
            <div className="form-container">
                {successMessage ? (
                    <p>{successMessage}</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="username" value={username} onChange={handleChange} placeholder="Username" />
                        <input type="email" name="email" value={email} onChange={handleChange} placeholder="Email" />
                        <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" />
                        <button type="submit">Sign Up</button>
                    </form>
                )}
            </div>
            <Footer />
        </>
    );
}

export default SignUp;