const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enable CORS for client-side
app.use(cors());

const API_BASE = 'https://api.cricapi.com/v1';
const API_KEY = process.env.CRICAPI_KEY; // Fetch API key from environment variables

const fetchFromAPI = async (endpoint, res) => {
    try {
        const response = await axios.get(`${API_BASE}${endpoint}&apikey=${API_KEY}`);
        console.log(`Requested: ${endpoint} | Response Code: ${response.status}`); // TODO: Add timestamp for console logging
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error); // TODO: Add timestamp for console logging
        res.status(500).send('An error occurred while fetching data.');
    }
};

app.get('/current-matches', (req, res) => fetchFromAPI('/currentMatches?offset=0', res));
app.get('/cric-score', (req, res) => fetchFromAPI('/cricScore', res));
app.get('/series-search', (req, res) => {
    const searchTerm = req.query.search || '';
    fetchFromAPI(`/series?offset=0&search=${searchTerm}`, res);
});
app.get('/series-list', (req, res) => fetchFromAPI('/series?offset=0', res));
app.get('/matches-list', (req, res) => fetchFromAPI('/matches?offset=0', res));
app.get('/players-list', (req, res) => fetchFromAPI('/players?offset=0', res));
app.get('/players-search', (req, res) => {
    const searchTerm = req.query.search || '';
    fetchFromAPI(`/players?offset=0&search=${searchTerm}`, res);
});
app.get('/series-info', (req, res) => {
    const seriesId = req.query.seriesId || '';
    fetchFromAPI(`/series_info?id=${seriesId}`, res);
});

// Start the server on port 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
