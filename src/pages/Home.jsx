import React from 'react';
import './Home.css';
import LoginButton from "../components/Auth/LoginButton";

const Home = () => {
    return (
        <div className="home-wrapper">
                <h1 className='header-title'>Welcome to Journey Craft</h1>
                <LoginButton />
        </div>
    );
}

export default Home;