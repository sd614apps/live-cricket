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

    return (
        <div className="player-details">
            <button onClick={closeDetails} className="close-button">Close</button>
            <img src={playerDetails.playerImg} alt={playerDetails.name} />
            <h3>{playerDetails.name}</h3>
            <p>Country: {playerDetails.country}</p>
            <p>Born: {playerDetails.dateOfBirth} in {playerDetails.placeOfBirth}</p>
            <p>Role: {playerDetails.role}</p>
            <p>Batting Style: {playerDetails.battingStyle}</p>
            <p>Bowling Style: {playerDetails.bowlingStyle}</p>
            {/* <p>Batting Stats:
                <table>
                    <tr>
                        <th>Statistic</th>
                        <th>Tests</th>
                        <th>ODI</th>
                        <th>T20</th>
                    </tr>
                    <tr>
                        <td>Matches</td>
                        <td>200</td>
                        <td>Matches</td>
                        <td>Matches</td>
                    </tr>
                    <tr>
                        <td>Innings</td>
                        <td>329</td>
                        <td>Matches</td>
                        <td>Matches</td>
                    </tr>
                    <tr>
                        <td>Not Outs</td>
                        <td>33</td>
                        <td>Matches</td>
                        <td>Matches</td>
                    </tr>
                    <tr>
                        <td>Runs</td>
                        <td>15921</td>
                        <td>Matches</td>
                        <td>Matches</td>
                    </tr>
                    <tr>
                        <td>Highest Score</td>
                        <td>248</td>
                        <td>Matches</td>
                        <td>Matches</td>
                    </tr>
                    <tr>
                        <td>Average</td>
                        <td>53.79</td>
                        <td>Matches</td>
                        <td>Matches</td>
                    </tr>
                    <tr>
                        <td>Balls Faced</td>
                        <td>29437</td>
                        <td>Matches</td>
                        <td>Matches</td>
                    </tr>
                    <tr>
                        <td>Strike Rate</td>
                        <td>54.08</td>
                        <td>Matches</td>
                        <td>Matches</td>
                    </tr>
                    <tr>
                        <td>100s</td>
                        <td>51</td>
                        <td>Matches</td>
                        <td>Matches</td>
                    </tr>
                    <tr>
                        <td>200s</td>
                        <td>6</td>
                        <td>Matches</td>
                        <td>Matches</td>
                    </tr>
                </table>
            </p> */}
            {/* More player details can be added here */}
        </div>
    );
};

export default PlayerDetails;
