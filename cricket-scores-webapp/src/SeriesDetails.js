import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MatchDetails = ({ matchId, closeDetails }) => {
    const [matchInfo, setMatchInfo] = useState({});

    useEffect(() => {
        const fetchMatchInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/match-info?matchId=${matchId}`);
                setMatchInfo(response.data.data || {});
            } catch (error) {
                console.error('Error fetching match info:', error);
            }
        };

        fetchMatchInfo();
    }, [matchId]);

    return (
        <div className="match-details">
            <button onClick={closeDetails}>Back to Matches</button>
            <h3>Match Info:</h3>
            {/* Display match details here */}
            <div>Date: {matchInfo.date}</div>
            <div>Teams: {matchInfo.teams}</div>
            {/* ... Add more match details here */}
        </div>
    );
};

const SeriesDetails = ({ seriesId, closeDetails }) => {
    const [matches, setMatches] = useState([]);
    const [selectedMatchId, setSelectedMatchId] = useState(null);

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

    if (selectedMatchId) {
        return (
            <MatchDetails matchId={selectedMatchId} closeDetails={() => setSelectedMatchId(null)} />
        );
    }

    return (
        <div className="series-details">
            <button onClick={closeDetails}>Close</button>
            <h3>Matches in this Series:</h3>
            <ul>
                {matches.map((match) => (
                    <li 
                      key={match.id} 
                      className="match-item"
                      onClick={() => setSelectedMatchId(match.id)}
                    >
                        [{match.date}] {match.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SeriesDetails;
