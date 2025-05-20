// tokenActions.js es un archivo que contiene las acciones relacionadas con el token de acceso de Spotify.
// Estas acciones son utilizadas para manejar el estado del token en la aplicación, permitiendo la autenticación y autorización del usuario.

// Acción para guardar el token de acceso de Spotify en el estado global
export const setToken = (token) => {
  return {
    type: 'SET_TOKEN', // Tipo de acción que indica que se está estableciendo un nuevo token
    token // Valor del token que se desea guardar
  };
};

