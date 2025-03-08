const express = require('express');
const AuctionItem = require('../models/auction');
const router = express.Router();

// Get all auctions
router.get('/', async (req, res) => {
    try {
        const auctions = await AuctionItem.find();
        res.json(auctions);
    } catch (error) {
        console.error('Fetching Auctions Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get auction by ID
router.get('/:id', async (req, res) => {
    try {
        const auction = await AuctionItem.findById(req.params.id);
        if (!auction) return res.status(404).json({ message: 'Auction not found' });
        res.json(auction);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete auction
router.delete('/:id', async (req, res) => {
    try {
        await AuctionItem.findByIdAndDelete(req.params.id);
        res.json({ message: 'Auction deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting auction' });
    }
});

// Edit auction
router.put('/:id', async (req, res) => {
    try {
        const updatedAuction = await AuctionItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAuction);
    } catch (error) {
        res.status(500).json({ message: 'Error updating auction' });
    }
});

module.exports = router;
