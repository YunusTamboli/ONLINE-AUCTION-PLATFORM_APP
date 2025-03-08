import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/signin');
      return;
    }

    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:5001/auctions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(res.data);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    };
    fetchItems();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/signin');
  };

  return (
    <div>
      <h2>Auction Dashboard</h2>
      <button onClick={handleLogout} style={{ marginBottom: '10px', background: 'red', color: 'white' }}>
        Logout
      </button>
      <Link to="/post-auction">
        <button>Post New Auction</button>
      </Link>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <Link to={`/auction/${item._id}`}>
              {item.itemName} - Current Bid: ${item.currentBid} {item.isClosed ? '(Closed)' : ''}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
