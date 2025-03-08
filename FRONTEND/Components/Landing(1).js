import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className='content'>
      <h2>Welcome to Auction App</h2>
      <p>
        An auction is a process of buying and selling goods or services by offering them up for bids, taking bids, and then
        selling the item to the highest bidder or buying the item from the lowest bidder. Different types of auctions exist,
        each with unique rules and strategies.
      </p>
      <div className='buttons'>
        <Link to='/signin'><button>Sign In</button></Link>
        <Link to='/signup'><button>Sign Up</button></Link>
      </div>
    </div>
  );
}

export default Landing;
