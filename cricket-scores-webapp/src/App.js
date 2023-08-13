import React, { useState } from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import SearchResults from './SearchResults';
import './App.css'

const App = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchType, setSearchType] = useState('series'); // default to series

    const handleSearch = async (searchTerm) => {
		let endpoint = '/series-search';
		if (searchType === 'player') {
			endpoint = '/players-search';
		}
	
		try {
			const response = await axios.get(`http://localhost:3001${endpoint}?search=${searchTerm}`);
			if (response.data.status === 'success' && response.data.data) {
				setSearchResults(response.data.data); // Use the 'data' field from the response
			} else {
				setSearchResults([]); // No results or an error occurred
			}
		} catch (error) {
			console.error('Error fetching search results:', error);
		}
	};	

    return (
        <div className="app-container">
            <div className="search-type">
                <label>
                    <input 
                        type="radio" 
                        value="series" 
                        checked={searchType === 'series'} 
                        onChange={() => setSearchType('series')}
                    />
                    Series
                </label>
                <label>
                    <input 
                        type="radio" 
                        value="player" 
                        checked={searchType === 'player'} 
                        onChange={() => setSearchType('player')}
                    />
                    Player
                </label>
            </div>
            <SearchBar onSearch={handleSearch} />
        	<SearchResults results={searchResults} searchType={searchType} />
        </div>
    );
};

export default App;
