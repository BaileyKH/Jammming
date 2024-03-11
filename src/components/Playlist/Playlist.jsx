import React, { useCallback } from "react";

import TrackList from '../TrackList/TrackList';
import './Playlist.css'

const Playlist = (props) => {

    const handleNameChange = useCallback(
        (event) => {
          props.onNameChange(event.target.value);
        },
        [props.onNameChange]
      );

    return(
        <div className="playlist-container">
            <div className="playlist-name-container">
                <input onChange={handleNameChange} placeholder="Enter Playlist Name"/>
                <button className="playlist-btn" onClick={props.onSave}>Save</button>
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