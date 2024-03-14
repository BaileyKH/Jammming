import React, { useState, useCallback } from "react";
import './SearchBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


const SearchBar = (props) => {
    
    const [term, setTerm] = useState("");

    const handleTermChange = useCallback((event) => {
        setTerm(event.target.value);
    }, []);

    const search = useCallback(() => {
        props.onSearch(term);
    }, [props.onSearch, term]);

    const handleKeyUp = useCallback((event) => {
        console.log('Key pressed:', event.key); 
        if (event.key === 'Enter') {
            console.log('Enter key pressed, initiating search');
            search();
        }
    }, [search]);

    return(
        <div className="main-search-container">
            <div className="search-container">
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#ffffff",}} />
                <input 
                    type="search" 
                    className="search-input" 
                    placeholder="What song are you looking for?" 
                    onChange={handleTermChange}
                    onKeyUp={handleKeyUp} />
                <button className="search-btn" onClick={search}>Search</button>
            </div>
        </div>
    );
}

export default SearchBar;