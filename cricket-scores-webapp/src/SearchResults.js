import React, { useState } from 'react';
import SeriesDetails from './SeriesDetails';
import PlayerDetails from './PlayerDetails';

const SearchResults = ({ results, searchType }) => {
    const [selectedSeries, setSelectedSeries] = useState(null);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const handleSeriesClick = (seriesId) => {
        setSelectedSeries(seriesId);
    };

    const handlePlayerClick = (playerId) => {
        setSelectedPlayer(playerId);
    };

    const handleCloseDetails = () => {
        setSelectedSeries(null);
        setSelectedPlayer(null);
    };

    if (selectedSeries) {
        return <SeriesDetails seriesId={selectedSeries} closeDetails={handleCloseDetails} />;
    }

    if (selectedPlayer) {
        return <PlayerDetails playerId={selectedPlayer} closeDetails={handleCloseDetails} />;
    }

    if (searchType === 'series') {
        return (
            <div className="series-results">
                {results.map((series) => (
                    <div key={series.id} className="series-item" onClick={() => handleSeriesClick(series.id)}>
                        {series.name}
                        {/* More series details can be added here */}
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div className="player-results">
                {results.map((player) => (
                    <div key={player.id} className="player-item" onClick={() => handlePlayerClick(player.id)}>
                        {player.name}
                        {/* More player details can be added here */}
                    </div>
                ))}
            </div>
        );
    }
};

export default SearchResults;
