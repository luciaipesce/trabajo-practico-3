// browseActions.js es un archivo que contiene las acciones relacionadas con la navegación en la aplicación.
// Estas acciones son utilizadas para interactuar con la API de Spotify y manejar el estado de la navegación en la aplicación.

// Acción que indica que se obtuvieron correctamente las categorías
export const fetchCategoriesSuccess = (categories) => {
  return {
    type: 'FETCH_CATEGORIES_SUCCESS',
    categories
  };
};

// Acción que indica que ocurrió un error al obtener las categorías
export const fetchCategoriesError = () => {
  return {
    type: 'FETCH_CATEGORIES_ERROR'
  };
};

// Función que obtiene las categorías desde la API de Spotify
export const fetchCategories = (accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/browse/categories`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    fetch(request)
      .then(res => res.json())
      .then(res => {
        dispatch(fetchCategoriesSuccess(res.categories));
      })
      .catch(err => {
        dispatch(fetchCategoriesError(err));
      });
  };
};

// Acción que indica que se obtuvieron correctamente los lanzamientos nuevos
export const fetchNewReleasesSuccess = (newReleases) => {
  return {
    type: 'FETCH_NEW_RELEASES_SUCCESS',
    newReleases
  };
};

// Acción que indica que ocurrió un error al obtener los lanzamientos nuevos
export const fetchNewReleasesError = () => {
  return {
    type: 'FETCH_NEW_RELEASES_ERROR'
  };
};

// Función que obtiene los lanzamientos nuevos desde la API de Spotify
export const fetchNewReleases = (accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/browse/new-releases`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    fetch(request)
      .then(res => res.json())
      .then(res => {
        dispatch(fetchNewReleasesSuccess(res.albums));
      })
      .catch(err => {
        dispatch(fetchNewReleasesError(err));
      });
  };
};

// Acción que indica que se obtuvieron correctamente las playlists destacadas
export const fetchFeaturedSuccess = (featured) => {
  return {
    type: 'FETCH_FEATURED_SUCCESS',
    featured
  };
};

// Acción que indica que ocurrió un error al obtener las playlists destacadas
export const fetchFeaturedError = () => {
  return {
    type: 'FETCH_FEATURED_ERROR'
  };
};

// Función que obtiene las playlists destacadas desde la API de Spotify
export const fetchFeatured = (accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/browse/featured-playlists`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    fetch(request)
      .then(res => res.json())
      .then(res => {
        dispatch(fetchFeaturedSuccess(res.playlists));
      })
      .catch(err => {
        dispatch(fetchFeaturedError(err));
      });
  };
};

