import { useState } from 'react';

import Track from '../Track/Track.jsx'
import './TrackList.css'

const TrackList = (props) => {

    const [playingTrackId, setPlayingTrackId] = useState(null);

    const handlePlayTrack = (trackId) => {
      if (playingTrackId === trackId) {
        setPlayingTrackId(null); 
      } else {
        setPlayingTrackId(trackId); 
      } 
    };

    return (
        <div className="TrackList">
          {props.tracks.map((track) => {
            return (
              <Track
                track={track}
                key={track.id}
                onAdd={props.onAdd}
                isRemoval={props.isRemoval}
                onRemove={props.onRemove}
                onPlay={handlePlayTrack}
                isPlaying={track.id === playingTrackId}
              />
            );
          })}
        </div>
      );
}

export default TrackList;