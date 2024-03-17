import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Track from "./Track";

global.Audio = vi.fn().mockImplementation(() => ({
  play: vi.fn(),
  pause: vi.fn(),
  volume: null,
}));

describe("Track Component", () => {
  let trackProps;

  beforeEach(() => {
    trackProps = {
      track: {
        id: "1",
        name: "Test Track",
        artist: "Test Artist",
        album: "Test Album",
        preview: "url-to-preview",
        image: "url-to-image",
      },
      isRemoval: false,
      isPlaying: false,
      onAdd: vi.fn(),
      onRemove: vi.fn(),
      onPlay: vi.fn(),
    };
  });

  it("renders add button and handles track addition", () => {
    const { getByText } = render(<Track {...trackProps} />);

    expect(getByText("+")).toBeInTheDocument();

    fireEvent.click(getByText("+"));

    expect(trackProps.onAdd).toHaveBeenCalledWith(trackProps.track);
  });

  it("renders remove button and handles track removal", () => {
    trackProps.isRemoval = true;
    const { getByText } = render(<Track {...trackProps} />);

    expect(getByText("-")).toBeInTheDocument();

    fireEvent.click(getByText("-"));

    expect(trackProps.onRemove).toHaveBeenCalledWith(trackProps.track);
  });

  it("handles play/pause toggle", () => {
    const { container } = render(<Track {...trackProps} />);
    const playPauseBtn = container.querySelector(".PlayPause-btn");

    fireEvent.click(playPauseBtn);

    expect(trackProps.onPlay).toHaveBeenCalledWith(trackProps.track.id);
  });
});
