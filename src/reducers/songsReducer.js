// songsReducer.js es un reducer que maneja toda la lógica relacionada con la música reproducida.
// Controla el estado de reproducción (play, pause, stop), la vista actual (songs, search, playlist, etc),
// la lista de canciones disponibles, el progreso de la reproducción y los errores de carga.

const defaultState = {
  fetchSongsPending: true,  // Indica si se están cargando canciones
  songPlaying: false,       // Indica si una canción está sonando
  timeElapsed: 0,           // Tiempo transcurrido de reproducción (en segundos)
  songId: 0,                // ID de la canción actual
  viewType: 'songs',        // Tipo de vista actual (songs, search, playlist, etc.)
  songPaused: true          // Indica si la canción está pausada
};

export const songsReducer = (state = defaultState, action) => {
  switch (action.type) {

    // Cambia el tipo de vista actual
    case "UPDATE_VIEW_TYPE":
      return {
        ...state,
        viewType: action.view
      };

    // ----- Acciones para obtener canciones de la biblioteca -----
    case "FETCH_SONGS_PENDING":
      return {
        ...state,
        fetchSongsPending: true
      };

    case "FETCH_SONGS_SUCCESS":
      return {
        ...state,
        songs: action.songs,
        fetchSongsError: false,
        fetchSongsPending: false,
        viewType: 'songs'
      };

    case "FETCH_SONGS_ERROR":
      return {
        ...state,
        fetchSongsError: true,
        fetchSongsPending: false
      };

    // ----- Acciones para búsqueda de canciones -----
    case "SEARCH_SONGS_PENDING":
      return {
        ...state,
        searchSongsPending: true
      };

    case "SEARCH_SONGS_SUCCESS":
      return {
        ...state,
        songs: action.songs,
        searchSongsError: false,
        searchSongsPending: false,
        viewType: 'search'
      };

    case "SEARCH_SONGS_ERROR":
      return {
        ...state,
        searchSongsError: true,
        searchSongsPending: false
      };

    // ----- Acciones para canciones recientemente reproducidas -----
    case "FETCH_RECENTLY_PLAYED_PENDING":
      return {
        ...state,
        fetchSongsPending: true
      };

    case "FETCH_RECENTLY_PLAYED_SUCCESS":
      return {
        ...state,
        songs: action.songs,
        viewType: 'Recently Played',
        fetchSongsError: false,
        fetchSongsPending: false
      };

    case "FETCH_RECENTLY_PLAYED_ERROR":
      return {
        ...state,
        fetchSongsError: true,
        fetchSongsPending: false
      };

    // ----- Acciones para canciones de una playlist -----
    case "FETCH_PLAYLIST_SONGS_PENDING":
      return {
        ...state,
        fetchPlaylistSongsPending: true
      };

    case "FETCH_PLAYLIST_SONGS_SUCCESS":
      return {
        ...state,
        songs: action.songs,
        viewType: 'playlist',
        fetchPlaylistSongsError: false,
        fetchPlaylistSongsPending: false
      };

    case "FETCH_PLAYLIST_SONGS_ERROR":
      return {
        ...state,
        fetchPlaylistSongsError: true,
        fetchPlaylistSongsPending: false
      };

    // ----- Acciones para canciones de un artista -----
    case "FETCH_ARTIST_SONGS_PENDING":
      return {
        ...state,
        fetchArtistSongsPending: true
      };

    case "FETCH_ARTIST_SONGS_SUCCESS":
      return {
        ...state,
        songs: action.songs,
        viewType: 'Artist',
        fetchArtistSongsError: false,
        fetchArtistSongsPending: false
      };

    case "FETCH_ARTIST_SONGS_ERROR":
      return {
        ...state,
        fetchArtistSongsError: true,
        fetchArtistSongsPending: false
      };

    // ----- Control de reproducción de canciones -----
    case "PLAY_SONG":
      return {
        ...state,
        songPlaying: true,
        songDetails: action.song,
        songId: action.song.id,
        timeElapsed: 0,
        songPaused: false
      };

    case "STOP_SONG":
      return {
        ...state,
        songPlaying: false,
        songDetails: null,
        timeElapsed: 0,
        songPaused: true
      };

    case "PAUSE_SONG":
      return {
        ...state,
        songPaused: true
      };

    case "RESUME_SONG":
      return {
        ...state,
        songPaused: false
      };

    // Actualiza el tiempo transcurrido de reproducción
    case "INCREASE_SONG_TIME":
      return {
        ...state,
        timeElapsed: action.time
      };

    // Acción por defecto si no se reconoce el tipo
    default:
      return state;
  }
};

export default songsReducer;
