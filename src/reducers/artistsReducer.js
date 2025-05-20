// artistsReducer.js maneja el estado relacionado con los artistas,
// incluyendo los IDs de artistas, el listado de artistas recuperado de la API,
// y los estados de carga y error.

const defaultState = {
  artistIds: '' // Estado inicial con los IDs de artistas como string vacío
};

export const artistsReducer = (state = defaultState, action) => {

  switch (action.type) {

    case "SET_ARTIST_IDS":
      // Guarda los IDs de los artistas que se utilizarán en la solicitud a la API
      return {
        ...state,
        artistIds: action.artistIds
      };

    case "FETCH_ARTISTS_PENDING":
      // Marca el inicio de la carga de artistas
      return {
        ...state,
        fetchArtistsPending: true
      };

    case "FETCH_ARTISTS_SUCCESS":
      // Guarda la lista de artistas obtenida de la API
      return {
        ...state,
        artistList: action.artists,
        fetchArtistsError: false,
        fetchArtistsPending: false
      };

    case "FETCH_ARTISTS_ERROR":
      // Indica que ocurrió un error al intentar obtener los artistas
      return {
        ...state,
        fetchArtistsError: true,
        fetchArtistsPending: false
      };

    case "SEARCH_ARTISTS_PENDING":
      return {
        ...state,
        fetchArtistsPending: true
      };

    case "SEARCH_ARTISTS_SUCCESS":
      return {
        ...state,
        artistList: { artists: action.artists },
        fetchArtistsError: false,
        fetchArtistsPending: false
      };

    case "SEARCH_ARTISTS_ERROR":
      return {
        ...state,
        fetchArtistsError: true,
        fetchArtistsPending: false
      };

    default:
      // Si la acción no coincide con ninguna conocida, se devuelve el estado actual
      return state;
  }
};

export default artistsReducer;