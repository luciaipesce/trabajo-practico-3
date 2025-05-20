//songActions.js es un archivo que contiene las acciones relacionadas con las canciones en la aplicación.
// Estas acciones son utilizadas para interactuar con la API de Spotify y manejar el estado de las canciones en la aplicación.

import uniqBy from 'lodash/uniqBy'; // Para eliminar duplicados
import { setArtistIds } from './artistActions'; // Acción para guardar IDs de artistas

// Acción: inicio de carga de canciones
export const fetchSongsPending = () => {
  return {
    type: 'FETCH_SONGS_PENDING'
  };
};

// Acción: carga de canciones exitosa
export const fetchSongsSuccess = (songs) => {
  return {
    type: 'FETCH_SONGS_SUCCESS',
    songs
  };
};

// Acción: error al cargar canciones
export const fetchSongsError = () => {
  return {
    type: 'FETCH_SONGS_ERROR'
  };
};

// Función principal para obtener canciones guardadas del usuario
export const fetchSongs = (accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/me/tracks?limit=50`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    dispatch(fetchSongsPending()); // Inicia carga

    fetch(request).then(res => {
      if(res.statusText === "Unauthorized") {
        window.location.href = './'; // Redirige si el token es inválido
      }
      return res.json();
    }).then(res => {
      // Obtiene IDs únicos de artistas para luego buscar sus canciones
      let artistIds = uniqBy(res.items, (item) => {
        return item.track.artists[0].name;
      }).map(item => {
        return item.track.artists[0].id;
      }).join(',');

      dispatch(setArtistIds(artistIds)); // Guarda IDs de artistas

      dispatch(fetchSongsSuccess(res.items)); // Guarda las canciones
    }).catch(err => {
      dispatch(fetchSongsError(err)); // Maneja errores
    });
  };
};

// Búsqueda de canciones por término
export const searchSongsPending = () => { // Acción para indicar que se está buscando canciones
  return {
    type: 'SEARCH_SONGS_PENDING'
  };
};

export const searchSongsSuccess = (songs) => { // Acción para indicar que se encontraron canciones
  return {
    type: 'SEARCH_SONGS_SUCCESS',
    songs
  };
};

export const searchSongsError = () => { // Acción para indicar que hubo un error en la búsqueda
  return {
    type: 'SEARCH_SONGS_ERROR'
  };
};

// Función para buscar canciones a partir de un término
export const searchSongs = (searchTerm, accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken,
        'Accept': 'application/json'
      })
    });

    dispatch(searchSongsPending());

    fetch(request).then(res => {
      if(res.statusText === "Unauthorized") {
        window.location.href = './';
      }
      return res.json();
    }).then(res => {
      // Reestructura los datos para mantener compatibilidad
      res.items = res.tracks.items.map(item => {
        return {
          track: item
        };
      });
      dispatch(searchSongsSuccess(res.items));
    }).catch(err => {
      dispatch(fetchSongsError(err));
    });
  };
};

// Canciones reproducidas recientemente
export const fetchRecentlyPlayedPending = () => { // Acción para indicar que se están obteniendo canciones reproducidas recientemente
  return {
    type: 'FETCH_RECENTLY_PLAYED_PENDING'
  };
};

export const fetchRecentlyPlayedSuccess = (songs) => { // Acción para indicar que se obtuvieron correctamente las canciones reproducidas recientemente
  return {
    type: 'FETCH_RECENTLY_PLAYED_SUCCESS',
    songs
  };
};

export const fetchRecentlyPlayedError = () => { // Acción para indicar que hubo un error al obtener las canciones reproducidas recientemente
  return {
    type: 'FETCH_RECENTLY_PLAYED_ERROR'
  };
};

// Función para obtener las canciones reproducidas recientemente
export const fetchRecentlyPlayed = (accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/me/player/recently-played`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    dispatch(fetchRecentlyPlayedPending());

    fetch(request).then(res => {
      return res.json();
    }).then(res => {
      // Elimina duplicados
      res.items = uniqBy(res.items, (item) => {
        return item.track.id;
      });
      dispatch(fetchRecentlyPlayedSuccess(res.items));
    }).catch(err => {
      dispatch(fetchRecentlyPlayedError(err));
    });
  };
};

// Controles de reproducción (acciones locales)
export const playSong = (song) => { // Acción para reproducir una canción
  return {
    type: 'PLAY_SONG',
    song
  };
};

export const stopSong = () => { // Acción para detener la reproducción de una canción
  return {
    type: 'STOP_SONG'
  };
};

export const pauseSong = () => { // Acción para pausar la reproducción de una canción
  return {
    type: 'PAUSE_SONG'
  };
};

export const resumeSong = () => { // Acción para reanudar la reproducción de una canción
  return {
    type: 'RESUME_SONG'
  };
};

export const increaseSongTime = (time) => { // Acción para aumentar el tiempo de reproducción de una canción
  return {
    type: 'INCREASE_SONG_TIME',
    time
  };
};

// Cambiar tipo de vista (por ejemplo: cuadrícula o lista)
export const updateViewType = (view) => {
  return {
    type: 'UPDATE_VIEW_TYPE',
    view
  };
};

