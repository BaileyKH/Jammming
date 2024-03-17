import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

import "./Track.css";

const Track = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const [audio] = useState(() => {
    const audio = new Audio(props.track.preview);
    audio.volume = 0.04;
    return audio;
  });

  useEffect(() => {
    props.isPlaying ? audio.play() : audio.pause();

    return () => audio.pause();
  }, [props.isPlaying, audio]);

  const togglePlayPause = () => {
    if (!props.isRemoval) {
      props.onPlay(props.track.id);
    }
  };

  const addTrack = useCallback(
    (event) => {
      props.onAdd(props.track);
    },
    [props.onAdd, props.track]
  );

  const removeTrack = useCallback(
    (event) => {
      props.onRemove(props.track);
    },
    [props.onRemove, props.track]
  );

  const renderAction = () => {
    if (props.isRemoval) {
      return (
        <button className="Track-action" onClick={removeTrack}>
          -
        </button>
      );
    }
    return (
      <button className="Track-action" onClick={addTrack}>
        +
      </button>
    );
  };

  return (
    <div className="Track">
      <div className="Track-image">
        <img src={props.track.image} alt={props.track.name} />
        {!props.isRemoval && (
          <button className="PlayPause-btn" onClick={togglePlayPause}>
            <FontAwesomeIcon icon={props.isPlaying ? faPause : faPlay} />
          </button>
        )}
      </div>
      <div className="Track-information">
        <h3>{props.track.name}</h3>
        <p>
          {props.track.artist} | {props.track.album}
        </p>
      </div>
      {renderAction()}
    </div>
  );
};

export default Track;
