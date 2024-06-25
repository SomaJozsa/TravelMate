import React from 'react';
import './styles.css';
import { Route, Routes } from "react-router-dom";
import Home from './routes/Home';
import About from './routes/About';
import Service from './routes/Service';
import Contact from './routes/Contact';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';
import Book from './routes/Book';

export default function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/service" element={<Service/>} />
                <Route path="/contact" element={<Contact/>} />
                <Route path="/signin" element={<SignIn/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path='/book/:destination' element={<Book/>} />
            </Routes>
        </div>
    );
}