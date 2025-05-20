// playlistReducer.js es un reducer que gestiona el estado relacionado con las listas de reproducción
// del usuario. Controla la carga del menú de playlists, errores, y permite agregar una nueva playlist.

export const playlistReducer = (state = {}, action) => {
  switch (action.type) {

    // Indica que la carga del menú de playlists ha comenzado
    case "FETCH_PLAYLIST_MENU_PENDING":
      return {
        fetchPlaylistPending: true,
        ...state
      };

    // Cuando la carga de playlists se completa exitosamente
    case "FETCH_PLAYLIST_MENU_SUCCESS":
      return {
        playlistMenu: action.playlists,     // Menú de playlists (secciones laterales)
        playlists: action.playlists,        // Todas las playlists disponibles
        fetchPlaylistError: false,
        fetchPlaylistPending: false,
        ...state
      };

    // Agrega una nueva playlist a la lista actual (por ejemplo, una destacada)
    case "ADD_PLAYLIST_ITEM":
      return {
        ...state,
        playlists: [
          ...state.playlists,
          action.playlist
        ]
      };

    // Maneja errores en la carga del menú de playlists
    case "FETCH_PLAYLIST_MENU_ERROR":
      return {
        fetchPlaylistError: true,
        fetchPlaylistPending: false,
        ...state
      };

    // Devuelve el estado actual si la acción no coincide
    default:
      return state;
  }
};

export default playlistReducer;
