// favoriteActions.js es un archivo que contiene las acciones relacionadas con los artistas favoritos en la aplicación.
// Estas acciones son utilizadas para manejar el estado de los artistas favoritos, permitiendo al usuario marcar o desmarcar artistas como favoritos.

// Tipo de acción que usaremos para cambiar la lista de favoritos
export const TOGGLE_FAVORITE_ARTIST = "TOGGLE_FAVORITE_ARTIST";

/**
 * Acción que alterna un artista como favorito o no favorito.
 * Si el artista ya está en la lista, lo remueve.
 * Si no está, lo agrega.
 * Además actualiza localStorage para que se mantenga entre sesiones.
 *
 * @param {string} id - El ID del artista a marcar/desmarcar como favorito.
 * @returns {function} - Una función thunk que despacha la acción.
 */
export const toggleFavoriteArtist = (id) => {
    return (dispatch, getState) => {
        // Obtener la lista actual de favoritos desde el estado global
        const currentFavorites = getState().favoriteArtists || [];

        // Crear una nueva lista según si el artista ya está marcado o no
        const updatedFavorites = currentFavorites.includes(id)
        ? currentFavorites.filter(favId => favId !== id) // lo quitamos
        : [...currentFavorites, id]; // lo agregamos

        // Guardar la nueva lista también en localStorage
        localStorage.setItem("favoritos", JSON.stringify(updatedFavorites));

        // Enviar la acción al reducer
        dispatch({
        type: TOGGLE_FAVORITE_ARTIST,
        payload: updatedFavorites
        });
    };
};
