import React, { useState } from 'react';
import SeriesDetails from './SeriesDetails';

const SearchResults = ({ results, searchType }) => {
    const [selectedSeries, setSelectedSeries] = useState(null);

    const handleSeriesClick = (seriesId) => {
        setSelectedSeries(seriesId);
    };

    const handleCloseDetails = () => {
        setSelectedSeries(null);
    };

    if (selectedSeries) {
        return <SeriesDetails seriesId={selectedSeries} closeDetails={handleCloseDetails} />;
    }

    if (searchType === 'series') {
        return (
            <div className="series-results">
                {results.map((series) => (
                    <div
                        key={series.id}
                        className="series-item"
                        onClick={() => handleSeriesClick(series.id)}
                    >
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
                    <div key={player.id} className="player-item">
                        {player.name}
                        {/* More player details can be added here */}
                    </div>
                ))}
            </div>
        );
    }
};

export default SearchResults;
