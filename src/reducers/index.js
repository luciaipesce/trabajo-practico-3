import { combineReducers } from "redux";
import userReducer from './userReducer';
import tokenReducer from './tokenReducer';
import playlistReducer from './playlistReducer';
import songsReducer from './songsReducer';
import albumsReducer from './albumsReducer';
import artistsReducer from './artistsReducer';
import uiReducer from './uiReducer';
import browseReducer from './browseReducer';
import soundReducer from './soundReducer';
import favoriteArtistsReducer from "./favoriteArtistsReducer";

export default combineReducers({
  userReducer,       // Maneja la información del usuario autenticado
  tokenReducer,      // Almacena el token de acceso de Spotify
  playlistReducer,   // Maneja los datos de las playlists del usuario
  songsReducer,      // Maneja las canciones (todas, recientes, buscadas, etc.)
  albumsReducer,     // Maneja los álbumes de la biblioteca del usuario
  artistsReducer,    // Maneja los artistas seguidos o relacionados
  uiReducer,         // Maneja el estado de la interfaz (por ejemplo, el título del header)
  browseReducer,     // Maneja la sección de exploración (categorías, destacados, lanzamientos)
  soundReducer,      // Maneja el volumen actual de reproducción

  favoriteArtists: favoriteArtistsReducer // Reducer para favoritos
});