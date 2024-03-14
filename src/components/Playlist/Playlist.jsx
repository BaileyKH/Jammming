import React, { useCallback, useState } from "react";

import TrackList from '../TrackList/TrackList';
import './Playlist.css'

const Playlist = (props) => {

    const [playlistName, setPlaylistName] = useState('');

    const handleNameChange = useCallback(
        (event) => {
          setPlaylistName(event.target.value);
          props.onNameChange(event.target.value);
        },
        [props.onNameChange]
      );

    const handleSave = useCallback(() => {
        props.onSave();
        setPlaylistName(''); 
    }, [props.onSave]);

    return(
        <div className="playlist-container">
            <div className="playlist-name-container">
                <input onChange={handleNameChange} 
                       placeholder="Enter Playlist Name"
                       value={playlistName}/>
                <button className="playlist-btn" onClick={handleSave}>Save</button>
            </div>
            <div>
                <TrackList
                    tracks={props.playlistTracks}
                    isRemoval={true}
                    onRemove={props.onRemove}
                />
            </div>
        </div>
    );
}

export default Playlist;