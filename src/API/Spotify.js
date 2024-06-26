const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = "https://jammming-spotify.vercel.app/";
let accessToken;

const Spotify = {
  getAccessToken() {
    return new Promise((resolve, reject) => {
      if (accessToken) {
        resolve(accessToken);
        return;
      }

      const accessTokenMatch =
        window.location.href.match(/access_token=([^&]*)/);
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
      if (accessTokenMatch && expiresInMatch) {
        accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);
        window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
        window.history.pushState("Access Token", null, "/");
        resolve(accessToken);
      } else {
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        window.location = accessUrl;
      }
    });
  },

  async search(term) {
    const accessToken = await this.getAccessToken().catch((error) => {
      console.error(`Error obtaining access token: ${error}`);
      alert(
        "There was an error with the authentication process. Please try again."
      );
    });

    if (!accessToken) {
      return [];
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?type=track&q=${term}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        if (!jsonResponse.tracks) return [];
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
          image: track.album.images[2].url,
          preview: track.preview_url,
        }));
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error(`Error in search method: ${error}`);
      alert("Failed to fetch search results. Please try again.");
      return [];
    }
  },

  async savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) return;

    const accessToken = await this.getAccessToken().catch((error) => {
      console.error(`Error obtaining access token: ${error}`);
      alert(
        "There was an error with the authentication process. Please try again."
      );
    });

    if (!accessToken) {
      return; //
    }

    try {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const userResponse = await fetch("https://api.spotify.com/v1/me", {
        headers,
      });
      if (!userResponse.ok)
        throw new Error(`Request failed with status ${userResponse.status}`);
      const userId = await userResponse.json().then((data) => data.id);

      const playlistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          headers,
          method: "POST",
          body: JSON.stringify({ name: name }),
        }
      );
      if (!playlistResponse.ok)
        throw new Error(
          `Request failed with status ${playlistResponse.status}`
        );
      const playlistId = await playlistResponse.json().then((data) => data.id);

      await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
        {
          headers,
          method: "POST",
          body: JSON.stringify({ uris: trackUris }),
        }
      ).then((response) => {
        if (!response.ok)
          throw new Error(`Request failed with status ${response.status}`);
      });
    } catch (error) {
      console.error(`Error in savePlaylist method: ${error}`);
      alert("Failed to save the playlist. Please try again.");
    }
  },
};

export default Spotify;
