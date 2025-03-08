require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const auctionRoutes = require('./routes/auctionRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/auctions', auctionRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
