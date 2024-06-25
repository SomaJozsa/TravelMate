import React, { useState } from 'react';
import SignInImg from "../photos/signin_image.jpg";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const port = window.location.port ? `:${window.location.port}` : '';
        const baseUrl = `${window.location.protocol}//${window.location.hostname}${port}`;
        const apiUrl = `${baseUrl}/api/login`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (data.user) {
                console.log('Login successful', data);
            } else {
                console.log('Login failed', data.message);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <>
            <Navbar />
            <Hero
                cName="hero-mid"
                heroImg={SignInImg}
                title="Sign In"
                btnClass="hide"
            />
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                    <button type="submit">Sign In</button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default SignIn;