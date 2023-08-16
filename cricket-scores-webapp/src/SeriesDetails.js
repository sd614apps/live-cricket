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
        <div className="match-details-container">
            <button className="back-button" onClick={closeDetails}>Back to Matches</button>
            <div className="match-info">
                <h3>Match Details:</h3>
                <div className="info-item">Date: {matchInfo.date}</div>
                <div className="info-item">Teams: {matchInfo.teams && matchInfo.teams.join(' vs ')}</div>
                <div className="info-item">Venue: {matchInfo.venue}</div>
                <div className="info-item">Status: {matchInfo.status}</div>
                <div className="info-item">Toss Winner: {matchInfo.tossWinner}</div>
                <div className="info-item">Toss Choice: {matchInfo.tossChoice}</div>
                <div className="info-item">Match Winner: {matchInfo.matchWinner}</div>
                <div className="info-item">Fantasy Enabled: {matchInfo.fantasyEnabled ? 'Yes' : 'No'}</div>
            </div>
            <div className="score-details">
                <h4>Score:</h4>
                {matchInfo.score && matchInfo.score.map((inning, index) => (
                    <div key={index} className="inning-score">
                        <div className="inning-name">{inning.inning}</div>
                        <div className="score-item">Score: {inning.r}/{inning.w} ({inning.o} overs)</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SeriesDetails = ({ seriesId, closeDetails }) => {
    const [seriesInfo, setSeriesInfo] = useState({});
    const [matches, setMatches] = useState([]);
    const [selectedMatchId, setSelectedMatchId] = useState(null);

    useEffect(() => {
        const fetchSeriesInfo  = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/series-info?seriesId=${seriesId}`);
                setSeriesInfo(response.data.data.info || {});
                setMatches(response.data.data.matchList || []);
            } catch (error) {
                console.error('Error fetching series info:', error);
            }
        };

        fetchSeriesInfo();
    }, [seriesId]);

    if (selectedMatchId) {
        return (
            <MatchDetails matchId={selectedMatchId} closeDetails={() => setSelectedMatchId(null)} />
        );
    }

    return (
        <div className="series-details-container">
            <button className="close-button" onClick={closeDetails}>Close</button>
            <div className="series-info">
                <h3>Series Details:</h3>
                <div className="info-item">Name: {seriesInfo.name}</div>
                <div className="info-item">Start Date: {seriesInfo.startdate}</div>
                <div className="info-item">End Date: {seriesInfo.enddate}</div>
                <div className="info-item">ODI Matches: {seriesInfo.odi}</div>
                <div className="info-item">T20 Matches: {seriesInfo.t20}</div>
                <div className="info-item">Test Matches: {seriesInfo.test}</div>
                <div className="info-item">Squads: {seriesInfo.squads}</div>
                <div className="info-item">Total Matches: {seriesInfo.matches}</div>
            </div>
            <div className="match-list">
                <h4>Matches in this Series:</h4>
                <ul className="match-list-container">
                    {matches.map((match) => (
                        <li
                            key={match.id}
                            className="match-item"
                            onClick={() => setSelectedMatchId(match.id)}
                        >
                            {match.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SeriesDetails;
