// userActions.js es un archivo que contiene las acciones relacionadas con el usuario en la aplicación.
// Estas acciones son utilizadas para manejar el estado del usuario, como la información del perfil y la biblioteca de canciones.

// Acción para indicar que se obtuvo correctamente la información del usuario
export const fetchUserSuccess = (user) => {
  return {
    type: 'FETCH_USER_SUCCESS',
    user
  };
};

// Acción para indicar que hubo un error al obtener la información del usuario
export const fetchUserError = () => {
  return {
    type: 'FETCH_USER_ERROR'
  };
};

// Acción asincrónica para obtener los datos del usuario autenticado en Spotify
export const fetchUser = (accessToken) => {
  return dispatch => {
    const request = new Request('https://api.spotify.com/v1/me', {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    fetch(request).then(res => {
      // Si el token no es válido, redirige a la página de inicio
      if (res.statusText === "Unauthorized") {
        window.location.href = './';
      }
      return res.json();
    }).then(res => {
      dispatch(fetchUserSuccess(res)); // Llama a la acción de éxito con los datos del usuario
    }).catch(err => {
      dispatch(fetchUserError()); // Llama a la acción de error si ocurre un fallo
    });
  };
};

// Acción para indicar que se agregó correctamente una canción a la biblioteca
export const addSongToLibrarySuccess = (songId) => {
  return {
    type: 'ADD_SONG_TO_LIBRARY_SUCCESS',
    songId
  };
};

// Acción para indicar que hubo un error al intentar agregar una canción
export const addSongToLibraryError = () => {
  return {
    type: 'ADD_SONG_TO_LIBRARY_ERROR'
  };
};

// Acción asincrónica para agregar una canción a la biblioteca del usuario
export const addSongToLibrary = (accessToken, id) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/me/tracks?ids=${id}`, {
      method: 'PUT',
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    fetch(request).then(res => {
      if (res.ok) {
        dispatch(addSongToLibrarySuccess(id)); // Éxito al agregar
      }
    }).catch(err => {
      dispatch(addSongToLibraryError()); // Falla al agregar
    });
  };
};

