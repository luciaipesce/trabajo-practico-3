//albumActions.js es un archivo que contiene las acciones relacionadas con los álbumes en la aplicación.
// Estas acciones son utilizadas para interactuar con la API de Spotify y manejar el estado de los álbumes en la aplicación.

// Acción que indica que se comenzó a obtener los álbumes
export const fetchAlbumsPending = () => {
  return {
    type: 'FETCH_ALBUMS_PENDING'
  };
};

// Acción que indica que la obtención de álbumes fue exitosa
export const fetchAlbumsSuccess = (albums) => {
  return {
    type: 'FETCH_ALBUMS_SUCCESS',
    albums
  };
};

// Acción que indica que hubo un error al obtener los álbumes
export const fetchAlbumsError = () => {
  return {
    type: 'FETCH_ALBUMS_ERROR'
  };
};

// Función asincrónica que hace la petición a la API de Spotify para obtener los álbumes del usuario
export const fetchAlbums = (accessToken) => {
  return dispatch => {
    // Configura la solicitud con el token de acceso
    const request = new Request(`https://api.spotify.com/v1/me/albums`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    // Dispara acción para indicar que comienza la solicitud
    dispatch(fetchAlbumsPending());

    // Realiza la solicitud
    fetch(request)
      .then(res => res.json())
      .then(res => {
        // Dispara acción con los datos obtenidos si fue exitosa
        dispatch(fetchAlbumsSuccess(res.items));
      })
      .catch(err => {
        // Dispara acción de error si algo salió mal
        dispatch(fetchAlbumsError(err));
      });
    
  };
};
