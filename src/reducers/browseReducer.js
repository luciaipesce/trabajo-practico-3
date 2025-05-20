// browseReducer.js se encarga de manejar el estado relacionado con la sección "Explorar",
// incluyendo las categorías, nuevos lanzamientos y playlists destacadas.
// Cada vez que se obtiene uno de estos datos desde la API, se actualiza el estado `view`
// con los ítems correspondientes.

export const browseReducer = (state = {}, action) => {
  switch (action.type) {

    case "FETCH_CATEGORIES_SUCCESS":
      // Guarda las categorías obtenidas en el estado `view`
      return {
        ...state,
        view: action.categories.items,
        fetchCategoriesError: false
      };

    case "FETCH_CATEGORIES_ERROR":
      // Indica que hubo un error al obtener las categorías
      return {
        ...state,
        fetchCategoriesError: true
      };

    case "FETCH_NEW_RELEASES_SUCCESS":
      // Guarda los nuevos lanzamientos obtenidos en el estado `view`
      return {
        ...state,
        view: action.newReleases.items,
        fetchNewReleasesError: false
      };

    case "FETCH_NEW_RELEASES_ERROR":
      // Indica que hubo un error al obtener los nuevos lanzamientos
      return {
        ...state,
        fetchNewReleasesError: true
      };

    case "FETCH_FEATURED_SUCCESS":
      // Guarda las playlists destacadas obtenidas en el estado `view`
      return {
        ...state,
        view: action.featured.items,
        fetchFeaturedError: false
      };

    case "FETCH_FEATURED_ERROR":
      // Indica que hubo un error al obtener las playlists destacadas
      return {
        ...state,
        fetchFeaturedError: true
      };

    default:
      // Si la acción no coincide, devuelve el estado actual sin cambios
      return state;
  }
};

export default browseReducer;
