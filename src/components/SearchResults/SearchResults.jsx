import React from 'react'

import TrackList from "../TrackList/TrackList.jsx";
import './SearchResults.css'

const SearchResults = (props) => {

    return(
        <div className="results-container">
            <h2>Search Results</h2>
            <TrackList tracks={props.searchResults} onAdd={props.onAdd} />
        </div>
    );
}

export default SearchResults;