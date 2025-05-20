// favoriteArtistsReducer.js

// Importamos el tipo de acción para que sea consistente
import { TOGGLE_FAVORITE_ARTIST } from "../actions/favoriteActions";

// Estado inicial: intentamos cargar favoritos desde localStorage
const initialState = JSON.parse(localStorage.getItem("favoritos")) || [];

/**
 * Reducer que actualiza la lista de artistas favoritos
 * cada vez que se despacha TOGGLE_FAVORITE_ARTIST.
 *
 * @param {Array} state - Lista de IDs de artistas favoritos
 * @param {Object} action - Acción despachada
 * @returns {Array} - Nueva lista de favoritos
 */
const favoriteArtistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE_ARTIST:
            return action.payload;

        default:
            return state;
    }
};

export default favoriteArtistsReducer;