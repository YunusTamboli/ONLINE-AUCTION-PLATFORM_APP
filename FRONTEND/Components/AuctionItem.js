import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AuctionItem() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [bid, setBid] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/auctions/${id}`);
        setItem(res.data);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Error fetching auction item.');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleBid = async () => {
    if (!bid || isNaN(bid) || bid <= item?.currentBid) {
      setMessage('Enter a valid bid higher than the current bid.');
      return;
    }

    const username = prompt('Enter your username to place a bid:');
    if (!username) return;

    try {
      const res = await axios.post(`http://localhost:5001/bid/${id}`, { bid: parseFloat(bid), username });
      setMessage(res.data.message);
      if (res.data.winner) {
        setMessage(`Auction closed. Winner: ${res.data.winner}`);
      }
      setItem({ ...item, currentBid: parseFloat(bid), highestBidder: username });
      setBid('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error placing bid.');
    }
  };

  if (loading) return <p>Loading auction item...</p>;
  if (!item) return <p>Auction item not found.</p>;

  return (
    <div>
      <h2>{item.itemName}</h2>
      <p>{item.description}</p>
      <p>Current Bid: ${item.currentBid}</p>
      <p>Highest Bidder: {item.highestBidder || 'No bids yet'}</p>
      <input
        type="number"
        value={bid}
        onChange={(e) => setBid(e.target.value)}
        placeholder="Enter your bid"
        min={item.currentBid + 1}
      />
      <button onClick={handleBid} disabled={!bid || isNaN(bid) || bid <= item.currentBid}>
        Place Bid
      </button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AuctionItem;
