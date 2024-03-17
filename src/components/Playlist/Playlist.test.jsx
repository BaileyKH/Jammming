import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Playlist from "./Playlist";

describe("Playlist Component", () => {
  it("allows playlist name to be set and saved", async () => {
    const onNameChangeMock = vi.fn();
    const onSaveMock = vi.fn();
    const onRemoveMock = vi.fn();
    const playlistTracks = [];

    const { getByPlaceholderText, getByText } = render(
      <Playlist
        onNameChange={onNameChangeMock}
        onSave={onSaveMock}
        onRemove={onRemoveMock}
        playlistTracks={playlistTracks}
      />
    );

    const playlistNameInput = getByPlaceholderText("Enter Playlist Name");
    fireEvent.change(playlistNameInput, { target: { value: "New Playlist" } });

    expect(onNameChangeMock).toHaveBeenCalledWith("New Playlist");

    const saveButton = getByText("Save");
    fireEvent.click(saveButton);

    expect(onSaveMock).toHaveBeenCalled();

    expect(playlistNameInput.value).toBe("");
  });
});
