//artistActions.js es un archivo que contiene las acciones relacionadas con los artistas en la aplicación.
// Estas acciones son utilizadas para interactuar con la API de Spotify y manejar el estado de los artistas en la aplicación.

import { updateViewType } from './songActions';
import { updateHeaderTitle } from './uiActions';

// Acción que indica que comenzó la obtención de artistas
export const fetchArtistsPending = () => {
  return {
    type: 'FETCH_ARTISTS_PENDING'
  };
};

// Acción que indica que se obtuvieron los artistas correctamente
export const fetchArtistsSuccess = (artists) => {
  return {
    type: 'FETCH_ARTISTS_SUCCESS',
    artists
  };
};

// Acción que indica que ocurrió un error al obtener los artistas
export const fetchArtistsError = () => {
  return {
    type: 'FETCH_ARTISTS_ERROR'
  };
};

// Función que obtiene los datos de múltiples artistas desde la API de Spotify
export const fetchArtists = (accessToken, artistIds) => {
  return dispatch => {
    // Se construye la solicitud a la API con el token
    const request = new Request(`https://api.spotify.com/v1/artists?ids=${artistIds}`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    dispatch(fetchArtistsPending());

    fetch(request)
      .then(res => res.json())
      .then(res => {
        dispatch(fetchArtistsSuccess(res));
      })
      .catch(err => {
        dispatch(fetchArtistsError(err));
      });
  };
};

// Acción que indica que comenzó la obtención de las canciones del artista
export const fetchArtistSongsPending = () => {
  return {
    type: 'FETCH_ARTIST_SONGS_PENDING'
  };
};

// Acción que indica que se obtuvieron correctamente las canciones del artista
export const fetchArtistSongsSuccess = (songs) => {
  return {
    type: 'FETCH_ARTIST_SONGS_SUCCESS',
    songs
  };
};

// Acción que indica que ocurrió un error al obtener las canciones del artista
export const fetchArtistSongsError = () => {
  return {
    type: 'FETCH_ARTIST_SONGS_ERROR'
  };
};

// Función que obtiene las canciones más escuchadas de un artista en Spotify
export const fetchArtistSongs = (artistId, accessToken) => {
  return dispatch => {
    // Se construye la solicitud con el ID del artista y el token
    const request = new Request(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    dispatch(fetchArtistSongsPending());

    fetch(request)
      .then(res => {
        // Si el token no es válido, redirige al inicio
        if (res.statusText === "Unauthorized") {
          window.location.href = './';
        }
        return res.json();
      })
      .then(res => {
        // Se ajusta el formato esperado de la respuesta
        res.items = res.tracks.map(item => {
          return {
            track: item
          };
        });

        dispatch(fetchArtistSongsSuccess(res.items));
      })
      .catch(err => {
        dispatch(fetchArtistSongsError(err));
      });
  };
};

// Acción que guarda los IDs de los artistas seleccionados
export const setArtistIds = (artistIds) => {
  return {
    type: 'SET_ARTIST_IDS',
    artistIds
  };
};

// Acción que indica que comenzó la búsqueda de artistas
export const searchArtistsPending = () => ({
  type: 'SEARCH_ARTISTS_PENDING'
});

// Acción que indica que se encontraron artistas en la búsqueda
export const searchArtistsSuccess = (artists) => ({
  type: 'SEARCH_ARTISTS_SUCCESS',
  artists
});

// Acción que indica que hubo un error en la búsqueda de artistas
export const searchArtistsError = () => ({
  type: 'SEARCH_ARTISTS_ERROR'
});

// Función que busca artistas en Spotify a partir de un término de búsqueda
export const searchArtists = (searchTerm, accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/search?q=${searchTerm}&type=artist`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken,
        'Accept': 'application/json'
      })
    });

    dispatch(searchArtistsPending());

    fetch(request)
      .then(res => {
        if (res.statusText === "Unauthorized") {
          window.location.href = './';
        }
        return res.json();
      })
      .then(res => {
        dispatch(searchArtistsSuccess(res.artists.items));
        dispatch(updateViewType('Artists'));         
        dispatch(updateHeaderTitle('Artists'));       
      })
      .catch(err => {
        dispatch(searchArtistsError());
      });
  };
};

