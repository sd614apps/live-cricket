import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerDetails = ({ playerId, closeDetails }) => {
    const [playerDetails, setPlayerDetails] = useState(null);

    useEffect(() => {
        const fetchPlayerDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/player-info?playerId=${playerId}`);
                setPlayerDetails(response.data.data || null);
            } catch (error) {
                console.error('Error fetching player details:', error);
            }
        };

        fetchPlayerDetails();
    }, [playerId]);

    if (!playerDetails) {
        return <div>Loading...</div>;
    }

    const renderStatTable = (stats, title) => {
        const matchTypes = ['test', 'odi', 't20i', 'ipl'];

        return (
            <div className="stat-table">
                <h4>{title}</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Stat</th>
                            {matchTypes.map((matchType) => (
                                <th key={matchType}>{matchType.toUpperCase()}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {stats.map((stat) => (
                            <tr key={stat.stat}>
                                <td>{stat.stat}</td>
                                {matchTypes.map((matchType) => {
                                    const valueObj = stat.values.find((value) => value.matchtype === matchType);
                                    const value = valueObj ? valueObj.value : '-';
                                    return <td key={matchType}>{value}</td>;
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const battingStats = [
        { stat: 'Matches', values: playerDetails.stats.filter((stat) => stat.fn === 'batting' && stat.stat === 'm') },
        { stat: 'Innings', values: playerDetails.stats.filter((stat) => stat.fn === 'batting' && stat.stat === 'inn') },
        { stat: 'Not Outs', values: playerDetails.stats.filter((stat) => stat.fn === 'batting' && stat.stat === 'no') },
        { stat: 'Runs', values: playerDetails.stats.filter((stat) => stat.fn === 'batting' && stat.stat === 'runs') },
        { stat: 'Highest', values: playerDetails.stats.filter((stat) => stat.fn === 'batting' && stat.stat === 'hs') },
        { stat: 'Average', values: playerDetails.stats.filter((stat) => stat.fn === 'batting' && stat.stat === 'avg') },
        { stat: 'Balls Faced', values: playerDetails.stats.filter((stat) => stat.fn === 'batting' && stat.stat === 'bf') },
        { stat: 'Strike Rate', values: playerDetails.stats.filter((stat) => stat.fn === 'batting' && stat.stat === 'sr') },
        { stat: '100s', values: playerDetails.stats.filter((stat) => stat.fn === 'batting' && stat.stat === '100s') },
        { stat: '200s', values: playerDetails.stats.filter((stat) => stat.fn === 'batting' && stat.stat === '200s') },
        { stat: '50s', values: playerDetails.stats.filter((stat) => stat.fn === 'batting' && stat.stat === '50s') },
        { stat: '4s', values: playerDetails.stats.filter((stat) => stat.fn === 'batting' && stat.stat === '4s') },
        { stat: '6s', values: playerDetails.stats.filter((stat) => stat.fn === 'batting' && stat.stat === '6s') },
    ];

    const bowlingStats = [
        { stat: 'Matches', values: playerDetails.stats.filter((stat) => stat.fn === 'bowling' && stat.stat === 'm') },
        { stat: 'Innings', values: playerDetails.stats.filter((stat) => stat.fn === 'bowling' && stat.stat === 'inn') },
        { stat: 'Deliveries', values: playerDetails.stats.filter((stat) => stat.fn === 'bowling' && stat.stat === 'b') },
        { stat: 'Runs Given', values: playerDetails.stats.filter((stat) => stat.fn === 'bowling' && stat.stat === 'runs') },
        { stat: 'Wickets', values: playerDetails.stats.filter((stat) => stat.fn === 'bowling' && stat.stat === 'wkts') },
        { stat: 'BBI', values: playerDetails.stats.filter((stat) => stat.fn === 'bowling' && stat.stat === 'bbi') },
        { stat: 'BBM', values: playerDetails.stats.filter((stat) => stat.fn === 'bowling' && stat.stat === 'bbm') },
        { stat: 'Economy', values: playerDetails.stats.filter((stat) => stat.fn === 'bowling' && stat.stat === 'econ') },
        { stat: 'Average', values: playerDetails.stats.filter((stat) => stat.fn === 'bowling' && stat.stat === 'avg') },
        { stat: 'Strike Rate', values: playerDetails.stats.filter((stat) => stat.fn === 'bowling' && stat.stat === 'sr') },
        { stat: '5 wicket hauls', values: playerDetails.stats.filter((stat) => stat.fn === 'bowling' && stat.stat === '5w') },
        { stat: '10 wicket hauls', values: playerDetails.stats.filter((stat) => stat.fn === 'bowling' && stat.stat === '10w') },
    ];

    return (
        <div className="player-details">
            <button onClick={closeDetails} className="close-button">Close</button>
            <img src={playerDetails.playerImg} alt={playerDetails.name} />
            <h3>{playerDetails.name}</h3>
            <p>Country: {playerDetails.country}</p>
            <p>Born: {new Date(playerDetails.dateOfBirth).toLocaleDateString()} in {playerDetails.placeOfBirth}</p>
            <p>Role: {playerDetails.role}</p>
            <p>Batting Style: {playerDetails.battingStyle}</p>
            <p>Bowling Style: {playerDetails.bowlingStyle}</p>

            {renderStatTable(battingStats, 'Batting Stats')}
            {renderStatTable(bowlingStats, 'Bowling Stats')}
        </div>
    );
};

export default PlayerDetails;
