import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SeriesDetails = ({ seriesId, closeDetails }) => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/series-info?seriesId=${seriesId}`);
                setMatches(response.data.data.matchList || []);
            } catch (error) {
                console.error('Error fetching matches for series:', error);
            }
        };

        fetchMatches();
    }, [seriesId]);

    return (
        <div className="series-details">
            <button onClick={closeDetails}>Close</button>
            <h3>Matches in this Series:</h3>
            <ul>
                {matches.map((match) => (
                    <div key={match.id} className="match-item">
                        [{match.date}] {match.name}
                        {/* More match details can be added here */}
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default SeriesDetails;
