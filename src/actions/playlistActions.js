// playlistActions.js es un archivo que contiene las acciones relacionadas con las listas de reproducción en la aplicación.
// Estas acciones son utilizadas para interactuar con la API de Spotify y manejar el estado de las listas de reproducción en la aplicación.

import uniqBy from 'lodash/uniqBy'; // Librería para eliminar duplicados de un array según un criterio

// Acción para indicar que se está obteniendo el menú de playlists
export const fetchPlaylistMenuPending = () => {
  return {
    type: 'FETCH_PLAYLIST_MENU_PENDING'
  };
};

// Acción que se ejecuta cuando se obtienen correctamente las playlists del menú
export const fetchPlaylistMenuSuccess = (playlists) => {
  return {
    type: 'FETCH_PLAYLIST_MENU_SUCCESS',
    playlists
  };
};

// Acción que se ejecuta si ocurre un error al obtener el menú de playlists
export const fetchPlaylistMenuError = () => {
  return {
    type: 'FETCH_PLAYLIST_MENU_ERROR'
  };
};

// Acción para agregar una playlist individual al estado
export const addPlaylistItem = (playlist) => {
  return {
    type: 'ADD_PLAYLIST_ITEM',
    playlist
  };
};

// Función asincrónica que obtiene las playlists del usuario desde la API de Spotify
export const fetchPlaylistsMenu = (userId, accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    dispatch(fetchPlaylistMenuPending()); // Dispara la acción de carga

    fetch(request)
      .then(res => {
        // Si no está autorizado, redirige al inicio
        if(res.statusText === "Unauthorized") {
          window.location.href = './';
        }
        return res.json();
      })
      .then(res => {
        dispatch(fetchPlaylistMenuSuccess(res.items)); // Si tiene éxito, guarda las playlists
      })
      .catch(err => {
        dispatch(fetchPlaylistMenuError(err)); // Si hay error, lo despacha
      });
  };
};

// Acción que indica que se están cargando las canciones de una playlist
export const fetchPlaylistSongsPending = () => {
  return {
    type: 'FETCH_PLAYLIST_SONGS_PENDING'
  };
};

// Acción que indica que las canciones se cargaron correctamente
export const fetchPlaylistSongsSuccess = (songs) => {
  return {
    type: 'FETCH_PLAYLIST_SONGS_SUCCESS',
    songs
  };
};

// Acción que indica un error al obtener las canciones de la playlist
export const fetchPlaylistSongsError = () => {
  return {
    type: 'FETCH_PLAYLIST_SONGS_ERROR'
  };
};

// Función asincrónica que obtiene las canciones de una playlist específica del usuario
export const fetchPlaylistSongs = (userId, playlistId, accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    dispatch(fetchPlaylistSongsPending()); // Inicia carga

    fetch(request)
      .then(res => res.json())
      .then(res => {
        // Elimina canciones duplicadas basándose en el ID de la canción
        res.items = uniqBy(res.items, (item) => {
          return item.track.id;
        });
        dispatch(fetchPlaylistSongsSuccess(res.items)); // Si todo sale bien, despacha la lista de canciones
      })
      .catch(err => {
        dispatch(fetchPlaylistSongsError(err)); // Si falla, despacha error
      });
  };
};
