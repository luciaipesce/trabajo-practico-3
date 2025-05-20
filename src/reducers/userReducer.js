// userReducer.js es un reducer que gestiona el estado relacionado al usuario,
// incluyendo los datos personales obtenidos de la API de Spotify y las acciones
// relacionadas a agregar canciones a la biblioteca del usuario.

export const userReducer = (state = {}, action) => {
  switch (action.type) {

    // Cuando se obtiene correctamente la información del usuario
    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        user: action.user,             // Guarda la info del usuario
        fetchUserError: false          // Indica que no hubo error
      };

    // Cuando ocurre un error al obtener la info del usuario
    case "FETCH_USER_ERROR":
      return {
        ...state,
        fetchUserError: true           // Marca el error
      };

    // Cuando se agrega exitosamente una canción a la biblioteca del usuario
    case "ADD_SONG_TO_LIBRARY_SUCCESS":
      return {
        ...state,
        songAddedToLibrary: true,      // Marca que se agregó correctamente
        songId: action.songId          // Guarda el ID de la canción agregada
      };

    // Si ocurre un error al agregar una canción
    case "ADD_SONG_TO_LIBRARY_ERROR":
      return {
        ...state,
        songAddedToLibrary: false      // Marca que falló la operación
      };

    // Por defecto, devuelve el estado sin cambios
    default:
      return state;
  }
};

export default userReducer;
