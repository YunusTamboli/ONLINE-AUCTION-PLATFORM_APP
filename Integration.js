// api.js - API Service for frontend integration
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

export const signup = async (userData) => {
    return await axios.post(`${API_BASE_URL}/users/signup`, userData);
};

export const signin = async (userData) => {
    return await axios.post(`${API_BASE_URL}/users/signin`, userData);
};

export const getAuctions = async () => {
    return await axios.get(`${API_BASE_URL}/auctions`);
};

export const createAuction = async (auctionData, token) => {
    return await axios.post(`${API_BASE_URL}/auctions`, auctionData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const deleteAuction = async (id, token) => {
    return await axios.delete(`${API_BASE_URL}/auctions/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const editAuction = async (id, auctionData, token) => {
    return await axios.put(`${API_BASE_URL}/auctions/${id}`, auctionData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// SignupComponent.js
import React, { useState } from 'react';
import { signup } from './api';

const SignupComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await signup({ username, password });
            alert(response.data.message);
        } catch (error) {
            alert('Signup failed');
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignupComponent;

// Signin.js
import React, { useState } from 'react';
import { signin } from './api';

const Signin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            const response = await signin({ username, password });
            setToken(response.data.token);
            alert('Signin successful');
        } catch (error) {
            alert('Signin failed');
        }
    };

    return (
        <form onSubmit={handleSignin}>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Sign In</button>
        </form>
    );
};

export default Signin;

// Dashboard.js
import React, { useState, useEffect } from 'react';
import { getAuctions, deleteAuction } from './api';

const Dashboard = ({ token }) => {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        const fetchAuctions = async () => {
            const response = await getAuctions();
            setAuctions(response.data);
        };
        fetchAuctions();
    }, []);

    const handleDelete = async (id) => {
        await deleteAuction(id, token);
        setAuctions(auctions.filter(auction => auction._id !== id));
    };

    return (
        <div>
            <h1>Auction List</h1>
            <ul>
                {auctions.map(auction => (
                    <li key={auction._id}>
                        {auction.itemName} - {auction.currentBid}
                        <button onClick={() => handleDelete(auction._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
