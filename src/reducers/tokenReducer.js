// tokenReducer.js es un reducer encargado de almacenar el token de autenticación de Spotify.
// Este token se utiliza para autenticar las solicitudes a la API de Spotify.

export const tokenReducer = (state = {}, action) => {
  switch (action.type) {

    // Guarda el token cuando se dispara la acción SET_TOKEN
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token
      };

    // Si la acción no coincide, devuelve el estado actual sin cambios
    default:
      return state;
  }
};

export default tokenReducer;

