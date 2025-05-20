// albumsReducer.js gestiona el estado relacionado a los álbumes del usuario,
// incluyendo los estados de carga, éxito y error al obtener los álbumes desde la API de Spotify.

export const albumsReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_ALBUMS_PENDING":
      // Cuando se inicia la solicitud de álbumes, se marca como pendiente
      return {
        ...state,
        fetchAlbumsPending: true
      };

    case "FETCH_ALBUMS_SUCCESS":
      // Cuando se obtienen los álbumes exitosamente, se almacenan en el estado
      return {
        ...state,
        albums: action.albums,
        fetchAlbumsError: false,
        fetchAlbumsPending: false
      };

    case "FETCH_ALBUMS_ERROR":
      // Si ocurre un error al obtener los álbumes, se marca el error
      return {
        ...state,
        fetchAlbumsError: true,
        fetchAlbumsPending: false
      };

    default:
      // Por defecto, se devuelve el estado sin cambios
      return state;
  }
};

export default albumsReducer;